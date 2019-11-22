export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Persistence Accessor');

  const listRecords = async () => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.listRecords();
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecord = async (
    recipient,
    cmpCampaignId,
    cmpChannelId,
    cmpMediaId,
    activeStartHour,
    activeStartMinute,
    activeEndHour,
    activeEndMinute,
    activeOnWeekends,
    timezone,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.createRecord(
        recipient,
        cmpCampaignId,
        cmpChannelId,
        cmpMediaId,
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
      );
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readRecord = async (cmpRecordId) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.readRecord(cmpRecordId);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecord = async (cmpRecordId, changes) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.updateRecord(
        cmpRecordId, changes,
      );
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecords = async (criteria, changes) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.updateRecords(criteria, changes);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecord = async (cmpRecordId) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecord = await CmpRecord.deleteRecord(cmpRecordId);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecords = async (criteria) => {
    try {
      const { CmpRecord } = container.databaseService.accessors;
      const cmpRecords = await CmpRecord.deleteRecords(criteria);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listRecords,

    createRecord,
    readRecord,

    updateRecord,
    updateRecords,

    deleteRecord,
    deleteRecords,
  };
};
