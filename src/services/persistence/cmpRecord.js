export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Persistence Accessor');

  const listRecords = async (limit, offset, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.listRecords(limit, offset, excludeSecret);
      return Promise.resolve(cmpRecords);
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
      return Promise.resolve(cmpRecords);
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

  const createRecord = async (
    recipient,
    cmpCampaignId,
    cmpTemplateId,
    cmpMediaId,
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
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecord = async (cmpRecordId, changes, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.updateRecord(
        cmpRecordId, changes, excludeSecret,
      );
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecords = async (criteria, changes, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.updateRecords(criteria, changes, excludeSecret);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecord = async (cmpRecordId, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.deleteRecord(cmpRecordId, excludeSecret);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecords = async (criteria, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.deleteRecords(criteria, excludeSecret);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listRecords,
    getActiveRecords,
    countPendingRecordsByCampaignId,

    createRecord,
    readRecord,

    updateRecord,
    updateRecords,

    deleteRecord,
    deleteRecords,
  };
};
