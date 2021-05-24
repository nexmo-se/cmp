/**
 * Accessor Service for CMP Reports (Campaign Details)
 * Create, Read, Update, Delete and List Reports (Campaign Details)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Mapi Model Accessor');

  const getById = async (cmpReportCampaignDetailId, excludeDeleted = true) => {
    try {
      const {
        CmpReportCampaignDetail,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportCampaignDetailId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpReportCampaignDetail = await CmpReportCampaignDetail
        .findOne(query);
      if (rawCmpReportCampaignDetail == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpReportCampaignDetail = mapCmpReportCampaignDetail(
        rawCmpReportCampaignDetail,
      );
      return Promise.resolve(cmpReportCampaignDetail);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpReportCampaignDetailId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (
    criteria = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const {
        CmpReportCampaignDetail,
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

      const rawCmpReportCampaignDetails = await CmpReportCampaignDetail
        .findAll(query);
      const cmpReportCampaignDetails = rawCmpReportCampaignDetails
        .map(cmpReportCampaignDetail => mapCmpReportCampaignDetail(
          cmpReportCampaignDetail,
        ));
      return Promise.resolve(cmpReportCampaignDetails);
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
      const cmpReportCampaignDetails = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpReportCampaignDetails == null
        || cmpReportCampaignDetails.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpReportCampaignDetail = cmpReportCampaignDetails[0];
      return Promise.resolve(cmpReportCampaignDetail);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpReportCampaignDetailId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpReportCampaignDetail } = container.databaseService.models;
      const query = {
        where: {
          id: cmpReportCampaignDetailId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReportCampaignDetail.update(changes, query);
      L.trace('CmpReportCampaignDetail Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpReportCampaignDetailId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpReportCampaignDetailId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpReportCampaignDetail } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpReportCampaignDetail.update(changes, query);
      L.trace('CmpReportCampaignDetail Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpReportCampaignDetails = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpReportCampaignDetails);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpReportCampaignDetail = (cmpReportCampaignDetail) => {
    const mappedCmpReportCampaignDetail = cmpReportCampaignDetail.dataValues;

    delete mappedCmpReportCampaignDetail.deleted;
    delete mappedCmpReportCampaignDetail.createdAt;
    delete mappedCmpReportCampaignDetail.updatedAt;

    return mappedCmpReportCampaignDetail;
  };

  const listReportCampaignDetails = async (options = {}) => {
    try {
      const cmpReportCampaignDetails = await getByCriteria({}, true, options);
      return Promise.resolve(cmpReportCampaignDetails);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createReportCampaignDetail = async (
    cmpCampaignId,
    from,
    to,
  ) => {
    try {
      const { CmpReportCampaignDetail } = container.databaseService.models;
      const rawCmpReportCampaignDetail = await CmpReportCampaignDetail.create({
        id: container.uuid(),
        cmpCampaignId,
        from,
        to,
        deleted: false,
      });

      const cmpReportCampaignDetail = mapCmpReportCampaignDetail(
        rawCmpReportCampaignDetail,
      );
      return Promise.resolve(cmpReportCampaignDetail);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createReportCampaignDetail(
          cmpCampaignId,
          from,
          to,
        );
      }
      return Promise.reject(error);
    }
  };

  const readReportCampaignDetail = async (cmpReportCampaignDetailId) => {
    try {
      const cmpReportCampaignDetail = await getById(
        cmpReportCampaignDetailId, false,
      );
      return Promise.resolve(cmpReportCampaignDetail);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReportCampaignDetail = async (cmpReportCampaignDetailId, changes, options = {}) => {
    try {
      const cmpReportCampaignDetail = await updateById(
        cmpReportCampaignDetailId, changes, true, options,
      );
      return Promise.resolve(cmpReportCampaignDetail);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReportCampaignDetails = async (criteria, changes, options = {}) => {
    try {
      const cmpReportCampaignDetails = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpReportCampaignDetails);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportCampaignDetail = async (
    cmpReportCampaignDetailId, options = { noGet: true },
  ) => {
    try {
      const changes = { deleted: true };
      const cmpReportCampaignDetail = await updateById(
        cmpReportCampaignDetailId, changes, true, options,
      );
      return Promise.resolve(cmpReportCampaignDetail);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReportCampaignDetails = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpReportCampaignDetails = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpReportCampaignDetails);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReportCampaignDetail = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpReportCampaignDetail = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpReportCampaignDetail);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReportCampaignDetails = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpReportCampaignDetails = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpReportCampaignDetails);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listReportCampaignDetails,

    createReportCampaignDetail,
    readReportCampaignDetail,

    updateReportCampaignDetail,
    updateReportCampaignDetails,

    deleteReportCampaignDetail,
    deleteReportCampaignDetails,

    findReportCampaignDetail,
    findReportCampaignDetails,
  };
};
