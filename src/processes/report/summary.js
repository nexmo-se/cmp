export default (container) => {
  const { L } = container.defaultLogger('Report Process - Summary');

  const generateOverall = async (content, filePath) => {
    try {
      const { from, to } = content;
      const { summary: summaryService } = container.reportService;
      const paginatedResults = await summaryService.getOverallSummary(from, to, limit, offset);
      return Promise.resolve(paginatedResults);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCampaign = async (content, filePath) => {
    try {
      const { cmpCampaignId, from, to } = content;
      const { summary: summaryService } = container.reportService;
      const campaignSummary = await summaryService.getCampaignSummary(cmpCampaignId, from, to);
      return Promise.resolve(campaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    generateOverall,
    generateCampaign,
  };
};
