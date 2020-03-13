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
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpReportOverallSummary,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpReportOverallSummaries = await CmpReportOverallSummary
        .findAll(query);
      const cmpReportOverallSummaries = rawCmpReportOverallSummaries
        .map(cmpReportOverallSummary => mapCmpReportOverallSummary(
          cmpReportOverallSummary,
        ));
      return Promise.resolve(cmpReportOverallSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReportOverallSummaries = await getByCriteria(criteria, excludeDeleted);
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

      const cmpMedia = await getById(cmpReportOverallSummaryId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
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

      const cmpReportOverallSummaries = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpReportOverallSummaries);
    } catch (error) {
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

  const listReportOverallSummaries = async () => {
    try {
      const cmpReportOverallSummaries = await getByCriteria({}, true);
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

  const updateReportOverallSummary = async (cmpReportOverallSummaryId, changes) => {
    try {
      const cmpReportOverallSummary = await updateById(
        cmpReportOverallSummaryId, changes, true,
      );
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReportOverallSummaries = async (criteria, changes) => {
    try {
      const cmpReportOverallSummaries = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpReportOverallSummaries);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportOverallSummary = async (cmpReportOverallSummaryId) => {
    try {
      const changes = { deleted: true };
      const cmpReportOverallSummary = await updateById(
        cmpReportOverallSummaryId, changes, true,
      );
      return Promise.resolve(cmpReportOverallSummary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportOverallSummaries = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpReportOverallSummaries = await updateByCriteria(criteria, changes, true);
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

  const findReportOverallSummaries = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReportOverallSummaries = await getByCriteria(criteria, excludeDeleted);
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
