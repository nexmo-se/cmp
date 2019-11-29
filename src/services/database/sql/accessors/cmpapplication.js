export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Model Accessor');

  const getById = async (cmpApplicationId, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApplication,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApplicationId,
        },
        include: [
          {
            model: CmpApiKey,
            as: 'cmpApiKey',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpChannel,
            as: 'cmpChannels',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: User,
            through: UserApplication,
            foreignKey: 'cmpApplicationId',
            as: 'users',
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

      const cmpApplication = mapCmpApplication(rawCmpApplication, excludeSecret);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApplication,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpApiKey,
            as: 'cmpApiKey',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpChannel,
            as: 'cmpChannels',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: User,
            through: UserApplication,
            foreignKey: 'cmpApplicationId',
            as: 'users',
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
      const cmpApplications = rawCmpApplications
        .map(cmpApplication => mapCmpApplication(cmpApplication, excludeSecret));
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpApplications = await getByCriteria(criteria, excludeSecret, excludeDeleted);
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

  const updateById = async (
    cmpApplicationId, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
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

      const cmpApplication = await getById(cmpApplicationId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpApplication } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpApplication.update(changes, query);
      L.debug('CmpApplication Update Result', result);

      const cmpApplications = await getByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapUser = (user) => {
    const userData = user.dataValues;

    const mappedUser = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
    };

    return mappedUser;
  };

  const mapCmpApplication = (cmpApplication, excludeSecret = true) => {
    const mappedCmpApplication = cmpApplication.dataValues;

    if (excludeSecret) {
      delete mappedCmpApplication.privateKey;
    }

    mappedCmpApplication.users = (mappedCmpApplication.users || [])
      .map(mapUser);

    delete mappedCmpApplication.deleted;
    delete mappedCmpApplication.createdAt;
    delete mappedCmpApplication.updatedAt;

    return mappedCmpApplication;
  };

  const listApplications = async (excludeSecret = true) => {
    try {
      const cmpApplications = await getByCriteria({}, excludeSecret, true);
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
    excludeSecret = true,
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

      const cmpApplication = mapCmpApplication(rawCmpApplication, excludeSecret);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApplication = async (cmpApplicationId, excludeSecret = true) => {
    try {
      const cmpApplication = await getById(cmpApplicationId, excludeSecret, false);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (cmpApplicationId, changes, excludeSecret = true) => {
    try {
      const cmpApplication = await updateById(cmpApplicationId, changes, excludeSecret, true);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, changes, excludeSecret = true) => {
    try {
      const cmpApplications = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (cmpApplicationId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpApplication = await updateById(cmpApplicationId, changes, excludeSecret, true);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria = {}, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpApplications = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplication = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpApplication = await getOneByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplications = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpApplications = await getByCriteria(criteria, excludeSecret, excludeDeleted);
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
