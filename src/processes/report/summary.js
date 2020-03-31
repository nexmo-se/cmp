export default (container) => {
  const { L } = container.defaultLogger('Report Process - Summary');

  const appendOverallToFile = async (filePath, campaigns) => {
    try {
      L.trace(campaigns);
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

      await appendOverallToFile(filePath, results);

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
      await generateOverallNextBatch(content, filePath, 100, 0);
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
      await appendOverallToFile(filePath, [campaignSummary]);
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
