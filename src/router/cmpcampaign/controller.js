export default (container) => {
  const { L } = container.defaultLogger('Cmp Campaign Controller');

  const publishCampaignStatusAudit = async (campaignId, status) => {
    try {
      const { CmpCampaignStatusAudit } = container.persistenceService;
      const statusTime = new Date();
      const cmpCampaignStatusAudit = await CmpCampaignStatusAudit
        .createCampaignStatusAudit(campaignId, status, statusTime);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const listAllCampaigns = async (req, res, next) => {
    try {
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaigns = await CmpCampaign.listCampaigns();
      res.status(200).json(cmpCampaigns);
    } catch (error) {
      next(error);
    }
  };

  const listMyCampaigns = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Campaigns');
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaigns = await CmpCampaign.listCampaigns();
      res.status(200).json(cmpCampaigns);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllCampaigns = async (req, res, next) => {
    try {
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaigns = await CmpCampaign.deleteCampaigns({});
      res.status(200).json(cmpCampaigns);
    } catch (error) {
      next(error);
    }
  };

  const createCampaign = async (req, res, next) => {
    try {
      const {
        name,
        campaignStartDate,
        campaignEndDate,
      } = req.body;
      const { CmpCampaign } = container.persistenceService;

      const cmpCampaign = await CmpCampaign.createCampaign(
        name, campaignStartDate, campaignEndDate,
      );
      res.status(200).json(cmpCampaign);
    } catch (error) {
      next(error);
    }
  };

  const readCampaign = async (req, res, next) => {
    try {
      const { cmpCampaignId } = req.params;
      const { CmpCampaign } = container.persistenceService;

      const cmpCampaign = await CmpCampaign.readCampaign(cmpCampaignId);
      res.status(200).json(cmpCampaign);
    } catch (error) {
      next(error);
    }
  };

  const readMyCampaign = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Campaigns');
      const { cmpCampaignId } = req.params;
      const { CmpCampaign } = container.persistenceService;

      const cmpCampaign = await CmpCampaign.readCampaign(cmpCampaignId);
      res.status(200).json(cmpCampaign);
    } catch (error) {
      next(error);
    }
  };

  const updateCampaignStatus = async (req, res, next) => {
    try {
      const { cmpCampaignId } = req.params;
      const { status } = req.body;

      const changes = {};

      if (status && status !== '') {
        changes.status = status;
      }

      const { CmpCampaign } = container.persistenceService;
      const cmpCampaign = await CmpCampaign.updateCampaign(
        cmpCampaignId, changes,
      );
      res.status(200).json(cmpCampaign);
    } catch (error) {
      next(error);
    }
  };

  const updateCampaign = async (req, res, next) => {
    try {
      const { cmpCampaignId } = req.params;
      const {
        name,
        campaignStartDate,
        campaignEndDate,
        actualStartDate,
        actualEndDate,
        actualDuration,
        status,
        statusTime,
      } = req.body;

      const changes = {};

      if (name && name !== '') {
        changes.name = name;
      }

      if (campaignStartDate) {
        changes.campaignStartDate = campaignStartDate;
      }

      if (campaignEndDate) {
        changes.campaignEndDate = campaignEndDate;
      }

      if (actualStartDate) {
        changes.actualStartDate = actualStartDate;
      }

      if (actualEndDate) {
        changes.actualEndDate = actualEndDate;
      }

      if (actualDuration) {
        changes.actualDuration = actualDuration;
      }

      if (status && status !== '') {
        changes.status = status;
        await publishCampaignStatusAudit(cmpCampaignId, status);
      }

      if (statusTime) {
        changes.statusTime = statusTime;
      }

      const { CmpCampaign } = container.persistenceService;
      const cmpCampaign = await CmpCampaign.updateCampaign(
        cmpCampaignId, changes,
      );
      res.status(200).json(cmpCampaign);
    } catch (error) {
      next(error);
    }
  };

  const deleteCampaign = async (req, res, next) => {
    try {
      const { cmpCampaignId } = req.params;
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaign = await CmpCampaign.deleteCampaign(cmpCampaignId);
      res.status(200).json(cmpCampaign);
    } catch (error) {
      next(error);
    }
  };

  return {
    listAllCampaigns,
    listMyCampaigns,
    deleteAllCampaigns,

    createCampaign,
    readCampaign,
    readMyCampaign,
    updateCampaign,
    deleteCampaign,

    updateCampaignStatus,
  };
};
