export default (container) => {
  const { L } = container.defaultLogger('Picker Process (Database)');

  const generateCreatableRecord = (cmpRecordId, cmpMediaId, record) => {
    const {
      recipient,
      cmpCampaignId, cmpTemplateId, cmpMedia,
      activeStartHour, activeStartMinute,
      activeEndHour, activeEndMinute,
      activeOnWeekends, timezone,
    } = record;
    const sanitizedStart = container.dateTimeService
      .getDateInUtc(activeStartHour, activeStartMinute, timezone);
    const sanitizedEnd = container.dateTimeService
      .getDateInUtc(activeEndHour, activeEndMinute, timezone);

    const creatableRecord = {
      id: cmpRecordId,
      recipient,
      cmpCampaignId,
      cmpTemplateId,
      activeStartHour: sanitizedStart.getUTCHours(),
      activeStartMinute: sanitizedStart.getUTCMinutes(),
      activeEndHour: sanitizedEnd.getUTCHours(),
      activeEndMinute: sanitizedEnd.getUTCMinutes(),
      activeOnWeekends,
      timezone: container.dateTimeService.tzUTC,
      status: 'pending',
      statusTime: new Date(),
    };
    if (cmpMedia) {
      creatableRecord.cmpMediaId = cmpMediaId;
    }

    return creatableRecord;
  };

  const generateCreatableParameters = (cmpRecordId, record) => {
    const { cmpParameters } = record;

    const creatableParameters = [];

    for (let i = 0; i < cmpParameters.length; i += 1) {
      const creatableParameter = {
        cmpRecordId,
        parameter: cmpParameters[i],
        order: i,
      };

      creatableParameters.push(creatableParameter);
    }

    return creatableParameters;
  };

  const generateCreatableMedia = (cmpMediaId, record) => {
    const { cmpMedia } = record;

    if (cmpMedia) {
      const creatableMedia = {
        id: cmpMediaId,
        type: cmpMedia.type,
        text: cmpMedia.text,
        url: cmpMedia.url,
        caption: cmpMedia.caption,
        fileName: cmpMedia.fileName,
        latitude: cmpMedia.latitude,
        longitude: cmpMedia.longitude,
        name: cmpMedia.name,
        address: cmpMedia.address,
        actionUrl: cmpMedia.actionUrl,
      };

      return creatableMedia;
    }

    return null;
  };

  const createRecordsDatabase = async (records) => {
    try {
      const { CmpRecord, CmpParameter, CmpMedia } = container.persistenceService;

      const creatableRecords = [];
      const creatableParameters = [];
      const creatableMediaList = [];

      for (let i = 0; i < records.length; i += 1) {
        const record = records[i];

        const cmpRecordId = container.uuid();
        const cmpMediaId = container.uuid();

        // Record
        const creatableRecord = generateCreatableRecord(cmpRecordId, cmpMediaId, record);
        creatableRecords.push(creatableRecord);

        // Parameters
        const creatableParameterList = generateCreatableParameters(cmpRecordId, record);
        for (let j = 0; j < creatableParameterList.length; j += 1) {
          const creatableParameter = creatableParameterList[j];
          creatableParameters.push(creatableParameter);
        }

        // Media
        const creatableMedia = generateCreatableMedia(cmpMediaId, record);
        creatableMediaList.push(creatableMedia);
      }

      // Create Media
      const createMediaStart = new Date().getTime();
      await CmpMedia.createMediaBatch(creatableParameters);
      const createMediaEnd = new Date().getTime();
      L.debug(`Time Taken (Create Media): ${createMediaEnd - createMediaStart}ms`);

      // Create Parameters
      const createParameterStart = new Date().getTime();
      await CmpParameter.createParameterBatch(creatableParameters);
      const createParameterEnd = new Date().getTime();
      L.debug(`Time Taken (Create Parameters): ${createParameterEnd - createParameterStart}ms`);

      // Create Records
      const createRecordStart = new Date().getTime();
      const createdRecords = await CmpRecord.createRecordBatch(creatableRecords);
      const createRecordEnd = new Date().getTime();
      L.debug(`Time Taken (Create Records): ${createRecordEnd - createRecordStart}ms`);

      return Promise.resolve(createdRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    createRecordsDatabase,
  };
};
