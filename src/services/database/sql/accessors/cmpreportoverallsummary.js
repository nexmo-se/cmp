/**
 * Accessor Service for CMP Reports (Overall Summary)
 * Create, Read, Update, Delete and List Reports (Overall Summary)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Mapi Model Accessor');

  const getById = async (cmpReportOverallSummaryId, excludeDeleted = true) => {
    try {
      const {
        CmpReportOverallSummary,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportOverallSummaryId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpReportOverallSummary = await CmpReportOverallSummary
        .findOne(query);
      if (rawCmpReportOverallSummary == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpReportOverallSummary = mapCmpReportOverallSummary(
        rawCmpReportOverallSummary,
      );
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpReportOverallSummaryId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpReportOverallSummary,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['createdAt', 'DESC'],
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpReportOverallSummaries = await CmpReportOverallSummary
        .findAll(query);
      const cmpReportOverallSummaries = rawCmpReportOverallSummaries
        .map(cmpReportOverallSummary => mapCmpReportOverallSummary(
          cmpReportOverallSummary,
        ));
      return Promise.resolve(cmpReportOverallSummaries);
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
      const cmpReportOverallSummaries = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpReportOverallSummaries == null
        || cmpReportOverallSummaries.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpReportOverallSummary = cmpReportOverallSummaries[0];
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpReportOverallSummaryId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpReportOverallSummary } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportOverallSummaryId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReportOverallSummary.update(changes, query);
      L.trace('CmpReportOverallSummary Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpReportOverallSummaryId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpReportOverallSummaryId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpReportOverallSummary } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReportOverallSummary.update(changes, query);
      L.trace('CmpReportOverallSummary Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpReportOverallSummaries = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpReportOverallSummaries);
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

  const listReportOverallSummaries = async (options = {}) => {
    try {
      const cmpReportOverallSummaries = await getByCriteria({}, true, options);
      return Promise.resolve(cmpReportOverallSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createReportOverallSummary = async (
    from,
    to,
  ) => {
    try {
      const { CmpReportOverallSummary } = container.databaseService.models;
      const rawCmpReportOverallSummary = await CmpReportOverallSummary.create({
        id: container.uuid(),
        from,
        to,
        deleted: false,
      });

      const cmpReportOverallSummary = mapCmpReportOverallSummary(
        rawCmpReportOverallSummary,
      );
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createReportOverallSummary(from, to);
      }
      return Promise.reject(error);
    }
  };

  const readReportOverallSummary = async (cmpReportOverallSummaryId) => {
    try {
      const cmpReportOverallSummary = await getById(
        cmpReportOverallSummaryId, false,
      );
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReportOverallSummary = async (cmpReportOverallSummaryId, changes, options = {}) => {
    try {
      const cmpReportOverallSummary = await updateById(
        cmpReportOverallSummaryId, changes, true, options,
      );
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReportOverallSummaries = async (criteria, changes, options = {}) => {
    try {
      const cmpReportOverallSummaries = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpReportOverallSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportOverallSummary = async (
    cmpReportOverallSummaryId, options = { noGet: true },
  ) => {
    try {
      const changes = { deleted: true };
      const cmpReportOverallSummary = await updateById(
        cmpReportOverallSummaryId, changes, true, options,
      );
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportOverallSummaries = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpReportOverallSummaries = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpReportOverallSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReportOverallSummary = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReportOverallSummary = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReportOverallSummaries = async (
    criteria = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const cmpReportOverallSummaries = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpReportOverallSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listReportOverallSummaries,

    createReportOverallSummary,
    readReportOverallSummary,

    updateReportOverallSummary,
    updateReportOverallSummaries,

    deleteReportOverallSummary,
    deleteReportOverallSummaries,

    findReportOverallSummary,
    findReportOverallSummaries,
  };
};
