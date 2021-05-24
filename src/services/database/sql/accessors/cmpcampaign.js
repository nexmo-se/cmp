/**
 * Accessor Service for CMP Campaigns
 * Create, Read, Update, Delete and List Campaigns
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Campaign Model Accessor');

  const getById = async (cmpCampaignId, excludeDeleted = true) => {
    try {
      const {
        CmpCampaign, CmpCampaignStatusAudit,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpCampaignId,
        },
        include: [
          {
            model: CmpCampaignStatusAudit,
            as: 'cmpCampaignStatusAudits',
            foreignKey: 'cmpCampaignId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpCampaign = await CmpCampaign.findOne(query);
      if (rawCmpCampaign == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpCampaign = mapCmpCampaign(rawCmpCampaign);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpCampaignId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (
    criteria = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const {
        CmpCampaign, CmpCampaignStatusAudit,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['name', 'ASC'],
          ['createdAt', 'DESC'],
        ],
        include: [
          {
            model: CmpCampaignStatusAudit,
            as: 'cmpCampaignStatusAudits',
            foreignKey: 'cmpCampaignId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      // Check Limit
      if (options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      // Check Offset
      if (options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpCampaigns = await CmpCampaign.findAll(query);
      const cmpCampaigns = rawCmpCampaigns
        .map(cmpCampaign => mapCmpCampaign(cmpCampaign));
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpCampaigns = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpCampaigns == null || cmpCampaigns.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpCampaign = cmpCampaigns[0];
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getOneByCriteria(criteria, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpCampaignId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpCampaign } = container.databaseService.models;
      const query = {
        where: {
          id: cmpCampaignId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpCampaign.update(changes, query);
      L.trace('CmpCampaign Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpCampaign = await getById(cmpCampaignId, excludeDeleted);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpCampaignId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpCampaign } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpCampaign.update(changes, query);
      L.trace('CmpCampaign Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpCampaigns = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpCampaignStatusAudit = (cmpCampaignStatusAudit) => {
    const mappedCmpCampaignStatusAudit = cmpCampaignStatusAudit.dataValues;

    delete mappedCmpCampaignStatusAudit.deleted;
    delete mappedCmpCampaignStatusAudit.createdAt;
    delete mappedCmpCampaignStatusAudit.updatedAt;

    return mappedCmpCampaignStatusAudit;
  };

  const mapCmpCampaign = (cmpCampaign) => {
    const mappedCmpCampaign = cmpCampaign.dataValues;

    if (mappedCmpCampaign.cmpCampaignStatusAudits) {
      const cmpCampaignStatusAudits = mappedCmpCampaign.cmpCampaignStatusAudits || [];
      mappedCmpCampaign.cmpCampaignStatusAudits = cmpCampaignStatusAudits
        .map(mapCmpCampaignStatusAudit);
    }

    delete mappedCmpCampaign.deleted;
    delete mappedCmpCampaign.createdAt;
    delete mappedCmpCampaign.updatedAt;

    return mappedCmpCampaign;
  };

  const listCampaigns = async (options = {}) => {
    try {
      const cmpCampaigns = await getByCriteria({}, true, options);
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
      const { CmpCampaign } = container.databaseService.models;
      const rawCmpCampaign = await CmpCampaign.create({
        id: container.uuid(),
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
        campaignType: null,
        status: 'draft',
        statusTime: new Date(),
        deleted: false,
      });

      const cmpCampaign = mapCmpCampaign(rawCmpCampaign);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createCampaign(
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
      }
      return Promise.reject(error);
    }
  };

  const readCampaign = async (cmpCampaignId) => {
    try {
      const cmpCampaign = await getById(cmpCampaignId, false);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaign = async (cmpCampaignId, changes, options = {}) => {
    try {
      const cmpCampaign = await updateById(cmpCampaignId, changes, true, options);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaigns = async (criteria, changes, options = {}) => {
    try {
      const cmpCampaigns = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaign = async (cmpCampaignId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpCampaign = await updateById(cmpCampaignId, changes, true, options);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaigns = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpCampaigns = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpCampaigns);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findCampaign = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpCampaign = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpCampaign);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findCampaigns = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpCampaigns = await getByCriteria(criteria, excludeDeleted, options);
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
