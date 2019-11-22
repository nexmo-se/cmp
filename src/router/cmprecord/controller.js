export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Controller');

  const listAllRecords = async (req, res, next) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.listRecords(false);
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const listMyRecords = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Records');
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.listRecords();
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllRecords = async (req, res, next) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.deleteRecords({});
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const createParameter = async (cmpRecordId, parameter, order) => {
    try {
      const { CmpParameter } = container.persistenceService;
      const cmpParameter = await CmpParameter.createParameter(
        cmpRecordId, parameter, order,
      );
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createParameters = async (cmpRecordId, parameters) => {
    try {
      const promises = parameters.map(
        (parameter, index) => createParameter(cmpRecordId, parameter, index),
      );
      const results = await Promise.all(promises);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameters = async (cmpRecordId) => {
    try {
      const { CmpParameter } = container.persistenceService;
      const criteria = {
        cmpRecordId,
      };
      const results = await CmpParameter.deleteParameters(criteria);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMedia = async (media) => {
    try {
      const {
        type, text, url, caption, fileName, latitude, longitude, name, address,
      } = media;
      const { CmpMedia } = container.persistenceService;

      const cmpMedia = await CmpMedia.createMedia(
        type, text, url, caption, fileName, latitude, longitude, name, address,
      );
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecord = async (record) => {
    try {
      const {
        recipient,
        cmpCampaignId,
        cmpTemplateId,
        cmpMediaId,
        cmpMedia,
        cmpParameters,
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
      } = record;
      const { CmpRecord } = container.persistenceService;

      let actualCmpMediaId = cmpMediaId;
      if (actualCmpMediaId == null && cmpMedia) {
        L.debug('Creating New Media');
        const actualCmpMedia = await createMedia(cmpMedia);
        actualCmpMediaId = actualCmpMedia.id;
      }

      const cmpRecord = await CmpRecord.createRecord(
        recipient,
        cmpCampaignId,
        cmpTemplateId,
        actualCmpMediaId,
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
      );

      if (cmpParameters) {
        // Delete Previous Parameters
        L.debug('Removing Previous Parameters');
        await deleteParameters(cmpRecord.id);

        // Create New Parameters
        L.debug('Creating New Parameters');
        await createParameters(cmpRecord.id, cmpParameters);
      }


      L.debug('Setting Record to Pending');
      const changes = {
        status: 'pending',
        statusTime: new Date(),
      };
      const updatedCmpRecord = await CmpRecord.updateRecord(cmpRecord.id, changes, true);
      return Promise.resolve(updatedCmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordBatch = async (req, res, next) => {
    try {
      const records = req.body;
      const promises = records.map(record => createRecord(record));
      const cmpRecords = await Promise.all(promises);
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const createRecordSingle = async (req, res, next) => {
    try {
      const record = req.body;
      const cmpRecord = await createRecord(record);
      res.status(200).json(cmpRecord);
    } catch (error) {
      next(error);
    }
  };

  const readRecord = async (req, res, next) => {
    try {
      const { cmpRecordId } = req.params;
      const { CmpRecord } = container.persistenceService;

      const cmpRecord = await CmpRecord.readRecord(cmpRecordId);
      res.status(200).json(cmpRecord);
    } catch (error) {
      next(error);
    }
  };

  const readMyRecord = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Records');
      const { cmpRecordId } = req.params;
      const { CmpRecord } = container.persistenceService;

      const cmpRecord = await CmpRecord.readRecord(cmpRecordId);
      res.status(200).json(cmpRecord);
    } catch (error) {
      next(error);
    }
  };

  const deleteRecord = async (req, res, next) => {
    try {
      const { cmpRecordId } = req.params;
      const { CmpRecord } = container.persistenceService;
      const cmpRecord = await CmpRecord.deleteRecord(cmpRecordId);
      res.status(200).json(cmpRecord);
    } catch (error) {
      next(error);
    }
  };

  return {
    listAllRecords,
    listMyRecords,
    deleteAllRecords,

    createRecordBatch,
    createRecordSingle,

    readRecord,
    readMyRecord,
    deleteRecord,
  };
};
