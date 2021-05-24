/**
 * Persistence Service for CMP Campaigns
 * Create, Read, Update, Delete and List Campaigns
 */

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

  const findCampaign = async (criteria, excludeDeleted = true) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.findCampaign(criteria, excludeDeleted);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findCampaigns = async (criteria, excludeDeleted = true, options = {}) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaigns = await CmpCampaign.findCampaigns(criteria, excludeDeleted, options);
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createCampaign = async (
    name,
    campaignStartDate,
    campaignEndDate,
    activeStartHour,
    activeStartMinute,
    activeEndHour,
    activeEndMinute,
    activeOnWeekends,
    timezone,
    niCnam,
  ) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.createCampaign(
        name,
        campaignStartDate,
        campaignEndDate,
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
        niCnam,
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

  const updateCampaign = async (cmpCampaignId, changes, options = {}) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.updateCampaign(
        cmpCampaignId, changes, options,
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

  const deleteCampaign = async (cmpCampaignId, options = { noGet: true }) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaign = await CmpCampaign.deleteCampaign(cmpCampaignId, options);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaigns = async (criteria, options = { noGet: true }) => {
    try {
      const { CmpCampaign } = container.databaseService.accessors;
      const cmpCampaigns = await CmpCampaign.deleteCampaigns(criteria, options);
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

    findCampaign,
    findCampaigns,
  };
};
