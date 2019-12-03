export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Model Accessor');

  const getByIdUser = async (
    cmpApplicationId, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
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
            through: {
              model: UserApplication,
              where: {
                deleted: false,
              },
              required: true,
            },
            foreignKey: 'cmpApplicationId',
            as: 'users',
            where: {
              id: userId,
              deleted: false,
            },
            required: true,
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

  const getByIdAdmin = async (cmpApplicationId, excludeSecret = true, excludeDeleted = true) => {
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
            through: {
              model: UserApplication,
              where: {
                deleted: false,
              },
            },
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

  const getByCriteriaUser = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
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
            through: {
              model: UserApplication,
              where: {
                deleted: false,
              },
              required: true,
            },
            foreignKey: 'cmpApplicationId',
            as: 'users',
            where: {
              id: userId,
              deleted: false,
            },
            required: true,
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

  const getByCriteriaAdmin = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
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
            through: {
              model: UserApplication,
              where: {
                deleted: false,
              },
            },
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

  const getOneByCriteria = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const cmpApplications = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted);
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
    cmpApplicationId, userId, changes = {}, excludeSecret = true, excludeDeleted = true,
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

      const cmpApplication = userId ? await getByIdUser(
        cmpApplicationId, userId, excludeSecret, excludeDeleted,
      ) : await getByIdAdmin(cmpApplicationId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, userId, changes = {}, excludeSecret = true, excludeDeleted = true,
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

      const cmpApplications = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted);
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

  const listApplications = async (userId, excludeSecret = true) => {
    try {
      const cmpApplications = userId ? await getByCriteriaUser({}, userId, excludeSecret, true)
        : await getByCriteriaAdmin({}, excludeSecret, true);
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

  const readApplication = async (cmpApplicationId, userId, excludeSecret = true) => {
    try {
      const cmpApplication = userId ? await getByIdUser(
        cmpApplicationId, userId, excludeSecret, false,
      ) : await getByIdAdmin(cmpApplicationId, excludeSecret, false);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (cmpApplicationId, userId, changes, excludeSecret = true) => {
    try {
      const cmpApplication = await updateById(
        cmpApplicationId, userId, changes, excludeSecret, true,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, userId, changes, excludeSecret = true) => {
    try {
      const cmpApplications = await updateByCriteria(
        criteria, userId, changes, excludeSecret, true,
      );
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (cmpApplicationId, userId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpApplication = await updateById(
        cmpApplicationId, userId, changes, excludeSecret, true,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria = {}, userId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpApplications = await updateByCriteria(
        criteria, userId, changes, excludeSecret, true,
      );
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplication = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const cmpApplication = await getOneByCriteria(
        criteria, userId, excludeSecret, excludeDeleted,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplications = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const cmpApplications = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted);
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
