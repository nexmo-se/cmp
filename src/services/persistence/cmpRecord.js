/**
 * Persistence Service for CMP Records
 * Create, Read, Update, Delete and List Records
 * Get Active Records (waiting to be sent)
 */


export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Persistence Accessor');

  const mapRecordMessageStatusAudit = (rmsAudit) => {
    const mappedRmsAudit = Object.assign({}, rmsAudit);

    let mappedRmsAuditData = {};
    if (mappedRmsAudit.messageType === 'sms') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditSms;
    } else if (mappedRmsAudit.messageType === 'mapi') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditMapi;
    } else if (mappedRmsAudit.messageType === 'vapi') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditVapi;
    } else if (mappedRmsAudit.messageType === 'ni') {
      mappedRmsAuditData = mappedRmsAudit.cmpRecordMessageStatusAuditNi;
    }

    mappedRmsAudit.typeId = mappedRmsAuditData.id;
    mappedRmsAuditData.id = mappedRmsAudit.id;
    mappedRmsAuditData.type = mappedRmsAudit.messageType;

    return mappedRmsAuditData;
  };

  const mapRecordMessage = (recordMessage) => {
    const mappedRecordMessage = Object.assign({}, recordMessage);
    const rmsAudits = mappedRecordMessage.cmpRecordMessageStatusAudits || [];
    mappedRecordMessage.cmpRecordMessageStatusAudits = rmsAudits.map(mapRecordMessageStatusAudit);

    return mappedRecordMessage;
  };

  const mapRecord = (record) => {
    const mappedCmpRecord = Object.assign({}, record);
    const recordedMessages = mappedCmpRecord.cmpRecordMessages || [];
    mappedCmpRecord.cmpRecordMessages = recordedMessages.map(mapRecordMessage);
    return mappedCmpRecord;
  };

  const listRecords = async (excludeSecret = true, options = { limit: 30, offset: 0 }) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.listRecords(excludeSecret, options);
      const mappedCmpRecords = cmpRecords.map(mapRecord);
      return Promise.resolve(mappedCmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecord = async (criteria = {}, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.findRecord(
        criteria, excludeSecret, true,
      );
      if (cmpRecord == null) {
        return Promise.resolve(null);
      }
      const mappedCmpRecord = mapRecord(cmpRecord);
      return Promise.resolve(mappedCmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecords = async (
    criteria = {}, excludeSecret = true, options = { limit: 30, offset: 0 },
  ) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.findRecords(
        criteria, excludeSecret, true, options,
      );
      const mappedCmpRecords = cmpRecords.map(mapRecord);
      return Promise.resolve(mappedCmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getActiveRecords = async (numberOfRecords, currentTime, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.getActiveRecords(
        numberOfRecords, currentTime, excludeSecret,
      );
      const mappedCmpRecords = cmpRecords.map(mapRecord);
      return Promise.resolve(mappedCmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const countPendingRecordsByCampaignId = async (campaignId) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const count = await CmpRecord.countPendingRecordsByCampaignId(campaignId);
      return Promise.resolve(count);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const countPendingAndQueuingRecordsByCampaignId = async (campaignId) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const count = await CmpRecord.countPendingAndQueuingRecordsByCampaignId(campaignId);
      return Promise.resolve(count);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordBatch = async (records, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.createRecordBatch(records, excludeSecret);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecord = async (
    recipient,
    cmpCampaignId,
    cmpTemplateId,
    cmpMediaId,
    cmpVoiceId,
    activeStartHour,
    activeStartMinute,
    activeEndHour,
    activeEndMinute,
    activeOnWeekends,
    timezone,
    excludeSecret = true,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.createRecord(
        recipient,
        cmpCampaignId,
        cmpTemplateId,
        cmpMediaId,
        cmpVoiceId,
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
        excludeSecret,
      );
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readRecord = async (cmpRecordId, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.readRecord(cmpRecordId, excludeSecret);
      const mappedCmpRecord = mapRecord(cmpRecord);
      return Promise.resolve(mappedCmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecord = async (cmpRecordId, changes, excludeSecret = true, options = {}) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.updateRecord(
        cmpRecordId, changes, excludeSecret, options,
      );
      const mappedCmpRecord = mapRecord(cmpRecord);
      return Promise.resolve(mappedCmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecords = async (
    criteria, changes, excludeSecret = true, includeGet = true, options = {},
  ) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.updateRecords(
        criteria, changes, excludeSecret, includeGet, options,
      );
      const mappedCmpRecords = cmpRecords.map(mapRecord);
      return Promise.resolve(mappedCmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecord = async (cmpRecordId, excludeSecret = true, options = { noGet: true }) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.deleteRecord(cmpRecordId, excludeSecret, options);
      const mappedCmpRecord = mapRecord(cmpRecord);
      return Promise.resolve(mappedCmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecords = async (criteria, excludeSecret = true, options = { noGet: true }) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.deleteRecords(criteria, excludeSecret, options);
      const mappedCmpRecords = cmpRecords.map(mapRecord);
      return Promise.resolve(mappedCmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listRecords,
    getActiveRecords,
    countPendingRecordsByCampaignId,
    countPendingAndQueuingRecordsByCampaignId,

    createRecord,
    createRecordBatch,
    readRecord,

    updateRecord,
    updateRecords,

    deleteRecord,
    deleteRecords,

    findRecord,
    findRecords,
  };
};
