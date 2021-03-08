export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Persistence Accessor');

  const mapRecordMessageStatusAudit = (rmsAudit) => {
    const mappedRmsAudit = Object.assign({}, rmsAudit);

    let mappedRmsAuditData = {};
    if (mappedRmsAudit.messageType === 'sms') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditSms;
    } else if (mappedRmsAudit.mediaType === 'mapi') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditMapi;
    } else if (mappedRmsAudit.mediaType === 'vapi') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditVapi;
    }

    mappedRmsAudit.typeId = mappedRmsAuditData.id;
    mappedRmsAuditData.id = mappedRmsAudit.id;
    mappedRmsAuditData.type = mappedRmsAudit.messageType;

    return mappedRmsAuditData;
  };

  const listRecordMessageStatusAudits = async (options = {}) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.accessors;
      const cmpRecordMessageStatusAudits = await CmpRecordMessageStatusAudit
        .listRecordMessageStatusAudits(options);
      const mappedCmpRecordMessageStatusAudits = cmpRecordMessageStatusAudits
        .map(mapRecordMessageStatusAudit);
      return Promise.resolve(mappedCmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditSmsBatch = async (audits) => {
    try {
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditSms,
      } = container.databaseService.accessors;

      const commonAudits = [];
      const smsAudits = [];

      for (let i = 0; i < audits.length; i += 1) {
        const audit = audits[i];
        const smsAuditId = container.uuid();
        smsAudits.push({
          id: smsAuditId,
          msisdn: audit.msisdn,
          to: audit.to,
          networkCode: audit.networkCode,
          messageId: audit.messageId,
          price: audit.price,
          status: audit.status,
          scts: audit.scts,
          errCode: audit.errCode,
          messageTimestamp: audit.messageTimestamp,
        });

        commonAudits.push({
          id: container.uuid(),
          cmpRecordMessageId: audit.cmpRecordMessageId,
          messageType: 'sms',
          cmpRecordMessageStatusAuditSmsId: smsAuditId,
          cmpRecordMessageStatusAuditMapiId: null,
          cmpRecordMessageStatusAuditVapiId: null,
        });
      }

      // Insert SMS Audits
      await CmpRecordMessageStatusAuditSms.createRecordMessageStatusAuditSmsBatch(smsAudits);
      await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditBatch(commonAudits);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditSms = async (
    cmpRecordMessageId,
    msisdn, to,
    networkCode, messageId,
    price, status,
    scts, errCode,
    messageTimestamp,
  ) => {
    try {
      L.trace(cmpRecordMessageId);
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditSms,
      } = container.databaseService.accessors;

      // Create RecordMessageStatusAudit Text
      const cmpRecordMessageStatusAuditSmsId = container.uuid();
      await CmpRecordMessageStatusAuditSms
        .createRecordMessageStatusAuditSms(
          container.uuid(),
          cmpRecordMessageStatusAuditSmsId,
          msisdn, to,
          networkCode, messageId,
          price, status,
          scts, errCode,
          messageTimestamp,
        );

      // Create RecordMessageStatusAudit
      await CmpRecordMessageStatusAudit
        .createRecordMessageStatusAudit(
          container.uuid(),
          cmpRecordMessageId,
          'sms',
          cmpRecordMessageStatusAuditSmsId,
          null,
          null,
        );

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditMapiBatch = async (audits) => {
    try {
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditMapi,
      } = container.databaseService.accessors;

      const commonAudits = [];
      const mapiAudits = [];

      for (let i = 0; i < audits.length; i += 1) {
        const audit = audits[i];
        const mapiAuditId = container.uuid();
        mapiAudits.push({
          id: mapiAuditId,
          messageUuid: audit.messageUuid,
          toType: audit.toType,
          toId: audit.toId,
          toNumber: audit.toNumber,
          fromType: audit.fromType,
          fromId: audit.fromId,
          fromNumber: audit.fromNumber,
          timestamp: audit.timestamp,
          status: audit.status,
          errorCode: audit.errorCode,
          errorReason: audit.errorReason,
          usageCurrency: audit.usageCurrency,
          usagePrice: audit.usagePrice,
          clientRef: audit.clientRef,
        });

        commonAudits.push({
          id: container.uuid(),
          cmpRecordMessageId: audit.cmpRecordMessageId,
          messageType: 'mapi',
          cmpRecordMessageStatusAuditSmsId: null,
          cmpRecordMessageStatusAuditMapiId: mapiAuditId,
          cmpRecordMessageStatusAuditVapiId: null,
        });
      }

      // Insert SMS Audits
      await CmpRecordMessageStatusAuditMapi.createRecordMessageStatusAuditMapiBatch(mapiAudits);
      await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditBatch(commonAudits);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditMapi = async (
    cmpRecordMessageId,
    messageUuid,
    toType, toId, toNumber,
    fromType, fromId, fromNumber,
    timestamp, status,
    errorCode, errorReason,
    usageCurrency, usagePrice,
    clientRef,
  ) => {
    try {
      L.trace(cmpRecordMessageId);
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditMapi,
      } = container.databaseService.accessors;

      // Create RecordMessageStatusAudit Text
      const cmpRecordMessageStatusAuditMapiId = container.uuid();
      await CmpRecordMessageStatusAuditMapi
        .createRecordMessageStatusAuditMapi(
          container.uuid(),
          cmpRecordMessageStatusAuditMapiId,
          messageUuid,
          toType, toId, toNumber,
          fromType, fromId, fromNumber,
          timestamp, status,
          errorCode, errorReason,
          usageCurrency, usagePrice,
          clientRef,
        );

      // Create RecordMessageStatusAudit
      const cmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit
        .createRecordMessageStatusAudit(
          container.uuid(),
          cmpRecordMessageId,
          'mapi',
          null,
          cmpRecordMessageStatusAuditMapiId,
          null,
        );
      const mappedCmpRecordMessageStatusAudit = mapRecordMessageStatusAudit(
        cmpRecordMessageStatusAudit,
      );

      return Promise.resolve(mappedCmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditVapiBatch = async (audits) => {
    try {
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditVapi,
      } = container.databaseService.accessors;

      const commonAudits = [];
      const vapiAudits = [];

      for (let i = 0; i < audits.length; i += 1) {
        const audit = audits[i];
        const vapiAuditId = container.uuid();
        vapiAudits.push({
          id: vapiAuditId,
          from: audit.from,
          to: audit.to,
          uuid: audit.uuid,
          conversationUuid: audit.conversationUuid,
          status: audit.status,
          direction: audit.direction,
          timestamp: audit.timestamp,
          startTime: audit.startTime,
          endTime: audit.endTime,
          duration: audit.duration,
          rate: audit.rate,
          price: audit.price,
          network: audit.network,
          detail: audit.detail,
          dtmfDigits: audit.dtmfDigits,
          dtmfTimedOut: audit.dtmfTimedOut,
          speechText: audit.speechText,
          speechConfidence: audit.speechConfidence,
          speechTimeoutReason: audit.speechTimeoutReason,
          speechErrorReason: audit.speechErrorReason,
          clientRef: audit.clientRef,
        });

        commonAudits.push({
          id: container.uuid(),
          cmpRecordMessageId: audit.cmpRecordMessageId,
          messageType: 'vapi',
          cmpRecordMessageStatusAuditSmsId: null,
          cmpRecordMessageStatusAuditMapiId: null,
          cmpRecordMessageStatusAuditVapiId: vapiAuditId,
        });
      }

      // Insert SMS Audits
      await CmpRecordMessageStatusAuditVapi.createRecordMessageStatusAuditVapiBatch(vapiAudits);
      await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditBatch(commonAudits);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditVapi = async (
    cmpRecordMessageId,
    from, to, uuid, conversationUuid,
    status, direction, timestamp,
    startTime, endTime,
    duration, rate, price, network, detail,
    dtmfDigits, dtmfTimedOut,
    speechText, speechConfidence,
    speechTimeoutReason, speechErrorReason,
    clientRef,
  ) => {
    try {
      L.trace(cmpRecordMessageId);
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditVapi,
      } = container.databaseService.accessors;

      // Create RecordMessageStatusAudit Text
      const cmpRecordMessageStatusAuditVapiId = container.uuid();
      await CmpRecordMessageStatusAuditVapi
        .createRecordMessageStatusAuditVapi(
          container.uuid(),
          cmpRecordMessageStatusAuditVapiId,
          from, to, uuid, conversationUuid,
          status, direction, timestamp,
          startTime, endTime,
          duration, rate, price, network, detail,
          dtmfDigits, dtmfTimedOut,
          speechText, speechConfidence,
          speechTimeoutReason, speechErrorReason,
          clientRef,
        );

      // Create RecordMessageStatusAudit
      const cmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit
        .createRecordMessageStatusAudit(
          container.uuid(),
          cmpRecordMessageId,
          'vapi',
          null,
          null,
          cmpRecordMessageStatusAuditVapiId,
        );
      const mappedCmpRecordMessageStatusAudit = mapRecordMessageStatusAudit(
        cmpRecordMessageStatusAudit,
      );

      return Promise.resolve(mappedCmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readRecordMessageStatusAudit = async (cmpRecordMessageStatusAuditId) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.accessors;
      const cmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit
        .readRecordMessageStatusAudit(cmpRecordMessageStatusAuditId);
      const mappedCmpRecordMessageStatusAudit = mapRecordMessageStatusAudit(
        cmpRecordMessageStatusAudit,
      );
      return Promise.resolve(mappedCmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAudit = async (
    cmpRecordMessageStatusAuditId, options = { noGet: true },
  ) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.accessors;
      const cmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit
        .deleteRecordMessageStatusAudit(cmpRecordMessageStatusAuditId, options);
      const mappedCmpRecordMessageStatusAudit = mapRecordMessageStatusAudit(
        cmpRecordMessageStatusAudit,
      );
      return Promise.resolve(mappedCmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAudits = async (
    criteria, options = { noGet: true },
  ) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.accessors;
      const cmpRecordMessageStatusAudits = await CmpRecordMessageStatusAudit
        .deleteRecordMessageStatusAudits(criteria, options);
      const mappedCmpRecordMessageStatusAudits = cmpRecordMessageStatusAudits
        .map(mapRecordMessageStatusAudit);
      return Promise.resolve(mappedCmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listRecordMessageStatusAudits,

    createRecordMessageStatusAuditSms,
    createRecordMessageStatusAuditSmsBatch,

    createRecordMessageStatusAuditMapi,
    createRecordMessageStatusAuditMapiBatch,

    createRecordMessageStatusAuditVapi,
    createRecordMessageStatusAuditVapiBatch,

    readRecordMessageStatusAudit,

    deleteRecordMessageStatusAudit,
    deleteRecordMessageStatusAudits,
  };
};
