export default (container) => {
  const { L } = container.defaultLogger('Queue Service');

  const queue = {
    recordMessageUpdates: [],
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

  const saveRecordMessageUpdates = async () => {
    try {
      const { queueDelay } = container.config.webhook;
      const updates = queue.recordMessageUpdates;
      queue.recordMessageUpdates = [];

      if (updates.length > 0) {
        L.trace('Saving Record Message Updates');
        const startTime = new Date().getTime();

        /* Actually Do Something */

        const endTime = new Date().getTime();
        L.debug(`Time Taken (Record Message Update Saving)[${updates.length}]: ${endTime - startTime}ms`);
        L.trace(`${updates.length} Record Message Updates saved`);
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
      const { queueDelay } = container.config.webhook;
      const audits = queue.mapiStatusAudits;
      queue.mapiStatusAudits = [];

      if (audits.length > 0) {
        L.trace('Saving MAPI Status Audits');
        const startTime = new Date().getTime();

        /* Actually Do Something */

        const endTime = new Date().getTime();
        L.debug(`Time Taken (MAPI Status Audits Saving)[${audits.length}]: ${endTime - startTime}ms`);
        L.trace(`${audits.length} MAPI Status Audits saved`);
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
      const { queueDelay } = container.config.webhook;
      const audits = queue.smsStatusAudits;
      queue.smsStatusAudits = [];

      if (audits.length > 0) {
        L.trace('Saving SMS Status Audits');
        const startTime = new Date().getTime();

        /* Actually Do Something */

        const endTime = new Date().getTime();
        L.debug(`Time Taken (SMS Status Audits Saving)[${audits.length}]: ${endTime - startTime}ms`);
        L.trace(`${audits.length} SMS Status Audits saved`);
      } else {
        L.trace('Nothing to save for SMS Status Audits');
      }
      setTimeout(saveSmsStatusAudit, queueDelay * 1000);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const pushRecordMessageUpdate = (data) => {
    queue.recordMessageUpdates.push(data);
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
