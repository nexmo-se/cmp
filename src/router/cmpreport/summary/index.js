export default (container) => {
  const { L } = container.defaultLogger('Cmp Report Controller - Summary');

  const getOverall = async (content) => {
    try {
      const {
        from, to, limit, offset,
      } = content;
      const { summary: summaryService } = container.reportService;
      const paginatedResults = await summaryService.getOverallSummary(from, to, limit, offset);
      return Promise.resolve(paginatedResults);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getCampaign = async (content) => {
    try {
      const {
        cmpCampaignId, from, to,
      } = content;
      const { summary: summaryService } = container.reportService;
      const campaignSummary = await summaryService.getCampaignSummary(cmpCampaignId, from, to);
      return Promise.resolve(campaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getOverall,
    getCampaign,
  };
};
