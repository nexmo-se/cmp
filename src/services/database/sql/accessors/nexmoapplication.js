export default (container) => {
  const { L } = container.defaultLogger('Nexmo Application Model Accessor');

  const getById = async (nexmoApplicationId, excludeDeleted = true) => {
    try {
      const { NexmoApplication } = container.databaseService.models;
      const query = {
        where: {
          id: nexmoApplicationId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawNexmoApplication = await NexmoApplication.findOne(query);
      if (rawNexmoApplication == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const nexmoApplication = mapNexmoApplication(rawNexmoApplication);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const { NexmoApplication } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawNexmoApplications = await NexmoApplication.findAll(query);
      const nexmoApplications = rawNexmoApplications.map(mapNexmoApplication);
      return Promise.resolve(nexmoApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const nexmoApplications = await getByCriteria(criteria, excludeDeleted);
      if (nexmoApplications == null || nexmoApplications.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const nexmoApplication = nexmoApplications[0];
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (nexmoApplicationId, changes = {}, excludeDeleted = true) => {
    try {
      const { NexmoApplication } = container.databaseService.models;
      const query = {
        where: {
          id: nexmoApplicationId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await NexmoApplication.update(changes, query);
      L.debug('NexmoApplication Update Result', result);

      const nexmoApplication = await getById(nexmoApplicationId, excludeDeleted);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (criteria = {}, changes = {}, excludeDeleted = true) => {
    try {
      const { NexmoApplication } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await NexmoApplication.update(changes, query);
      L.debug('NexmoApplication Update Result', result);

      const nexmoApplications = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(nexmoApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapNexmoApplication = (nexmoApplication) => {
    const mappedNexmoApplication = nexmoApplication.dataValues;

    delete mappedNexmoApplication.deleted;
    delete mappedNexmoApplication.createdAt;
    delete mappedNexmoApplication.updatedAt;

    return mappedNexmoApplication;
  };

  const listApplications = async () => {
    try {
      const nexmoApplications = await getByCriteria({}, true);
      return Promise.resolve(nexmoApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createApplication = async (
    name,
    apiKey,
    applicationId,
    privateKey,
  ) => {
    try {
      const { NexmoApplication } = container.databaseService.models;
      const rawNexmoApplication = await NexmoApplication.create({
        id: container.uuid(),
        name,
        apiKey,
        applicationId,
        privateKey,
        deleted: false,
      });

      const nexmoApplication = mapNexmoApplication(rawNexmoApplication);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApplication = async (nexmoApplicationId) => {
    try {
      const nexmoApplication = await getById(nexmoApplicationId, false);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (nexmoApplicationId, changes) => {
    try {
      const nexmoApplication = await updateById(nexmoApplicationId, changes, true);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, changes) => {
    try {
      const nexmoApplications = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(nexmoApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (nexmoApplicationId) => {
    try {
      const changes = { deleted: true };
      const nexmoApplication = await updateById(nexmoApplicationId, changes, true);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const nexmoApplications = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(nexmoApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplication = async (criteria = {}, excludeDeleted = true) => {
    try {
      const nexmoApplication = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplications = async (criteria = {}, excludeDeleted = true) => {
    try {
      const nexmoApplications = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(nexmoApplications);
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
