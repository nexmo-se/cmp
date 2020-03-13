export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Mapi Model Accessor');

  const getById = async (cmpReportCampaignSummaryId, excludeDeleted = true) => {
    try {
      const {
        CmpReportCampaignSummary,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportCampaignSummaryId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpReportCampaignSummary = await CmpReportCampaignSummary
        .findOne(query);
      if (rawCmpReportCampaignSummary == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpReportCampaignSummary = mapCmpReportCampaignSummary(
        rawCmpReportCampaignSummary,
      );
      return Promise.resolve(cmpReportCampaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpReportCampaignSummary,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpReportCampaignSummaries = await CmpReportCampaignSummary
        .findAll(query);
      const cmpReportCampaignSummaries = rawCmpReportCampaignSummaries
        .map(cmpReportCampaignSummary => mapCmpReportCampaignSummary(
          cmpReportCampaignSummary,
        ));
      return Promise.resolve(cmpReportCampaignSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReportCampaignSummaries = await getByCriteria(criteria, excludeDeleted);
      if (cmpReportCampaignSummaries == null
        || cmpReportCampaignSummaries.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpReportCampaignSummary = cmpReportCampaignSummaries[0];
      return Promise.resolve(cmpReportCampaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpReportCampaignSummaryId, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpReportCampaignSummary } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportCampaignSummaryId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReportCampaignSummary.update(changes, query);
      L.trace('CmpReportCampaignSummary Update Result', result);

      const cmpMedia = await getById(cmpReportCampaignSummaryId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpReportCampaignSummary } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReportCampaignSummary.update(changes, query);
      L.trace('CmpReportCampaignSummary Update Result', result);

      const cmpReportCampaignSummaries = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpReportCampaignSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpReportCampaignSummary = (cmpReportCampaignSummary) => {
    const mappedCmpReportCampaignSummary = cmpReportCampaignSummary.dataValues;

    delete mappedCmpReportCampaignSummary.deleted;
    delete mappedCmpReportCampaignSummary.createdAt;
    delete mappedCmpReportCampaignSummary.updatedAt;

    return mappedCmpReportCampaignSummary;
  };

  const listReportCampaignSummaries = async () => {
    try {
      const cmpReportCampaignSummaries = await getByCriteria({}, true);
      return Promise.resolve(cmpReportCampaignSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createReportCampaignSummary = async (
    cmpCampaignId,
    from,
    to,
  ) => {
    try {
      const { CmpReportCampaignSummary } = container.databaseService.models;
      const rawCmpReportCampaignSummary = await CmpReportCampaignSummary.create({
        id: container.uuid(),
        cmpCampaignId,
        from,
        to,
        deleted: false,
      });

      const cmpReportCampaignSummary = mapCmpReportCampaignSummary(
        rawCmpReportCampaignSummary,
      );
      return Promise.resolve(cmpReportCampaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readReportCampaignSummary = async (cmpReportCampaignSummaryId) => {
    try {
      const cmpReportCampaignSummary = await getById(
        cmpReportCampaignSummaryId, false,
      );
      return Promise.resolve(cmpReportCampaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReportCampaignSummary = async (cmpReportCampaignSummaryId, changes) => {
    try {
      const cmpReportCampaignSummary = await updateById(
        cmpReportCampaignSummaryId, changes, true,
      );
      return Promise.resolve(cmpReportCampaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReportCampaignSummaries = async (criteria, changes) => {
    try {
      const cmpReportCampaignSummaries = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpReportCampaignSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportCampaignSummary = async (cmpReportCampaignSummaryId) => {
    try {
      const changes = { deleted: true };
      const cmpReportCampaignSummary = await updateById(
        cmpReportCampaignSummaryId, changes, true,
      );
      return Promise.resolve(cmpReportCampaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportCampaignSummaries = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpReportCampaignSummaries = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpReportCampaignSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReportCampaignSummary = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReportCampaignSummary = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpReportCampaignSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReportCampaignSummaries = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReportCampaignSummaries = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpReportCampaignSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listReportCampaignSummaries,

    createReportCampaignSummary,
    readReportCampaignSummary,

    updateReportCampaignSummary,
    updateReportCampaignSummaries,

    deleteReportCampaignSummary,
    deleteReportCampaignSummaries,

    findReportCampaignSummary,
    findReportCampaignSummaries,
  };
};
