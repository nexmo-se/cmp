export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Model Accessor');

  const getById = async (cmpApplicationId, excludeDeleted = true) => {
    try {
      const { CmpApplication, CmpChannel } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApplicationId,
        },
        include: [
          {
            model: CmpChannel,
            as: 'channels',
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

      const rawCmpApplication = await CmpApplication.findOne(query);
      if (rawCmpApplication == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpApplication = mapCmpApplication(rawCmpApplication);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const { CmpApplication, CmpChannel } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpChannel,
            as: 'channels',
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

      const rawCmpApplications = await CmpApplication.findAll(query);
      const cmpApplications = rawCmpApplications.map(mapCmpApplication);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpApplications = await getByCriteria(criteria, excludeDeleted);
      if (cmpApplications == null || cmpApplications.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpApplication = cmpApplications[0];
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (cmpApplicationId, changes = {}, excludeDeleted = true) => {
    try {
      const { CmpApplication } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApplicationId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpApplication.update(changes, query);
      L.debug('CmpApplication Update Result', result);

      const cmpApplication = await getById(cmpApplicationId, excludeDeleted);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (criteria = {}, changes = {}, excludeDeleted = true) => {
    try {
      const { CmpApplication } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpApplication.update(changes, query);
      L.debug('CmpApplication Update Result', result);

      const cmpApplications = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpApplication = (cmpApplication) => {
    const mappedCmpApplication = cmpApplication.dataValues;

    delete mappedCmpApplication.deleted;
    delete mappedCmpApplication.createdAt;
    delete mappedCmpApplication.updatedAt;

    return mappedCmpApplication;
  };

  const listApplications = async () => {
    try {
      const cmpApplications = await getByCriteria({}, true);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createApplication = async (
    name,
    cmpApiKeyId,
    applicationId,
    privateKey,
  ) => {
    try {
      const { CmpApplication } = container.databaseService.models;
      const rawCmpApplication = await CmpApplication.create({
        id: container.uuid(),
        name,
        cmpApiKeyId,
        applicationId,
        privateKey,
        deleted: false,
      });

      const cmpApplication = mapCmpApplication(rawCmpApplication);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApplication = async (cmpApplicationId) => {
    try {
      const cmpApplication = await getById(cmpApplicationId, false);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (cmpApplicationId, changes) => {
    try {
      const cmpApplication = await updateById(cmpApplicationId, changes, true);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, changes) => {
    try {
      const cmpApplications = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (cmpApplicationId) => {
    try {
      const changes = { deleted: true };
      const cmpApplication = await updateById(cmpApplicationId, changes, true);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpApplications = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplication = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpApplication = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplications = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpApplications = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listApplications,

    createApplication,
    readApplication,

    updateApplication,
    updateApplications,

    deleteApplication,
    deleteApplications,

    findApplication,
    findApplications,
  };
};
