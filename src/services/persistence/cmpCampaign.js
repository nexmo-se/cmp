export default (container) => {
  const { L } = container.defaultLogger('Cmp Campaign Persistence Accessor');

  const listCampaigns = async (options = {}) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaigns = await CmpCampaign.listCampaigns(options);
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createCampaign = async (
    name,
    campaignStartDate,
    campaignEndDate,
  ) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.createCampaign(
        name,
        campaignStartDate,
        campaignEndDate,
      );
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readCampaign = async (cmpCampaignId) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.readCampaign(cmpCampaignId);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaign = async (cmpCampaignId, changes) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.updateCampaign(
        cmpCampaignId, changes,
      );
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaigns = async (criteria, changes, options = {}) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaigns = await CmpCampaign.updateCampaigns(criteria, changes, options);
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaign = async (cmpCampaignId) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.deleteCampaign(cmpCampaignId);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaigns = async (criteria) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaigns = await CmpCampaign.deleteCampaigns(criteria);
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listCampaigns,

    createCampaign,
    readCampaign,

    updateCampaign,
    updateCampaigns,

    deleteCampaign,
    deleteCampaigns,
  };
};
