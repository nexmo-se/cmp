export default (container) => {
  const { L } = container.defaultLogger('Picker Process');

  const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

  const mapRecord = (csvRecord) => {
    const record = {
      recipient: csvRecord[0],
      cmpParameters: [],
    };

    for (let i = 1; i < csvRecord.length; i += 1) {
      const parameter = csvRecord[i];
      if (parameter && parameter !== '') {
        record.cmpParameters.push(parameter);
      }
    }

    return record;
  };

  const dataLoadCsv = async () => {
    try {
      const { client } = container.databaseService;
      const { dataloadPath } = container.config.csv;
      const recordFilePath = `${dataloadPath}/records.csv`;
      const parametersFilePath = `${dataloadPath}/parameters.csv`;
      const recordsSql = `LOAD DATA LOCAL INFILE '${recordFilePath}' INTO TABLE CmpRecords FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
      const parametersSql = `LOAD DATA LOCAL INFILE '${parametersFilePath}' INTO TABLE CmpParameters FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;

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

  const createRecordsDatabase = async (records) => {
    try {
      const { CmpRecord, CmpParameter } = container.persistenceService;
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
            cmpRecordId: id,
            parameter: cmpParameters[j],
            order: j,
          };
          creatableParameters.push(parameterItem);
        }
      }

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

  const processFileContent = async (
    jsonContent, cmpCampaignId, cmpTemplateId, campaign,
  ) => {
    try {
      const { insertMode } = container.config.csv;
      const processStart = new Date().getTime();

      // Mapping
      const mappingStart = new Date().getTime();
      L.trace(`Campaign ID: ${cmpCampaignId}`);
      L.trace(`Template ID: ${cmpTemplateId}`);
      const {
        activeStartHour, activeStartMinute,
        activeEndHour, activeEndMinute,
        activeOnWeekends, timezone,
      } = campaign;
      const recordModels = jsonContent
        .map(mapRecord)
        .map(record => ({
          recipient: record.recipient,
          cmpCampaignId,
          cmpTemplateId,
          cmpMediaId: null,
          cmpMedia: null,
          cmpParameters: record.cmpParameters,
          activeStartHour,
          activeStartMinute,
          activeEndHour,
          activeEndMinute,
          activeOnWeekends,
          timezone,
        }));
      const mappingEnd = new Date().getTime();
      L.debug(`Time Taken (Process File Content - Mapping): ${mappingEnd - mappingStart}ms`);

      // Insert
      const insertStart = new Date().getTime();
      if (insertMode === 'csv') {
        L.trace('Inserting using CSV (DataLoad)');
        await createRecordsCsv(recordModels);
      } else {
        L.trace('Inserting using Database (Bulk Insert SQL)');
        await createRecordsDatabase(recordModels);
      }
      const insertEnd = new Date().getTime();
      L.debug(`Time Taken (Process File Content - Insert): ${insertEnd - insertStart}ms`);

      const processEnd = new Date().getTime();
      L.debug(`Time Taken (Process File Content - Total): ${processEnd - processStart}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const parseContentBatch = (batchContent) => {
    const processStart = new Date().getTime();
    const result = [];
    const csvData = container.csvService.fromCsvSync(batchContent);
    for (let i = 0; i < csvData.length; i += 1) {
      const csvItem = csvData[i];
      result.push(csvItem);
    }
    const processEnd = new Date().getTime();
    L.debug(`Time Taken (Parse Content Batch): ${processEnd - processStart}ms`);
    return result;
  };

  const processContentBatch = async (
    batchContent, cmpCampaignId, cmpTemplateId, campaign,
  ) => {
    try {
      const processStart = new Date().getTime();
      const result = parseContentBatch(batchContent);
      await processFileContent(result, cmpCampaignId, cmpTemplateId, campaign);

      const processEnd = new Date().getTime();
      L.debug(`Time Taken (Process Content Batch): ${processEnd - processStart}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const processNextBatch = async (
    fileReader,
    cmpCampaignId,
    cmpTemplateId,
    campaign,
    options = { skipCount: 0, batchSize: 1000 },
    tracker = { startTime: 0, batchNumber: 0 },
  ) => {
    try {
      let count = 0;
      let content = '';

      let line = fileReader.next();
      while (line) {
        if (count >= options.skipCount) {
          content += `${line}\n`;
        }
        count += 1;

        if (count % options.batchSize === 0) {
          break;
        }

        line = fileReader.next();
      }
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Process Next Batch): [${tracker.batchNumber}][${count}] ${endTime - tracker.startTime}ms`);

      await processContentBatch(content, cmpCampaignId, cmpTemplateId, campaign);
      if (line) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const newOptions = {
              skipCount: 0,
              batchSize: options.batchSize,
            };
            const newTracker = {
              startTime: new Date().getTime(),
              batchNumber: tracker.batchNumber + 1,
            };
            processNextBatch(
              fileReader, cmpCampaignId, cmpTemplateId, campaign, newOptions, newTracker,
            )
              .then(resolve)
              .catch(reject);
          }, 0);
        });
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const processFileBatch = async (fileName) => {
    try {
      const { skipCount, batchSize } = container.config.csv;
      const processStart = new Date().getTime();
      const metadata = extractMetadataFromFileName(fileName);
      const { cmpCampaignId, cmpTemplateId } = metadata;
      const { CmpCampaign } = container.persistenceService;
      const campaign = await CmpCampaign.readCampaign(cmpCampaignId);
      const { uploadPath } = container.config.csv;
      const filePath = `${uploadPath}/${fileName}`;
      const fileReader = container.fileService.readNLineBuffer(filePath);
      const options = { skipCount, batchSize };
      const tracker = {
        startTime: new Date().getTime(),
        batchNumber: 1,
      };
      await processNextBatch(fileReader, cmpCampaignId, cmpTemplateId, campaign, options, tracker);

      const processEnd = new Date().getTime();
      L.debug(`Time Taken (Process File): ${processEnd - processStart}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const extractMetadataFromFileName = (fileName) => {
    const extractStart = new Date().getTime();
    const fileNameComponents = fileName.split(/_/g);
    const metadata = {
      timestamp: fileNameComponents[0],
      cmpCampaignId: fileNameComponents[1],
      cmpTemplateId: fileNameComponents[2],
      originalFileName: fileNameComponents[3],
    };
    const extractEnd = new Date().getTime();
    L.debug(`Time Taken (Extract Metadata): ${extractEnd - extractStart}ms`);
    return metadata;
  };

  const archiveFile = async (fileName) => {
    try {
      const { uploadPath, archivePath } = container.config.csv;
      const oldPath = `${uploadPath}/${fileName}`;
      const newPath = `${archivePath}/${fileName}`;

      const archiveStart = new Date().getTime();
      container.fs.renameSync(oldPath, newPath);
      const archiveEnd = new Date().getTime();
      L.debug(`Time Taken (Archive): ${archiveEnd - archiveStart}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const runSingle = async () => {
    try {
      const { uploadPath } = container.config.csv;
      const { parallelPick } = container.config.picker;
      const uploadDirectoryFileNames = container.fs.readdirSync(uploadPath);
      const csvFilter = name => name !== '' && name.toLowerCase().indexOf('.csv') === name.length - 4;
      const csvFiles = uploadDirectoryFileNames.filter(csvFilter);

      let numFilesPicked = 0;
      if (parallelPick) {
        // Parallel
        const promises = csvFiles.map(async (csvFile) => {
          try {
            // Process
            await processFileBatch(csvFile);

            // Archive
            await archiveFile(csvFile);
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error);
          }
        });
        const result = await Promise.all(promises);
        numFilesPicked = result.length;
      } else if (csvFiles.length > 0) {
        // Single File
        const csvFile = csvFiles[0];

        // Process
        await processFileBatch(csvFile);

        // Archive
        await archiveFile(csvFile);

        // Update Count
        numFilesPicked = 1;
      }

      L.info(`${numFilesPicked} files processed`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const runIndefinitely = async (pickTime) => {
    try {
      // Wait
      const currentTime = new Date().getTime();
      const waitTime = pickTime - currentTime;
      if (waitTime > 0) {
        const waitStart = new Date().getTime();
        await wait(waitTime);
        const waitEnd = new Date().getTime();
        L.debug(`Time Taken (Wait): ${waitEnd - waitStart}ms`);
      }

      L.trace('Wait Over');

      const startTime = new Date().getTime();
      await runSingle();
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Iteration): ${endTime - startTime}ms`);

      const nextPickTime = endTime + (container.config.picker.delay * 1000);
      return runIndefinitely(nextPickTime);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const run = async () => {
    try {
      // Check if Process Active Hour is OK
      const startTime = new Date();
      L.info(`Picker Process started at ${startTime}`);

      await runIndefinitely(new Date().getTime(), 0);

      const endTime = new Date();
      L.info(`Picker Process ended at ${endTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    run,
  };
};
