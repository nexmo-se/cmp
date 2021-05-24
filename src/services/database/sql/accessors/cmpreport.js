/**
 * Accessor Service for CMP Reports
 * Create, Read, Update, Delete and List Reports
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Report Model Accessor');

  const getById = async (cmpReportId, excludeDeleted = true) => {
    try {
      const {
        CmpReport,
        CmpReportOverallSummary,
        CmpReportCampaignSummary,
        CmpReportCampaignDetail,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportId,
        },
        include: [
          {
            model: CmpReportOverallSummary,
            as: 'cmpReportOverallSummary',
            foreignKey: 'cmpReportOverallSummaryId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpReportCampaignSummary,
            as: 'cmpReportCampaignSummary',
            foreignKey: 'cmpReportOverallSummaryId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpReportCampaignDetail,
            as: 'cmpReportCampaignDetail',
            foreignKey: 'cmpReportCampaignDetailId',
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

      const rawCmpReport = await CmpReport.findOne(query);
      if (rawCmpReport == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpReport = mapCmpReport(rawCmpReport);
      return Promise.resolve(cmpReport);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpReportId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (
    criteria = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const {
        CmpReport,
        CmpReportOverallSummary,
        CmpReportCampaignSummary,
        CmpReportCampaignDetail,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['createdAt', 'DESC'],
          ['name', 'ASC'],
        ],
        include: [
          {
            model: CmpReportOverallSummary,
            as: 'cmpReportOverallSummary',
            foreignKey: 'cmpReportOverallSummaryId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpReportCampaignSummary,
            as: 'cmpReportCampaignSummary',
            foreignKey: 'cmpReportOverallSummaryId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpReportCampaignDetail,
            as: 'cmpReportCampaignDetail',
            foreignKey: 'cmpReportCampaignDetailId',
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

      const rawCmpReports = await CmpReport.findAll(query);
      const cmpReports = rawCmpReports.map(mapCmpReport);
      return Promise.resolve(cmpReports);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (
    criteria = {}, excludeDeleted = true,
  ) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpReports = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpReports == null || cmpReports.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpReport = cmpReports[0];
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpReportId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpReport } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReport.update(changes, query);
      L.trace('CmpTemplate Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpReport = await getById(cmpReportId, excludeDeleted);
      return Promise.resolve(cmpReport);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpReportId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpReport } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReport.update(changes, query);
      L.trace('CmpReport Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpReports = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpReports);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpReportOverallSummary = (cmpReportOverallSummary) => {
    const mappedCmpReportOverallSummary = cmpReportOverallSummary.dataValues;

    delete mappedCmpReportOverallSummary.deleted;
    delete mappedCmpReportOverallSummary.createdAt;
    delete mappedCmpReportOverallSummary.updatedAt;

    return mappedCmpReportOverallSummary;
  };

  const mapCmpReportCampaignSummary = (cmpReportCampaignSummary) => {
    const mappedCmpReportCampaignSummary = cmpReportCampaignSummary.dataValues;

    delete mappedCmpReportCampaignSummary.deleted;
    delete mappedCmpReportCampaignSummary.createdAt;
    delete mappedCmpReportCampaignSummary.updatedAt;

    return mappedCmpReportCampaignSummary;
  };

  const mapCmpReportCampaignDetail = (cmpReportCampaignDetail) => {
    const mappedCmpReportCampaignDetail = cmpReportCampaignDetail.dataValues;

    delete mappedCmpReportCampaignDetail.deleted;
    delete mappedCmpReportCampaignDetail.createdAt;
    delete mappedCmpReportCampaignDetail.updatedAt;

    return mappedCmpReportCampaignDetail;
  };

  const mapCmpReport = (cmpReport) => {
    const mappedCmpReport = cmpReport.dataValues;

    if (mappedCmpReport.cmpReportOverallSummary) {
      mappedCmpReport.cmpReportOverallSummary = mapCmpReportOverallSummary(
        mappedCmpReport.cmpReportOverallSummary,
      );
    }

    if (mappedCmpReport.cmpReportCampaignSummary) {
      mappedCmpReport.cmpReportCampaignSummary = mapCmpReportCampaignSummary(
        mappedCmpReport.cmpReportCampaignSummary,
      );
    }

    if (mappedCmpReport.cmpReportCampaignDetail) {
      mappedCmpReport.cmpReportCampaignDetail = mapCmpReportCampaignDetail(
        mappedCmpReport.cmpReportCampaignDetail,
      );
    }

    delete mappedCmpReport.deleted;
    delete mappedCmpReport.createdAt;
    delete mappedCmpReport.updatedAt;

    return mappedCmpReport;
  };

  const listReports = async (options = {}) => {
    try {
      const cmpReports = await getByCriteria({}, true, options);
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createReport = async (
    type,
    name,
    cmpReportOverallSummaryId,
    cmpReportCampaignSummaryId,
    cmpReportCampaignDetailId,
  ) => {
    try {
      const { CmpReport } = container.databaseService.models;
      const rawCmpReport = await CmpReport.create({
        id: container.uuid(),
        type,
        name,
        status: 'pending',
        url: '',
        submitTime: new Date(),
        cmpReportOverallSummaryId,
        cmpReportCampaignSummaryId,
        cmpReportCampaignDetailId,
        deleted: false,
      });

      const cmpReport = mapCmpReport(rawCmpReport);
      return Promise.resolve(cmpReport);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createReport(
          type,
          name,
          cmpReportOverallSummaryId,
          cmpReportCampaignSummaryId,
          cmpReportCampaignDetailId,
        );
      }
      return Promise.reject(error);
    }
  };

  const readReport = async (cmpReportId) => {
    try {
      const cmpReport = await getById(cmpReportId, false);
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReport = async (cmpReportId, changes, options = {}) => {
    try {
      const cmpReport = await updateById(cmpReportId, changes, true, options);
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReports = async (criteria, changes, options = {}) => {
    try {
      const cmpReports = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReport = async (cmpReportId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpReport = await updateById(cmpReportId, changes, true, options);
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReports = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpReports = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReport = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReport = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReports = async (
    criteria = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const cmpReports = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listReports,

    createReport,
    readReport,

    updateReport,
    updateReports,

    deleteReport,
    deleteReports,

    findReport,
    findReports,
  };
};
