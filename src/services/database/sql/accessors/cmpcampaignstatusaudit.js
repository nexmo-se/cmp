export default (container) => {
  const { L } = container.defaultLogger('Cmp Campaign Status Audit Model Accessor');

  const getById = async (cmpCampaignStatusAuditId, excludeDeleted = true) => {
    try {
      const {
        CmpCampaignStatusAudit,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpCampaignStatusAuditId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpCampaignStatusAudit = await CmpCampaignStatusAudit.findOne(query);
      if (rawCmpCampaignStatusAudit == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpCampaignStatusAudit = mapCmpCampaignStatusAudit(
        rawCmpCampaignStatusAudit,
      );
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpCampaignStatusAudit,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpCampaignStatusAudits = await CmpCampaignStatusAudit.findAll(query);
      const cmpCampaignStatusAudits = rawCmpCampaignStatusAudits
        .map(cmpCampaignStatusAudit => mapCmpCampaignStatusAudit(
          cmpCampaignStatusAudit,
        ));
      return Promise.resolve(cmpCampaignStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpCampaignStatusAudits = await getByCriteria(criteria, excludeDeleted);
      if (cmpCampaignStatusAudits == null || cmpCampaignStatusAudits.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpCampaignStatusAudit = cmpCampaignStatusAudits[0];
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpCampaignStatusAuditId, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.models;
      const query = {
        where: {
          id: cmpCampaignStatusAuditId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpCampaignStatusAudit.update(changes, query);
      L.trace('CmpCampaignStatusAudit Update Result', result);

      const cmpCampaignStatusAudit = await getById(
        cmpCampaignStatusAuditId, excludeDeleted,
      );
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpCampaignStatusAudit.update(changes, query);
      L.trace('CmpCampaignStatusAudit Update Result', result);

      const cmpCampaignStatusAudits = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpCampaignStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpCampaignStatusAudit = (cmpCSAudit) => {
    const mappedCmpCSAudit = cmpCSAudit.dataValues;

    delete mappedCmpCSAudit.deleted;
    delete mappedCmpCSAudit.createdAt;
    delete mappedCmpCSAudit.updatedAt;

    return mappedCmpCSAudit;
  };

  const listCampaignStatusAudits = async () => {
    try {
      const cmpCampaignStatusAudits = await getByCriteria({}, true);
      return Promise.resolve(cmpCampaignStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createCampaignStatusAudit = async (
    cmpCampaignId,
    status,
    statusTime,
  ) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.models;
      const createdCmpCampaignStatusAudit = await CmpCampaignStatusAudit.create({
        id: container.uuid(),
        cmpCampaignId,
        status,
        statusTime,
        deleted: false,
      });

      const { id } = createdCmpCampaignStatusAudit;
      const cmpCampaignStatusAudit = await getById(id, true);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readCampaignStatusAudit = async (cmpCampaignStatusAuditId) => {
    try {
      const cmpCampaignStatusAudit = await getById(cmpCampaignStatusAuditId, false);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaignStatusAudit = async (cmpCampaignStatusAuditId) => {
    try {
      const changes = { deleted: true };
      const cmpCampaignStatusAudit = await updateById(
        cmpCampaignStatusAuditId, changes, true,
      );
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaignStatusAudits = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpCampaignStatusAudits = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpCampaignStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findCampaignStatusAudit = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpCampaignStatusAudit = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findCampaignStatusAudits = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpCampaignStatusAudits = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpCampaignStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listCampaignStatusAudits,

    createCampaignStatusAudit,
    readCampaignStatusAudit,

    deleteCampaignStatusAudit,
    deleteCampaignStatusAudits,

    findCampaignStatusAudit,
    findCampaignStatusAudits,
  };
};
