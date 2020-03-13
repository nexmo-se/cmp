export default (container) => {
  const { L } = container.defaultLogger('Cmp Report Controller - Campaign Detail');

  const getCampaign = async (content) => {
    try {
      const { cmpCampaignId, limit, offset } = content;
      const { campaignDetail: campaignDetailService } = container.reportService;
      const campaignSummary = await campaignDetailService
        .getCampaignDetails(cmpCampaignId, limit, offset);
      return Promise.resolve(campaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getCampaign,
  };
};
