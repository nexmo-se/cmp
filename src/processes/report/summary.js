/**
 * Generate Summary Report
 */

export default (container) => {
  const { L } = container.defaultLogger('Report Process - Summary');

  const appendHeader = async (filePath) => {
    try {
      const startTime = new Date().getTime();

      // Write Header
      const header = [['id', 'name', 'total', 'draft', 'pending', 'requested', 'submitted', 'delivered', 'rejected']];
      const headerCsv = await container.csvService.toCsv(header);
      await container.fileService.writeContent(filePath, headerCsv);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Append Header): ${endTime - startTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const appendContent = async (filePath, campaigns) => {
    try {
      const startTime = new Date().getTime();

      // Write Content
      const content = campaigns.map(campaign => ([
        campaign.id,
        campaign.name,
        (campaign.summary || {}).total || 0,
        (campaign.summary || {}).draft || 0,
        (campaign.summary || {}).pending || 0,
        (campaign.summary || {}).requested || 0,
        (campaign.summary || {}).submitted || 0,
        (campaign.summary || {}).delivered || 0,
        (campaign.summary || {}).rejected || 0,
      ]));
      const contentCsv = await container.csvService.toCsv(content);
      await container.fileService.writeContent(filePath, contentCsv);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Append Content) [${campaigns.length}]: ${endTime - startTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateOverallNextBatch = async (content, filePath, limit, offset) => {
    try {
      const { from, to } = content;
      const { summary: summaryService } = container.reportService;
      const paginatedResults = await summaryService.getOverallSummary(from, to, limit, offset);
      const { results } = paginatedResults;

      await appendContent(filePath, results);

      if (results.length <= 0) {
        return Promise.resolve();
      }

      return generateOverallNextBatch(content, filePath, limit, offset + results.length);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateOverall = async (content, filePath) => {
    try {
      const { batchLimit } = container.config.report;
      await appendHeader(filePath);
      await generateOverallNextBatch(content, filePath, batchLimit, 0);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCampaign = async (content, filePath) => {
    try {
      const { cmpCampaignId, from, to } = content;
      const { summary: summaryService } = container.reportService;
      const campaignSummary = await summaryService.getCampaignSummary(cmpCampaignId, from, to);
      if (campaignSummary == null) {
        throw new Error('Campaign Report Not Available');
      }
      await appendHeader(filePath);
      await appendContent(filePath, [campaignSummary]);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    generateOverall,
    generateCampaign,
  };
};
