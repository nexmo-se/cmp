export default (container) => {
  const { L } = container.defaultLogger('Queue Service');

  const queue = {
    recordMessageUpdates: {},
    mapiStatusAudits: [],
    smsStatusAudits: [],
  };

  const initialize = () => {
    const { queueDelay } = container.config.webhook;
    L.trace('Initialize Queue Service');

    L.trace('Scheduling Record Message Updating');
    setTimeout(saveRecordMessageUpdates, queueDelay * 1000);

    L.trace('Scheduling MAPI Status Audit Saving');
    setTimeout(saveMapiStatusAudit, queueDelay * 1000);

    L.trace('Scheduling SMS Status Audit Saving');
    setTimeout(saveSmsStatusAudit, queueDelay * 1000);
  };

  const getRecordMessageIdMap = async (messageIds) => {
    try {
      const { CmpRecordMessage } = container.persistenceService;

      const startTime = new Date().getTime();

      const criteria = { messageId: messageIds };
      const recordMessages = await CmpRecordMessage.findRecordMessages(criteria, {});

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Get Record Messages): ${endTime - startTime}ms`);

      const recordMessageIdMap = createRecordMessageIdMap(recordMessages);
      return Promise.resolve(recordMessageIdMap);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageIdMap = (recordMessages) => {
    const startTime = new Date().getTime();

    const map = {};
    for (let i = 0; i < recordMessages.length; i += 1) {
      const recordMessage = recordMessages[i];
      const { id, messageId } = recordMessage;
      map[messageId] = id;
    }

    const endTime = new Date().getTime();
    L.debug(`Time Taken (Create Record Message Id Map): ${endTime - startTime}ms`);
    return map;
  };

  const saveRecordMessageUpdates = async () => {
    try {
      const { CmpRecordMessage } = container.persistenceService;
      const { queueDelay } = container.config.webhook;

      const updates = queue.recordMessageUpdates;
      queue.recordMessageUpdates = {};

      const statusBuckets = {};
      const messageIds = Object.keys(updates);

      // Make sure all message ids are available
      const recordMessageIdMap = await getRecordMessageIdMap(messageIds);
      for (let i = 0; i < messageIds.length; i += 1) {
        const messageId = messageIds[i];
        if (recordMessageIdMap[messageId] == null) {
          // Not yet created, back into queue
          queue.recordMessageUpdates[messageId] = updates[messageId];
          delete updates[messageId];
        }
      }

      if (messageIds.length > 0) {
        const mapStartTime = new Date().getTime();
        const totalStartTime = new Date().getTime();

        // Map Record Message Updates to Status with List of Message IDs
        for (let i = 0; i < messageIds.length; i += 1) {
          const messageId = messageIds[i];
          const status = updates[messageId];
          if (statusBuckets[status] == null) {
            statusBuckets[status] = [];
          }

          statusBuckets[status].push(messageId);
        }

        const mapEndTime = new Date().getTime();
        L.debug(`Time Taken (Map Record Message Status): ${mapEndTime - mapStartTime}ms`);

        const statuses = Object.keys(statusBuckets);
        if (statuses.length > 0) {
          L.trace('Saving Record Message Updates');
          const updateStartTime = new Date().getTime();

          /* Actually Do Something */
          const promises = statuses.map(async (status) => {
            try {
              const statusStartTime = new Date().getTime();

              // Check whether need to update
              const messageIdsMap = statusBuckets[status] || [];
              if (messageIdsMap == null || messageIdsMap.length === 0) {
                const statusEndTime = new Date().getTime();
                L.trace(`Nothing to update for status: ${status}`);
                L.debug(`Time Taken (Single Record Message Status Update)[${status}]: ${statusEndTime - statusStartTime}ms`);
                return Promise.resolve();
              }

              // Update Record Message
              const criteria = { messageId: messageIdsMap };
              const changes = { status, statusTime: new Date() };
              const options = { noGet: true };
              await CmpRecordMessage.updateRecordMessages(criteria, changes, options);

              const statusEndTime = new Date().getTime();
              L.trace(`Status Updated: ${status}`);
              L.debug(`Time Taken (Single Record Message Status Update)[${status}]: ${statusEndTime - statusStartTime}ms`);

              return Promise.resolve();
            } catch (error) {
              return Promise.reject(error);
            }
          });
          await Promise.all(promises);
          /* End of Do Something */

          const updateEndTime = new Date().getTime();
          L.debug(`Time Taken (All Record Message Status Update)[${updates.length}]: ${updateEndTime - updateStartTime}ms`);
          L.trace(`${updates.length} Record Message Updates saved`);
        }

        const totalEndTime = new Date().getTime();
        L.debug(`Time Taken (Total Record Message Save): ${totalEndTime - totalStartTime}ms`);
      } else {
        L.trace('Nothing to save for Record Message Updates');
      }


      setTimeout(saveRecordMessageUpdates, queueDelay * 1000);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const saveMapiStatusAudit = async () => {
    try {
      const { CmpRecordMessageStatusAudit } = container.persistenceService;
      const { queueDelay } = container.config.webhook;
      const audits = queue.mapiStatusAudits;
      queue.mapiStatusAudits = [];

      if (audits.length > 0) {
        L.trace('Saving MAPI Status Audits');
        const startTime = new Date().getTime();

        /* Actually Do Something */
        const messageUuids = audits.map(audit => audit.messageUuid);
        const recordMessageIdMap = await getRecordMessageIdMap(messageUuids);

        // Inject Record Message ID
        const injectStartTime = new Date().getTime();
        const availableAudits = [];
        for (let i = 0; i < audits.length; i += 1) {
          const audit = audits[i];
          const { messageUuid } = audit;
          if (recordMessageIdMap[messageUuid] == null) {
            // Record Message not available, back into queue
            queue.mapiStatusAudits.push(audits[i]);
          } else {
            audits[i].cmpRecordMessageId = recordMessageIdMap[messageUuid];
            availableAudits.push(audits[i]);
          }
        }
        const injectEndTime = new Date().getTime();
        L.debug(`Time Taken (MAPI Record Message ID Inject): ${injectEndTime - injectStartTime}ms`);

        // Bulk Insert
        const createStartTime = new Date().getTime();
        await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditMapiBatch(availableAudits);
        const createEndTime = new Date().getTime();
        L.debug(`Time Taken (MAPI Audit Create): ${createEndTime - createStartTime}ms`);
        /* End of Do Something */

        const endTime = new Date().getTime();
        L.debug(`Time Taken (MAPI Status Audits Saving)[${availableAudits.length}]: ${endTime - startTime}ms`);
        L.trace(`${availableAudits.length} MAPI Status Audits saved`);
      } else {
        L.trace('Nothing to save for MAPI Status Audits');
      }
      setTimeout(saveMapiStatusAudit, queueDelay * 1000);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const saveSmsStatusAudit = async () => {
    try {
      const { CmpRecordMessageStatusAudit } = container.persistenceService;
      const { queueDelay } = container.config.webhook;
      const audits = queue.smsStatusAudits;
      queue.smsStatusAudits = [];

      if (audits.length > 0) {
        L.trace('Saving SMS Status Audits');
        const startTime = new Date().getTime();

        /* Actually Do Something */
        const messageIds = audits.map(audit => audit.messageId);
        const recordMessageIdMap = await getRecordMessageIdMap(messageIds);

        // Inject Record Message ID
        const injectStartTime = new Date().getTime();
        const availableAudits = [];
        for (let i = 0; i < audits.length; i += 1) {
          const audit = audits[i];
          const { messageId } = audit;
          if (recordMessageIdMap[messageId] == null) {
            // Record Message not available, back into queue
            queue.smsStatusAudits.push(audits[i]);
          } else {
            audits[i].cmpRecordMessageId = recordMessageIdMap[messageId];
            availableAudits.push(audits[i]);
          }
        }
        const injectEndTime = new Date().getTime();
        L.debug(`Time Taken (SMS Record Message ID Inject): ${injectEndTime - injectStartTime}ms`);

        // Bulk Insert
        const createStartTime = new Date().getTime();
        await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditSmsBatch(availableAudits);
        const createEndTime = new Date().getTime();
        L.debug(`Time Taken (SMS Audit Create): ${createEndTime - createStartTime}ms`);
        /* End of Do Something */

        const endTime = new Date().getTime();
        L.debug(`Time Taken (SMS Status Audits Saving)[${availableAudits.length}]: ${endTime - startTime}ms`);
        L.trace(`${availableAudits.length} SMS Status Audits saved`);
      } else {
        L.trace('Nothing to save for SMS Status Audits');
      }
      setTimeout(saveSmsStatusAudit, queueDelay * 1000);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const pushRecordMessageUpdate = (messageId, status) => {
    queue.recordMessageUpdates[messageId] = status;
  };

  const pushMapiStatusAudit = (data) => {
    queue.mapiStatusAudits.push(data);
  };

  const pushSmsStatusAudit = (data) => {
    queue.smsStatusAudits.push(data);
  };


  return {
    initialize,

    pushRecordMessageUpdate,
    pushMapiStatusAudit,
    pushSmsStatusAudit,
  };
};
