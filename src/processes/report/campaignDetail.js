/**
 * Generate Campaign Report
 */

export default (container) => {
  const { L } = container.defaultLogger('Report Process - Campaign Detail');

  const appendHeader = async (filePath) => {
    try {
      const startTime = new Date().getTime();

      // Write Header
      const header = [['id', 'recipient', 'channel', 'template', 'status', 'status time', 'submit time', 'price']];
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
      const timePattern = 'YYYY/MM/DD HH:mm:ss';
      const content = records.map(record => ([
        record.id,
        record.recipient,
        (record.cmpChannel || {}).channel,
        (record.cmpTemplate || {}).name,
        record.status,
        record.statusTime ? container.moment(record.statusTime).format(timePattern) : null,
        record.submitTime ? container.moment(record.submitTime).format(timePattern) : null,
        record.price || 0,
      ]));

      const contentCsv = await container.csvService.toCsv(content);
      await container.fileService.writeContent(filePath, contentCsv);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Append Content) [${records.length}]: ${endTime - startTime}`);
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

      await appendContent(filePath, results);

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
      const { batchLimit } = container.config.report;
      await appendHeader(filePath);
      await generateCampaignNextBatch(content, filePath, batchLimit, 0);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    generateCampaign,
  };
};
