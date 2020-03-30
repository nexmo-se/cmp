export default (container) => {
  const { L } = container.defaultLogger('Report Process - Campaign Detail');

  const generateCampaign = async (content, filePath) => {
    try {
      const { cmpCampaignId } = content;
      const { campaignDetail: campaignDetailService } = container.reportService;
      const campaignSummary = await campaignDetailService
        .getCampaignDetails(cmpCampaignId, limit, offset);
      return Promise.resolve(campaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    generateCampaign,
  };
};
