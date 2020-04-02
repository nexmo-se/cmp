export default (container) => {
  const { L } = container.defaultLogger('Picker Process (CSV)');


  const dataLoadCsv = async () => {
    try {
      const { client } = container.databaseService;
      const { dataloadPath } = container.config.csv;
      const recordFilePath = `${dataloadPath}/records.csv`;
      const parametersFilePath = `${dataloadPath}/parameters.csv`;
      const mediaFilePath = `${dataloadPath}/mediaList.csv`;

      const mediaAudioFilePath = `${dataloadPath}/mediaAudioList.csv`;
      const mediaFileFilePath = `${dataloadPath}/mediaFileList.csv`;
      const mediaImageFilePath = `${dataloadPath}/mediaImageList.csv`;
      const mediaLocationFilePath = `${dataloadPath}/mediaLocationList.csv`;
      const mediaTextFilePath = `${dataloadPath}/mediaTextList.csv`;
      const mediaViberTemplateFilePath = `${dataloadPath}/mediaViberTemplateList.csv`;
      const mediaVideoFilePath = `${dataloadPath}/mediaVideoList.csv`;


      const recordsSql = `LOAD DATA LOCAL INFILE '${recordFilePath}' INTO TABLE CmpRecords FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const parametersSql = `LOAD DATA LOCAL INFILE '${parametersFilePath}' INTO TABLE CmpParameters FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const mediaListSql = `LOAD DATA LOCAL INFILE '${mediaFilePath}' INTO TABLE CmpMedia FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;

      const mediaAudioSql = `LOAD DATA LOCAL INFILE '${mediaAudioFilePath}' INTO TABLE CmpMediaAudios FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const mediaFileSql = `LOAD DATA LOCAL INFILE '${mediaFileFilePath}' INTO TABLE CmpMediaFiles FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const mediaImageSql = `LOAD DATA LOCAL INFILE '${mediaImageFilePath}' INTO TABLE CmpMediaImages FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const mediaLocationSql = `LOAD DATA LOCAL INFILE '${mediaLocationFilePath}' INTO TABLE CmpMediaLocations FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const mediaTextSql = `LOAD DATA LOCAL INFILE '${mediaTextFilePath}' INTO TABLE CmpMediaTexts FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const mediaViberTemplateSql = `LOAD DATA LOCAL INFILE '${mediaViberTemplateFilePath}' INTO TABLE CmpMediaViberTemplates FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const mediaVideoSql = `LOAD DATA LOCAL INFILE '${mediaVideoFilePath}' INTO TABLE CmpMediaVideos FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;

      const loadingStart = new Date().getTime();

      // Dataload Records
      L.trace('DataLoading Records');
      const recordsStart = new Date().getTime();
      await client.query(recordsSql);
      const recordsEnd = new Date().getTime();
      L.debug(`Time Taken (DataLoading Records): ${recordsEnd - recordsStart}ms`);

      // Dataload Parameters
      L.trace('DataLoading Parameters');
      const parametersStart = new Date().getTime();
      await client.query(parametersSql);
      const parametersEnd = new Date().getTime();
      L.debug(`Time Taken (DataLoading Parameters): ${parametersEnd - parametersStart}ms`);

      // Dataload MediaList
      L.trace('DataLoading Parameters');
      const mediaStart = new Date().getTime();
      await client.query(mediaListSql);
      const mediaEnd = new Date().getTime();
      L.debug(`Time Taken (DataLoading Media): ${mediaEnd - mediaStart}ms`);


      const loadingEnd = new Date().getTime();
      L.debug(`Time Taken (DataLoading Total): ${loadingEnd - loadingStart}ms`);

      // Delete Dataload Files
      L.trace('Deleting DataLoad Files');
      container.fileService.deleteFile(recordFilePath);
      L.trace('Records DataLoad File deleted');
      container.fileService.deleteFile(parametersFilePath);
      L.trace('Parameters DataLoad File deleted');

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCsvForDataLoad = async (records) => {
    try {
      const { dataloadPath } = container.config.csv;
      const creatableRecords = records.map((record) => {
        const {
          recipient,
          cmpCampaignId, cmpTemplateId, actualCmpMediaId,
          activeStartHour, activeStartMinute,
          activeEndHour, activeEndMinute,
          activeOnWeekends, timezone,
        } = record;
        const sanitizedStart = container.dateTimeService
          .getDateInUtc(activeStartHour, activeStartMinute, timezone);
        const sanitizedEnd = container.dateTimeService
          .getDateInUtc(activeEndHour, activeEndMinute, timezone);
        return {
          id: container.uuid(),
          recipient,
          cmpCampaignId,
          cmpTemplateId,
          actualCmpMediaId,
          activeStartHour: sanitizedStart.getUTCHours(),
          activeStartMinute: sanitizedStart.getUTCMinutes(),
          activeEndHour: sanitizedEnd.getUTCHours(),
          activeEndMinute: sanitizedEnd.getUTCMinutes(),
          activeOnWeekends,
          timezone: container.dateTimeService.tzUTC,
          status: 'pending',
          statusTime: new Date(),
        };
      });

      const creatableParameters = [];
      for (let i = 0; i < records.length; i += 1) {
        const record = records[i];
        const creatableRecord = creatableRecords[i];

        const { cmpParameters } = record;
        const { id } = creatableRecord;

        for (let j = 0; j < cmpParameters.length; j += 1) {
          const parameterItem = {
            id: container.uuid(),
            cmpRecordId: id,
            parameter: cmpParameters[j],
            order: j,
          };
          creatableParameters.push(parameterItem);
        }
      }

      const timePattern = 'YYYY-MM-DD HH:mm:ss';

      // Create Parameters
      const createParameterStart = new Date().getTime();
      const parametersCsvArray = creatableParameters.map(parameter => ([
        parameter.id,
        parameter.cmpRecordId,
        parameter.parameter,
        parameter.order,
        0,
        container.moment().format(timePattern).toUpperCase(),
        container.moment().format(timePattern).toUpperCase(),
      ]));
      const parametersCsvString = await container.csvService.toCsv(parametersCsvArray);
      await container.fileService.writeContent(`${dataloadPath}/parameters.csv`, parametersCsvString);
      const createParameterEnd = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Parameters): ${createParameterEnd - createParameterStart}ms`);

      // Create Records
      const createRecordStart = new Date().getTime();
      const recordsCsvArray = creatableRecords.map(record => ([
        record.id,
        record.recipient,
        record.cmpCampaignId,
        record.cmpTemplateId,
        null,
        record.activeStartHour,
        record.activeStartMinute,
        record.activeEndHour,
        record.activeEndMinute,
        record.activeOnWeekends,
        record.timezone,
        null,
        record.status,
        container.moment().format(timePattern).toUpperCase(),
        0,
        container.moment().format(timePattern).toUpperCase(),
        container.moment().format(timePattern).toUpperCase(),
        (record.activeStartHour * 60) + record.activeStartMinute,
        (record.activeEndHour * 60) + record.activeEndMinute,
      ]));
      const recordsCsvString = await container.csvService.toCsv(recordsCsvArray);
      await container.fileService.writeContent(`${dataloadPath}/records.csv`, recordsCsvString);
      const createRecordEnd = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Records): ${createRecordEnd - createRecordStart}ms`);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordsCsv = async (records) => {
    try {
      await generateCsvForDataLoad(records);
      await dataLoadCsv();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    createRecordsCsv,
  };
};
