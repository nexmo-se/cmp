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


      const sanitizedStart = container.dateTimeService
        .getDateInUtc(activeStartHour, activeStartMinute, timezone);
      const sanitizedEnd = container.dateTimeService
        .getDateInUtc(activeEndHour, activeEndMinute, timezone);

      const cmpRecord = await CmpRecord.createRecord(
        recipient,
        cmpCampaignId,
        cmpTemplateId,
        actualCmpMediaId,
        sanitizedStart.getUTCHours(),
        sanitizedStart.getUTCMinutes(),
        sanitizedEnd.getUTCHours(),
        sanitizedEnd.getUTCMinutes(),
        activeOnWeekends,
        container.dateTimeService.tzUTC,
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

  const runInSeqeunce = async (promises, i = 0, previousResults = []) => {
    try {
      if (i >= promises.length) {
        return Promise.resolve(previousResults);
      }

      console.log(`Creating record ${i + 1}`);
      const promise = promises[i];
      const currentResult = await promise();
      previousResults.push(currentResult);

      const finalResults = await runInSeqeunce(promises, i + 1, previousResults);
      return Promise.resolve(finalResults);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const processFileContent = async (jsonContent, cmpCampaignId, cmpTemplateId) => {
    try {
      const processStart = new Date().getTime();
      L.debug(`Campaign ID: ${cmpCampaignId}`);
      L.debug(`Template ID: ${cmpTemplateId}`);
      const { CmpCampaign } = container.persistenceService;
      const campaign = await CmpCampaign.readCampaign(cmpCampaignId);
      const {
        activeStartHour, activeStartMinute,
        activeEndHour, activeEndMinute,
        activeOnWeekends, timezone,
      } = campaign;
      const promises = jsonContent
        .filter((_, index) => index >= 3)
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
        }))
        .map(record => createRecord(record));
      const results = await runInSeqeunce(promises, promises.length, []);
      L.debug(results);
      const processEnd = new Date().getTime();
      L.debug(`Time Taken (Process File Content): ${processEnd - processStart}ms`);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readFileContent = async (fileName) => {
    try {
      const readStart = new Date().getTime();
      const { uploadPath } = container.config.csv;
      const filePath = `${uploadPath}/${fileName}`;
      const csvContent = await container.fileService.readContent(filePath);
      const jsonContent = container.csvService.fromCsv(csvContent);
      const readEnd = new Date().getTime();
      L.debug(`Time Taken (Read File): ${readEnd - readStart}ms`);
      return Promise.resolve(jsonContent);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const processFile = async (fileName) => {
    try {
      const processStart = new Date().getTime();
      const metadata = extractMetadataFromFileName(fileName);
      const { cmpCampaignId, cmpTemplateId } = metadata;

      // Read Content
      const jsonContent = await readFileContent(fileName);
      await processFileContent(jsonContent, cmpCampaignId, cmpTemplateId);

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
      const uploadDirectoryFileNames = container.fs.readdirSync(uploadPath);
      const csvFilter = name => name !== '' && name.toLowerCase().indexOf('.csv') === name.length - 4;
      const csvFiles = uploadDirectoryFileNames.filter(csvFilter);

      const promises = csvFiles.map(async (csvFile) => {
        try {
          // Process
          await processFile(csvFile);

          // Archive
          await archiveFile(csvFile);
          return Promise.resolve();
        } catch (error) {
          return Promise.reject(error);
        }
      });
      const result = await Promise.all(promises);
      L.debug(`${result.length} files processed`);
      return Promise.resolve(result);
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

      L.debug('Wait Over');

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
