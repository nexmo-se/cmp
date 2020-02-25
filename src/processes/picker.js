export default (container) => {
  const { L } = container.defaultLogger('Picker Process');

  const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

  const processFileContent = async (jsonContent, cmpCampaignId, cmpTemplateId) => {
    try {
      const processStart = new Date().getTime();
      L.debug(jsonContent);
      L.debug(`Campaign ID: ${cmpCampaignId}`);
      L.debug(`Template ID: ${cmpTemplateId}`);
      const processEnd = new Date().getTime();
      L.debug(`Time Taken (Process File Content): ${processEnd - processStart}ms`);
      return Promise.resolve();
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
    const { uploadPath, archivePath } = container.config.csv;
    const oldPath = `${uploadPath}/${fileName}`;
    const newPath = `${archivePath}/${fileName}`;

    const archiveStart = new Date().getTime();
    container.fs.renameSync(oldPath, newPath);
    const archiveEnd = new Date().getTime();
    L.debug(`Time Taken (Archive): ${archiveEnd - archiveStart}ms`);
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
          archiveFile(csvFile);
          return Promise.resolve();
        } catch (error) {
          return Promise.reject(error);
        }
      });
      const result = await Promise.all(promises);
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
