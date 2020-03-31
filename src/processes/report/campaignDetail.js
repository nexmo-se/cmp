export default (container) => {
  const { L } = container.defaultLogger('Report Process - Campaign Detail');

  const appendHeader = async (filePath) => {
    try {
      const startTime = new Date().getTime();

      // Write Header
      const header = [['id', 'recipient', 'channel', 'template', 'status', 'status time', 'submit time']];
      const headerCsv = await container.csvService.toCsv(header);
      await container.fileService.writeContent(filePath, headerCsv);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Append Header): ${endTime - startTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const appendContent = async (filePath, records) => {
    try {
      const startTime = new Date().getTime();

      // Write Content
      const content = records.map(() => ([]));
      const contentCsv = await container.csvService.toCsv(content);
      await container.fileService.writeContent(filePath, contentCsv);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Append Content) [${records.length}]: ${endTime - startTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const appendOverallToFile = async (filePath, records) => {
    try {
      L.trace(records);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCampaignNextBatch = async (content, filePath, limit, offset) => {
    try {
      const { cmpCampaignId } = content;
      const { campaignDetail: campaignDetailService } = container.reportService;
      const paginatedResults = await campaignDetailService
        .getCampaignDetails(cmpCampaignId, limit, offset);

      const { results } = paginatedResults;

      await appendOverallToFile(filePath, results);

      if (results.length <= 0) {
        return Promise.resolve();
      }
      return generateCampaignNextBatch(content, filePath, limit, offset + results.length);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCampaign = async (content, filePath) => {
    try {
      await generateCampaignNextBatch(content, filePath, 100, 0);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    generateCampaign,
  };
};
