export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Persistence Accessor');

  const mapRecordMessageStatusAudit = (rmsAudit) => {
    const mappedRmsAudit = Object.assign({}, rmsAudit);

    let mappedRmsAuditData = {};
    if (mappedRmsAudit.messageType === 'sms') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditSms;
    } else if (mappedRmsAudit.mediaType === 'mapi') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditMapi;
    }

    mappedRmsAudit.typeId = mappedRmsAuditData.id;
    mappedRmsAuditData.id = mappedRmsAudit.id;
    mappedRmsAuditData.type = mappedRmsAudit.messageType;

    return mappedRmsAuditData;
  };

  const listRecordMessageStatusAudits = async () => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.accessors;
      const cmpRecordMessageStatusAudits = await CmpRecordMessageStatusAudit
        .listRecordMessageStatusAudits();
      const mappedCmpRecordMessageStatusAudits = cmpRecordMessageStatusAudits
        .map(mapRecordMessageStatusAudit);
      return Promise.resolve(mappedCmpRecordMessageStatusAudits);
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
      L.debug(cmpRecordMessageId);
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditSms,
      } = container.databaseService.accessors;

      // Create RecordMessageStatusAudit Text
      const cmpRecordMessageStatusAuditSms = await CmpRecordMessageStatusAuditSms
        .createRecordMessageStatusAuditSms(
          msisdn, to,
          networkCode, messageId,
          price, status,
          scts, errCode,
          messageTimestamp,
        );
      const cmpRMSAuditSmsId = cmpRecordMessageStatusAuditSms.id;

      // Create RecordMessageStatusAudit
      const cmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit
        .createRecordMessageStatusAudit(
          cmpRecordMessageId,
          'sms',
          cmpRMSAuditSmsId,
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
      L.debug(cmpRecordMessageId);
      const {
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditMapi,
      } = container.databaseService.accessors;

      // Create RecordMessageStatusAudit Text
      const cmpRecordMessageStatusAuditMapi = await CmpRecordMessageStatusAuditMapi
        .createRecordMessageStatusAuditMapi(
          messageUuid,
          toType, toId, toNumber,
          fromType, fromId, fromNumber,
          timestamp, status,
          errorCode, errorReason,
          usageCurrency, usagePrice,
          clientRef,
        );
      const cmpRMSAuditMapiId = cmpRecordMessageStatusAuditMapi.id;

      // Create RecordMessageStatusAudit
      const cmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit
        .createRecordMessageStatusAudit(
          cmpRecordMessageId,
          'mapi',
          null,
          cmpRMSAuditMapiId,
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

  const deleteRecordMessageStatusAudit = async (cmpRecordMessageStatusAuditId) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.accessors;
      const cmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit
        .deleteRecordMessageStatusAudit(cmpRecordMessageStatusAuditId);
      const mappedCmpRecordMessageStatusAudit = mapRecordMessageStatusAudit(
        cmpRecordMessageStatusAudit,
      );
      return Promise.resolve(mappedCmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAudits = async (criteria) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.accessors;
      const cmpRecordMessageStatusAudits = await CmpRecordMessageStatusAudit
        .deleteRecordMessageStatusAudits(criteria);
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
    createRecordMessageStatusAuditMapi,
    readRecordMessageStatusAudit,

    deleteRecordMessageStatusAudit,
    deleteRecordMessageStatusAudits,
  };
};
