export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Controller');

  const findAllRecords = async (req, res, next) => {
    try {
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        recipient,
        cmpCampaignId, cmpTemplateId, cmpMediaId,
        activeStartHour, activeStartMinute, activeEndHour, activeEndMinute,
        activeOnWeekends, timezone, status,
      } = req.body;
      const criteria = {};
      if (recipient) {
        if (typeof recipient === 'string') {
          criteria.recipient = {
            [Op.like]: `%${recipient}%`,
          };
        } else {
          criteria.recipient = recipient;
        }
      }
      if (cmpCampaignId) {
        criteria.cmpCampaignId = cmpCampaignId;
      }
      if (cmpTemplateId) {
        criteria.cmpTemplateId = cmpTemplateId;
      }
      if (cmpMediaId) {
        criteria.cmpMediaId = cmpMediaId;
      }
      if (activeStartHour) {
        criteria.activeStartHour = activeStartHour;
      }
      if (activeStartMinute) {
        criteria.activeStartMinute = activeStartMinute;
      }
      if (activeEndHour) {
        criteria.activeEndHour = activeEndHour;
      }
      if (activeEndMinute) {
        criteria.activeEndMinute = activeEndMinute;
      }
      if (activeOnWeekends != null) {
        criteria.activeOnWeekends = activeOnWeekends;
      }
      if (timezone) {
        criteria.timezone = timezone;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.findRecords(criteria, true, options);
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const findMyRecords = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Records');
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        recipient,
        cmpCampaignId, cmpTemplateId, cmpMediaId,
        activeStartHour, activeStartMinute, activeEndHour, activeEndMinute,
        activeOnWeekends, timezone, status,
      } = req.body;
      const criteria = {};
      if (recipient) {
        if (typeof recipient === 'string') {
          criteria.recipient = {
            [Op.like]: `%${recipient}%`,
          };
        } else {
          criteria.recipient = recipient;
        }
      }
      if (cmpCampaignId) {
        criteria.cmpCampaignId = cmpCampaignId;
      }
      if (cmpTemplateId) {
        criteria.cmpTemplateId = cmpTemplateId;
      }
      if (cmpMediaId) {
        criteria.cmpMediaId = cmpMediaId;
      }
      if (activeStartHour) {
        criteria.activeStartHour = activeStartHour;
      }
      if (activeStartMinute) {
        criteria.activeStartMinute = activeStartMinute;
      }
      if (activeEndHour) {
        criteria.activeEndHour = activeEndHour;
      }
      if (activeEndMinute) {
        criteria.activeEndMinute = activeEndMinute;
      }
      if (activeOnWeekends != null) {
        criteria.activeOnWeekends = activeOnWeekends;
      }
      if (timezone) {
        criteria.timezone = timezone;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.findRecords(criteria, true, options);
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const listAllRecords = async (req, res, next) => {
    try {
      const {
        limit, offset,
        recipient,
        cmpCampaignId, cmpTemplateId, cmpMediaId,
        activeStartHour, activeStartMinute, activeEndHour, activeEndMinute,
        activeOnWeekends, timezone, status,
      } = req.query;
      const criteria = {};
      if (recipient) {
        criteria.recipient = recipient;
      }
      if (cmpCampaignId) {
        criteria.cmpCampaignId = cmpCampaignId;
      }
      if (cmpTemplateId) {
        criteria.cmpTemplateId = cmpTemplateId;
      }
      if (cmpMediaId) {
        criteria.cmpMediaId = cmpMediaId;
      }
      if (activeStartHour) {
        criteria.activeStartHour = activeStartHour;
      }
      if (activeStartMinute) {
        criteria.activeStartMinute = activeStartMinute;
      }
      if (activeEndHour) {
        criteria.activeEndHour = activeEndHour;
      }
      if (activeEndMinute) {
        criteria.activeEndMinute = activeEndMinute;
      }
      if (activeOnWeekends != null) {
        criteria.activeOnWeekends = activeOnWeekends;
      }
      if (timezone) {
        criteria.timezone = timezone;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.findRecords(criteria, true, options);
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const listMyRecords = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Records');
      const {
        limit, offset,
        recipient,
        cmpCampaignId, cmpTemplateId, cmpMediaId,
        activeStartHour, activeStartMinute, activeEndHour, activeEndMinute,
        activeOnWeekends, timezone, status,
      } = req.query;
      const criteria = {};
      if (recipient) {
        criteria.recipient = recipient;
      }
      if (cmpCampaignId) {
        criteria.cmpCampaignId = cmpCampaignId;
      }
      if (cmpTemplateId) {
        criteria.cmpTemplateId = cmpTemplateId;
      }
      if (cmpMediaId) {
        criteria.cmpMediaId = cmpMediaId;
      }
      if (activeStartHour) {
        criteria.activeStartHour = activeStartHour;
      }
      if (activeStartMinute) {
        criteria.activeStartMinute = activeStartMinute;
      }
      if (activeEndHour) {
        criteria.activeEndHour = activeEndHour;
      }
      if (activeEndMinute) {
        criteria.activeEndMinute = activeEndMinute;
      }
      if (activeOnWeekends != null) {
        criteria.activeOnWeekends = activeOnWeekends;
      }
      if (timezone) {
        criteria.timezone = timezone;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.findRecords(criteria, true, options);
      res.status(200).json(cmpRecords);
    } catch (error) {
      next(error);
    }
  };

  const listActiveRecords = async (req, res, next) => {
    try {
      const numberOfRecords = req.query.limit;
      const currentTime = req.query.time ? new Date(req.query.time) : new Date();
      const { CmpRecord } = container.persistenceService;
      const cmpRecords = await CmpRecord.getActiveRecords(numberOfRecords, currentTime, true);
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
        type, text, url, caption, fileName, latitude, longitude, name, address, actionUrl,
      } = media;
      const { CmpMedia } = container.persistenceService;

      const cmpMedia = await CmpMedia.createMedia(
        type, text, url, caption, fileName, latitude, longitude, name, address, actionUrl,
      );
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createVoice = async (voice) => {
    try {
      const {
        voiceType, language, style,
        streamUrl, answerUrl,
      } = voice;
      const { CmpVoice } = container.persistenceService;

      const cmpVoice = await CmpVoice.createVoice(
        voiceType, language, style,
        streamUrl, answerUrl,
      );
      return Promise.resolve(cmpVoice);
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
        cmpVoiceId,
        cmpMedia,
        cmpVoice,
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
        L.trace('Creating New Media');
        const actualCmpMedia = await createMedia(cmpMedia);
        actualCmpMediaId = actualCmpMedia.id;
      }

      let actualCmpVoiceId = cmpVoiceId;
      if (actualCmpVoiceId == null && cmpVoice) {
        const actualCmpVoice = await createVoice(cmpVoice);
        actualCmpVoiceId = actualCmpVoice.id;
      }


      const sanitizedStart = container.dateTimeService
        .getDateInUtc(activeStartHour, activeStartMinute, timezone);
      const sanitizedEnd = container.dateTimeService
        .getDateInUtc(activeEndHour, activeEndMinute, timezone);

      const cmpRecord = await CmpRecord.createRecord(
        recipient,
        cmpCampaignId,
        cmpTemplateId,
        actualCmpMediaId,
        actualCmpVoiceId,
        sanitizedStart.getUTCHours(),
        sanitizedStart.getUTCMinutes(),
        sanitizedEnd.getUTCHours(),
        sanitizedEnd.getUTCMinutes(),
        activeOnWeekends,
        container.dateTimeService.tzUTC,
      );

      if (cmpParameters) {
        // Delete Previous Parameters
        L.trace('Removing Previous Parameters');
        await deleteParameters(cmpRecord.id);

        // Create New Parameters
        L.trace('Creating New Parameters');
        await createParameters(cmpRecord.id, cmpParameters);
      }


      L.trace('Setting Record to Pending');
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

  const uploadCsv = async (req, res, next) => {
    try {
      const { file } = req;
      const uploadedFile = {
        fieldname: file.fieldname,
        originalname: file.originalname,
        mimetype: file.mimetype,
        filename: file.filename,
        size: file.size,
      };

      const oldPath = `${container.config.csv.uploadPath}/${file.filename}`;
      const newPath = oldPath.replace(/.tmp/g, '');
      L.debug(oldPath);
      L.debug(newPath);

      await container.fileService.renameFile(oldPath, newPath);
      res.status(200).json(uploadedFile);
    } catch (error) {
      next(error);
    }
  };

  const createCsvMetadata = async (req, res, next) => {
    try {
      const { uploadPath } = container.config.csv;
      const { cmpCampaignId, cmpTemplateId } = req.params;
      const { body: metadata } = req;

      L.trace(metadata);

      const fileName = `${cmpCampaignId}_${cmpTemplateId}.metadata`;
      const filePath = `${uploadPath}/${fileName}`;
      const jsonBody = JSON.stringify(metadata);

      await container.fileService.writeContent(filePath, jsonBody, true);
      res.json({ status: 'ok' });
    } catch (error) {
      next(error);
    }
  };

  return {
    findAllRecords,
    findMyRecords,

    listAllRecords,
    listMyRecords,
    listActiveRecords,
    deleteAllRecords,

    createRecordBatch,
    createRecordSingle,

    readRecord,
    readMyRecord,
    deleteRecord,

    createCsvMetadata,
    uploadCsv,
  };
};
