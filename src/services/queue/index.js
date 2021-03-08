export default (container) => {
  const { L } = container.defaultLogger('Queue Service');

  const queue = {
    recordMessageStatusUpdates: {},
    recordMessagePriceUpdates: {},
    mapiStatusAudits: [],
    smsStatusAudits: [],
    vapiEventAudits: [],
  };

  const StatusHierarchy = {
    error: -1,
    unknown: -1,
    draft: 0,
    pending: 1,
    queuing: 2,
    requested: 3,

    // Mapi and SMS
    submitted: 4,
    accepted: 4,
    buffered: 4,
    delivered: 5,
    rejected: 5,
    failed: 5,
    undeliverable: 5,
    expired: 5,
    read: 6,

    // Vapi
    started: 4,
    ringing: 5,
    answered: 6,
    human: 7,
    machine: 7,
    record: 8,
    input: 8,
    transfer: 8,
    busy: 9,
    cancelled: 9,
    unanswered: 9,
    disconnected: 9,
    rejected: 9,
    failed: 9,
    timeout: 9,
    completed: 10,
  };

  const getOverwritableStatuses = (status) => {
    const keys = Object.keys(StatusHierarchy);
    const overwritableStatuses = [];

    const hierarchy = StatusHierarchy[status] || 0;

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const keyHierarchy = StatusHierarchy[key];

      if (keyHierarchy <= hierarchy) {
        overwritableStatuses.push(key);
      }
    }

    return overwritableStatuses;
  };

  const initialize = () => {
    const { queueDelay } = container.config.webhook;
    L.trace('Initialize Queue Service');

    L.trace('Scheduling Record Message Status Updating');
    setTimeout(saveRecordMessageStatusUpdates, queueDelay * 1000);

    L.trace('Scheduling Record Message Price Updating');
    setTimeout(saveRecordMessagePriceUpdates, queueDelay * 1000);

    L.trace('Scheduling MAPI Status Audit Saving');
    setTimeout(saveMapiStatusAudit, queueDelay * 1000);

    L.trace('Scheduling SMS Status Audit Saving');
    setTimeout(saveSmsStatusAudit, queueDelay * 1000);

    L.trace('Scheduling VAPI Event Audit Saving');
    setTimeout(saveVapiEventAudit, queueDelay * 1000);
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

  const saveRecordMessagePriceUpdates = async () => {
    try {
      const { CmpRecordMessage } = container.persistenceService;
      const { queueDelay } = container.config.webhook;

      const updates = queue.recordMessagePriceUpdates;
      queue.recordMessagePriceUpdates = {};

      const priceBuckets = {};
      let messageIds = Object.keys(updates);

      // Make sure all message ids are available
      const recordMessageIdMap = await getRecordMessageIdMap(messageIds);
      for (let i = 0; i < messageIds.length; i += 1) {
        const messageId = messageIds[i];
        if (recordMessageIdMap[messageId] == null) {
          // Not yet created, back into queue
          const price = updates[messageId];
          if (price != null) {
            queue.recordMessagePriceUpdates[messageId] = price;
          }

          delete updates[messageId];
        }
      }

      messageIds = Object.keys(updates);
      if (messageIds.length > 0) {
        const mapStartTime = new Date().getTime();
        const totalStartTime = new Date().getTime();

        for (let i = 0; i < messageIds.length; i += 1) {
          const messageId = messageIds[i];
          const price = updates[messageId];
          if (priceBuckets[price] == null) {
            priceBuckets[price] = [];
          }

          priceBuckets[price].push(messageId);
        }

        const mapEndTime = new Date().getTime();
        L.debug(`Time Taken (Map Record Message Price): ${mapEndTime - mapStartTime}ms`);

        const prices = Object.keys(priceBuckets);
        if (prices.length > 0) {
          L.trace('Saving Record Message Price Updates');
          const updateStartTime = new Date().getTime();

          const promises = prices
            .filter(price => !!price && price !== 'undefined' && price !== 'null')
            .map(async (price) => {
              try {
                const priceStartTime = new Date().getTime();

                // Check whether need to update
                const messageIdsMap = priceBuckets[price] || [];
                if (messageIdsMap == null || messageIdsMap.length === 0) {
                  const priceEndTime = new Date().getTime();
                  L.trace(`Nothing to update for price: ${price}`);
                  L.debug(`Time Taken (Single Record Message Price Update)[${price}]: ${priceEndTime - priceStartTime}ms`);
                  return Promise.resolve();
                }

                // Update Record Message
                const criteria = {
                  messageId: messageIdsMap,
                };
                const changes = { price };
                const options = { noGet: true };
                await CmpRecordMessage.updateRecordMessages(criteria, changes, options);

                const priceEndTime = new Date().getTime();
                L.trace(`Price Updated: ${price}`);
                L.debug(`Time Taken (Single Record Message Price Update)[${price}]: ${priceEndTime - priceStartTime}ms`);

                return Promise.resolve();
              } catch (error) {
                return Promise.reject(error);
              }
            });
          await Promise.all(promises);


          const updateEndTime = new Date().getTime();
          L.debug(`Time Taken (All Record Message Price Update)[${updates.length}]: ${updateEndTime - updateStartTime}ms`);
          L.trace(`${updates.length} Record Message Price Updates saved`);
        }

        const totalEndTime = new Date().getTime();
        L.debug(`Time Taken (Total Record Message Price Save): ${totalEndTime - totalStartTime}ms`);
      } else {
        L.trace('Nothing to save for Record Message Price Updates');
      }


      setTimeout(saveRecordMessagePriceUpdates, queueDelay * 1000);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const saveRecordMessageStatusUpdates = async () => {
    try {
      const { CmpRecordMessage } = container.persistenceService;
      const { queueDelay } = container.config.webhook;

      const updates = queue.recordMessageStatusUpdates;
      queue.recordMessageStatusUpdates = {};

      const statusBuckets = {};
      let messageIds = Object.keys(updates);

      // Make sure all message ids are available
      const recordMessageIdMap = await getRecordMessageIdMap(messageIds);
      for (let i = 0; i < messageIds.length; i += 1) {
        const messageId = messageIds[i];
        if (recordMessageIdMap[messageId] == null) {
          // Not yet created, back into queue
          const currentStatus = queue.recordMessageStatusUpdates[messageId];
          const status = updates[messageId];
          if (currentStatus == null) {
            queue.recordMessageStatusUpdates[messageId] = status;
          } else if (StatusHierarchy[status] >= StatusHierarchy[currentStatus]) {
            queue.recordMessageStatusUpdates[messageId] = status;
          }

          delete updates[messageId];
        }
      }

      messageIds = Object.keys(updates);
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
          L.trace('Saving Record Message Status Updates');
          const updateStartTime = new Date().getTime();

          /* Actually Do Something */
          const promises = statuses
            .filter(status => !!status && status !== 'undefined' && status !== 'null')
            .map(async (status) => {
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
              const { Op } = container.Sequelize;
              const criteria = {
                messageId: messageIdsMap,
                [Op.or]: [
                  { status: getOverwritableStatuses(status) },
                  {
                    status: {
                      [Op.is]: null,
                    },
                  },
                ],
              };
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
          L.trace(`${updates.length} Record Message Status Updates saved`);
        }

        const totalEndTime = new Date().getTime();
        L.debug(`Time Taken (Total Record Message Status Save): ${totalEndTime - totalStartTime}ms`);
      } else {
        L.trace('Nothing to save for Record Message Status Updates');
      }


      setTimeout(saveRecordMessageStatusUpdates, queueDelay * 1000);
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

  const saveVapiEventAudit = async () => {
    try {
      const { CmpRecordMessageStatusAudit } = container.persistenceService;
      const { queueDelay } = container.config.webhook;
      const audits = queue.vapiEventAudits;
      queue.vapiEventAudits = [];

      if (audits.length > 0) {
        L.trace('Saving VAPI Event Audits');
        const startTime = new Date().getTime();

        /* Actually Do Something */
        const uuids = audits.map(audit => audit.uuid);
        const recordMessageIdMap = await getRecordMessageIdMap(uuids);

        // Inject Record Message ID
        const injectStartTime = new Date().getTime();
        const availableAudits = [];
        for (let i = 0; i < audits.length; i += 1) {
          const audit = audits[i];
          const { uuid } = audit;
          if (recordMessageIdMap[uuid] == null) {
            // Record Message not available, back into queue
            queue.vapiEventAudits.push(audits[i]);
          } else {
            audits[i].cmpRecordMessageId = recordMessageIdMap[uuid];
            availableAudits.push(audits[i]);
          }
        }
        const injectEndTime = new Date().getTime();
        L.debug(`Time Taken (VAPI Record Message ID Inject): ${injectEndTime - injectStartTime}ms`);

        // Bulk Insert
        const createStartTime = new Date().getTime();
        await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditVapiBatch(availableAudits);
        const createEndTime = new Date().getTime();
        L.debug(`Time Taken (VAPI Audit Create): ${createEndTime - createStartTime}ms`);
        /* End of Do Something */

        const endTime = new Date().getTime();
        L.debug(`Time Taken (VAPI Event Audits Saving)[${availableAudits.length}]: ${endTime - startTime}ms`);
        L.trace(`${availableAudits.length} VAPI Event Audits saved`);
      } else {
        L.trace('Nothing to save for VAPI Event Audits');
      }
      setTimeout(saveVapiEventAudit, queueDelay * 1000);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const pushRecordMessageUpdate = (messageId, status, price) => {
    const currentStatus = queue.recordMessageStatusUpdates[messageId];
    if (currentStatus == null) {
      queue.recordMessageStatusUpdates[messageId] = status;
    } else if (StatusHierarchy[status] >= StatusHierarchy[currentStatus]) {
      queue.recordMessageStatusUpdates[messageId] = status;
    }

    if (price != null) {
      queue.recordMessagePriceUpdates[messageId] = price;
    }
  };

  const pushMapiStatusAudit = (data) => {
    queue.mapiStatusAudits.push(data);
  };

  const pushSmsStatusAudit = (data) => {
    queue.smsStatusAudits.push(data);
  };

  const pushVapiEventAudit = (data) => {
    queue.vapiEventAudits.push(data);
  };


  return {
    initialize,

    pushRecordMessageUpdate,
    pushMapiStatusAudit,
    pushSmsStatusAudit,
    pushVapiEventAudit,
  };
};
