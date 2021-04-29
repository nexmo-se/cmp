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

  const findAllCampaigns = async (req, res, next) => {
    try {
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        name, campaignStartDate, campaignEndDate, status,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (campaignStartDate) {
        criteria.campaignStartDate = campaignStartDate;
      }
      if (campaignEndDate) {
        criteria.campaignEndDate = campaignEndDate;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaigns = await CmpCampaign.findCampaigns(criteria, true, options);
      res.status(200).json(cmpCampaigns);
    } catch (error) {
      next(error);
    }
  };

  const findMyCampaigns = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Campaigns');
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        name, campaignStartDate, campaignEndDate, status,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (campaignStartDate) {
        criteria.campaignStartDate = campaignStartDate;
      }
      if (campaignEndDate) {
        criteria.campaignEndDate = campaignEndDate;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaigns = await CmpCampaign.findCampaigns(criteria, true, options);
      res.status(200).json(cmpCampaigns);
    } catch (error) {
      next(error);
    }
  };

  const listAllCampaigns = async (req, res, next) => {
    try {
      const {
        limit, offset,
        name, campaignStartDate, campaignEndDate, status,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (campaignStartDate) {
        criteria.campaignStartDate = campaignStartDate;
      }
      if (campaignEndDate) {
        criteria.campaignEndDate = campaignEndDate;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaigns = await CmpCampaign.findCampaigns(criteria, true, options);
      res.status(200).json(cmpCampaigns);
    } catch (error) {
      next(error);
    }
  };

  const listMyCampaigns = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Campaigns');
      const {
        limit, offset,
        name, campaignStartDate, campaignEndDate, status,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (campaignStartDate) {
        criteria.campaignStartDate = campaignStartDate;
      }
      if (campaignEndDate) {
        criteria.campaignEndDate = campaignEndDate;
      }
      if (status) {
        criteria.status = status;
      }
      const options = { limit, offset };
      const { CmpCampaign } = container.persistenceService;
      const cmpCampaigns = await CmpCampaign.findCampaigns(criteria, true, options);
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
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
        niCnam,
      } = req.body;
      const { CmpCampaign } = container.persistenceService;

      const sanitizedStart = container.dateTimeService
        .getDateInUtc(activeStartHour, activeStartMinute, timezone);
      const sanitizedEnd = container.dateTimeService
        .getDateInUtc(activeEndHour, activeEndMinute, timezone);

      const cmpCampaign = await CmpCampaign.createCampaign(
        name, campaignStartDate, campaignEndDate,
        sanitizedStart.getUTCHours(),
        sanitizedStart.getUTCMinutes(),
        sanitizedEnd.getUTCHours(),
        sanitizedEnd.getUTCMinutes(),
        activeOnWeekends,
        container.dateTimeService.tzUTC,
        niCnam,
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
        niCnam,
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

      if (niCnam != null) {
        changes.niCnam = niCnam;
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
    findAllCampaigns,
    findMyCampaigns,

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
