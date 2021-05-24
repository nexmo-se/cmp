/**
 * Create DataLoad CSV and DataLoad them into the Database
 */

import CreatableGenerator from './creatableGenerator';

export default (container) => {
  const { L } = container.defaultLogger('Picker Process (CSV)');

  const generator = CreatableGenerator(container);

  const timePattern = 'YYYY-MM-DD HH:mm:ss';

  const CsvTypes = {
    record: 'records',
    parameter: 'parameters',
    voice: 'voices',
    media: 'media',

    mediaAudio: 'mediaAudio',
    mediaFile: 'mediaFile',
    mediaImage: 'mediaImage',
    mediaLocation: 'mediaLocation',
    mediaText: 'mediaText',
    mediaViberTemplate: 'mediaViberTemplate',
    mediaVideo: 'mediaVideo',
  };

  const TableNames = {
    record: 'CmpRecords',
    parameter: 'CmpParameters',
    voice: 'CmpVoices',
    media: 'CmpMedia',

    mediaAudio: 'CmpMediaAudios',
    mediaFile: 'CmpMediaFiles',
    mediaImage: 'CmpMediaImages',
    mediaLocation: 'CmpMediaLocations',
    mediaText: 'CmpMediaTexts',
    mediaViberTemplate: 'CmpMediaViberTemplates',
    mediaVideo: 'CmpMediaVideos',
  };

  const getCsvPath = (csvType) => {
    const { dataloadPath } = container.config.csv;
    return `${dataloadPath}/${csvType}.csv`;
  };

  const getDataLoadSql = (csvType, tableName) => {
    const filePath = getCsvPath(csvType);
    return `LOAD DATA LOCAL INFILE '${filePath}' INTO TABLE ${tableName} FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
  };

  const dataLoadCsvType = async (csvType, tableName) => {
    try {
      const { client } = container.databaseService;

      const sql = getDataLoadSql(csvType, tableName);

      L.trace(`DataLoading ${csvType}`);
      const startTime = new Date().getTime();
      await client.query(sql);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (DataLoading ${csvType}): ${endTime - startTime}ms`);

      L.trace(`Deleting DataLoad File (${csvType})`);
      const csvPath = getCsvPath(csvType);
      container.fileService.deleteFile(csvPath);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const dataLoadCsv = async () => {
    try {
      const loadingStart = new Date().getTime();

      await dataLoadCsvType(CsvTypes.mediaAudio, TableNames.mediaAudio);
      await dataLoadCsvType(CsvTypes.mediaFile, TableNames.mediaFile);
      await dataLoadCsvType(CsvTypes.mediaImage, TableNames.mediaImage);
      await dataLoadCsvType(CsvTypes.mediaLocation, TableNames.mediaLocation);
      await dataLoadCsvType(CsvTypes.mediaText, TableNames.mediaText);
      await dataLoadCsvType(CsvTypes.mediaViberTemplate, TableNames.mediaViberTemplate);
      await dataLoadCsvType(CsvTypes.mediaVideo, TableNames.mediaVideo);

      await dataLoadCsvType(CsvTypes.media, TableNames.media);
      await dataLoadCsvType(CsvTypes.voice, TableNames.voice);
      await dataLoadCsvType(CsvTypes.record, TableNames.record);
      await dataLoadCsvType(CsvTypes.parameter, TableNames.parameter);

      const loadingEnd = new Date().getTime();
      L.debug(`Time Taken (DataLoading Total): ${loadingEnd - loadingStart}ms`);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCreatableLists = (records) => {
    const creatableLists = {
      records: [],
      parameters: [],
      voices: [],
      media: [],

      mediaAudio: [],
      mediaFile: [],
      mediaImage: [],
      mediaLocation: [],
      mediaText: [],
      mediaViberTemplate: [],
      mediaVideo: [],
    };

    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];

      const cmpRecordId = container.uuid();
      const cmpMediaId = container.uuid();
      const cmpVoiceId = container.uuid();
      const cmpMediaTypeId = container.uuid();

      const creatableRecord = generator.generateCreatableRecord(cmpRecordId, cmpMediaId, cmpVoiceId, record);
      creatableLists.records.push(creatableRecord);

      const creatableParameterList = generator.generateCreatableParameters(cmpRecordId, record);
      for (let j = 0; j < creatableParameterList.length; j += 1) {
        const creatableParameter = creatableParameterList[j];
        creatableLists.parameters.push(creatableParameter);
      }

      const { cmpVoice } = record;
      if (cmpVoice != null) {
        const {

        } = cmpVoice;
        const creatableVoice = generator.generateCreatableVoice(cmpVoiceId, record)
      }

      const { cmpMedia } = record;
      if (cmpMedia != null) {
        const { mediaType } = cmpMedia;

        if (mediaType === 'audio') {
          const creatableMediaAudio = generator
            .generateCreatableMediaAudio(cmpMediaTypeId, record);
          creatableLists.mediaAudio.push(creatableMediaAudio);
        } else if (mediaType === 'file') {
          const creatableMediaFile = generator
            .generateCreatableMediaFile(cmpMediaTypeId, record);
          creatableLists.mediaFile.push(creatableMediaFile);
        } else if (mediaType === 'image') {
          const creatableMediaImage = generator
            .generateCreatableMediaImage(cmpMediaTypeId, record);
          creatableLists.mediaImage.push(creatableMediaImage);
        } else if (mediaType === 'location') {
          const creatableMediaLocation = generator
            .generateCreatableMediaLocation(cmpMediaTypeId, record);
          creatableLists.mediaLocation.push(creatableMediaLocation);
        } else if (mediaType === 'text') {
          const creatableMediaText = generator
            .generateCreatableMediaText(cmpMediaTypeId, record);
          creatableLists.mediaText.push(creatableMediaText);
        } else if (mediaType === 'viber_template') {
          const creatableMediaViberTemplate = generator
            .generateCreatableMediaViberTemplate(cmpMediaTypeId, record);
          creatableLists.mediaViberTemplate.push(creatableMediaViberTemplate);
        } else if (mediaType === 'video') {
          const creatableMediaVideo = generator
            .generateCreatableMediaVideo(cmpMediaTypeId, record);
          creatableLists.mediaVideo.push(creatableMediaVideo);
        }

        const creatableMedia = generator
          .generateCreatableMediaRaw(cmpMediaId, cmpMediaTypeId, record);
        creatableLists.media.push(creatableMedia);
      }
    }

    return creatableLists;
  };

  const generateRecordCsv = async (records) => {
    try {
      const createRecordStart = new Date().getTime();
      const recordsCsvArray = records.map(record => ([
        record.id,
        record.recipient,
        record.cmpCampaignId,
        record.cmpTemplateId,
        record.cmpMediaId || '\\N',
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
        record.cmpVideoId || '\\N',
      ]));
      const recordsCsvString = await container.csvService.toCsv(recordsCsvArray);
      const csvPath = getCsvPath(CsvTypes.record);
      await container.fileService.writeContent(csvPath, recordsCsvString);
      const createRecordEnd = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Records): ${createRecordEnd - createRecordStart}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateParameterCsv = async (parameters) => {
    try {
      const createParameterStart = new Date().getTime();
      const parametersCsvArray = parameters.map(parameter => ([
        parameter.id,
        parameter.cmpRecordId,
        parameter.parameter,
        parameter.order,
        0,
        container.moment().format(timePattern).toUpperCase(),
        container.moment().format(timePattern).toUpperCase(),
      ]));
      const parametersCsvString = await container.csvService.toCsv(parametersCsvArray);
      const csvPath = getCsvPath(CsvTypes.parameter);
      await container.fileService.writeContent(csvPath, parametersCsvString);
      const createParameterEnd = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Parameters): ${createParameterEnd - createParameterStart}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateVoiceCsv = async (voiceList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = voiceList.map(voiceItem => ([
        voiceItem.id,
        voiceItem.voiceType || '\\N',
        voiceItem.language || '\\N',
        voiceItem.style || '\\N',
        voiceItem.streamUrl || '\\N',
        voiceItem.answerUrl || '\\N',
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.voice);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Voice): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.mediaType || '\\N',
        mediaItem.cmpMediaTextId || '\\N',
        mediaItem.cmpMediaImageId || '\\N',
        mediaItem.cmpMediaAudioId || '\\N',
        mediaItem.cmpMediaVideoId || '\\N',
        mediaItem.cmpMediaFileId || '\\N',
        mediaItem.cmpMediaLocationId || '\\N',
        mediaItem.cmpMediaViberTemplateId || '\\N',
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.media);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaAudioCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.url,
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.mediaAudio);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media Audio): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaFileCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.url,
        mediaItem.caption,
        mediaItem.fileName,
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.mediaFile);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media File): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaImageCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.url,
        mediaItem.caption,
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.mediaImage);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media Image): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaLocationCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.latitude,
        mediaItem.longitude,
        mediaItem.name,
        mediaItem.address,
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.mediaLocation);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media Location): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaTextCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.text,
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.mediaText);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media Text): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaViberTemplateCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.url,
        mediaItem.caption,
        mediaItem.actionUrl,
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.mediaViberTemplate);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media Viber Template): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateMediaVideoCsv = async (mediaList) => {
    try {
      const startTime = new Date().getTime();
      const csvArray = mediaList.map(mediaItem => ([
        mediaItem.id,
        mediaItem.url,
        mediaItem.caption,
        0, // deleted
        container.moment().format(timePattern).toUpperCase(), // createdAt
        container.moment().format(timePattern).toUpperCase(), // updatedAt
      ]));
      const csvString = await container.csvService.toCsv(csvArray);
      const csvPath = getCsvPath(CsvTypes.mediaVideo);
      await container.fileService.writeContent(csvPath, csvString);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Create Dataload CSV Media Video): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCsvForDataLoad = async (records) => {
    try {
      const creatableLists = generateCreatableLists(records);

      await generateRecordCsv(creatableLists.records);
      await generateParameterCsv(creatableLists.parameters);
      await generateVoiceCsv(creatableLists.voices);
      await generateMediaCsv(creatableLists.media);

      await generateMediaAudioCsv(creatableLists.mediaAudio);
      await generateMediaFileCsv(creatableLists.mediaFile);
      await generateMediaImageCsv(creatableLists.mediaImage);
      await generateMediaLocationCsv(creatableLists.mediaLocation);
      await generateMediaTextCsv(creatableLists.mediaText);
      await generateMediaViberTemplateCsv(creatableLists.mediaViberTemplate);
      await generateMediaVideoCsv(creatableLists.mediaVideo);

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
