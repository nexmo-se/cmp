/**
 * Accessor Service for CMP Applications
 * Create, Read, Update, Delete and List Applications
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Model Accessor');

  const getByIdUser = async (
    cmpApplicationId, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApplication, UserApiKey,
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
            include: [
              {
                model: User,
                through: {
                  model: UserApiKey,
                  where: {
                    deleted: false,
                  },
                  required: true,
                },
                foreignKey: 'cmpApiKeyId',
                as: 'users',
                where: {
                  id: userId,
                  deleted: false,
                },
                required: false,
              },
            ],
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
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpApplication = mapCmpApplication(rawCmpApplication, excludeSecret);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByIdUser(cmpApplicationId, userId, excludeSecret, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByIdAdmin = async (cmpApplicationId, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApplication, UserApiKey,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApplicationId,
        },
        include: [
          {
            model: CmpApiKey,
            as: 'cmpApiKey',
            include: [
              {
                model: User,
                through: {
                  model: UserApiKey,
                  where: {
                    deleted: false,
                  },
                  required: true,
                },
                foreignKey: 'cmpApiKeyId',
                as: 'users',
                where: {
                  deleted: false,
                },
                required: false,
              },
            ],
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
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpApplication = mapCmpApplication(rawCmpApplication, excludeSecret);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByIdAdmin(cmpApplicationId, excludeSecret, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteriaUser = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true, options = {},
  ) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApplication, UserApiKey,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['name', 'ASC'],
          ['applicationId', 'ASC'],
          ['createdAt', 'DESC'],
        ],
        include: [
          {
            model: CmpApiKey,
            as: 'cmpApiKey',
            include: [
              {
                model: User,
                through: {
                  model: UserApiKey,
                  where: {
                    deleted: false,
                  },
                  required: true,
                },
                foreignKey: 'cmpApiKeyId',
                as: 'users',
                where: {
                  id: userId,
                  deleted: false,
                },
                required: false,
              },
            ],
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

      const rawCmpApplications = await CmpApplication.findAll(query);
      const cmpApplications = rawCmpApplications
        .map(cmpApplication => mapCmpApplication(cmpApplication, excludeSecret));
      return Promise.resolve(cmpApplications);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteriaUser(criteria, userId, excludeSecret, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteriaAdmin = async (
    criteria = {}, excludeSecret = true, excludeDeleted = true, options = {},
  ) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApplication, UserApiKey,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['name', 'ASC'],
          ['applicationId', 'ASC'],
          ['createdAt', 'DESC'],
        ],
        include: [
          {
            model: CmpApiKey,
            as: 'cmpApiKey',
            include: [
              {
                model: User,
                through: {
                  model: UserApiKey,
                  where: {
                    deleted: false,
                  },
                  required: true,
                },
                foreignKey: 'cmpApiKeyId',
                as: 'users',
                where: {
                  deleted: false,
                },
                required: false,
              },
            ],
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

      // Check Limit
      if (options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      // Check Offset
      if (options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpApplications = await CmpApplication.findAll(query);
      const cmpApplications = rawCmpApplications
        .map(cmpApplication => mapCmpApplication(cmpApplication, excludeSecret));
      return Promise.resolve(cmpApplications);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpApplications = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted, options,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted, options);
      if (cmpApplications == null || cmpApplications.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
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
    options = {},
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
      L.trace('CmpApplication Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpApplication = userId ? await getByIdUser(
        cmpApplicationId, userId, excludeSecret, excludeDeleted,
      ) : await getByIdAdmin(cmpApplicationId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(
          cmpApplicationId, userId, changes, excludeSecret, excludeDeleted, options,
        );
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, userId, changes = {}, excludeSecret = true, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpApplication } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpApplication.update(changes, query);
      L.trace('CmpApplication Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpApplications = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted, options,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted, options);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(
          criteria, userId, changes, excludeSecret, excludeDeleted, options,
        );
      }
      return Promise.reject(error);
    }
  };

  const mapUser = (user) => {
    const userData = user.dataValues;

    const mappedUser = {
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,

      userApiKeyId: userData.UserApiKey ? userData.UserApiKey.dataValues.id : null,
      userApplicationId: userData.UserApplication ? userData.UserApplication.dataValues.id : null,
      userChannelId: userData.UserChannel ? userData.UserChannel.dataValues.id : null,
    };

    return mappedUser;
  };

  const mapApiKey = (cmpApiKey, excludeSecret = true) => {
    const mappedCmpApiKey = cmpApiKey.dataValues;

    mappedCmpApiKey.users = (mappedCmpApiKey.users || [])
      .map(mapUser);

    if (excludeSecret) {
      delete mappedCmpApiKey.apiSecret;
    }

    delete mappedCmpApiKey.deleted;
    delete mappedCmpApiKey.createdAt;
    delete mappedCmpApiKey.updatedAt;

    return mappedCmpApiKey;
  };

  const mapCmpApplication = (cmpApplication, excludeSecret = true) => {
    const mappedCmpApplication = cmpApplication.dataValues;

    if (excludeSecret) {
      delete mappedCmpApplication.privateKey;
    }

    if (mappedCmpApplication.cmpApiKey) {
      mappedCmpApplication.cmpApiKey = mapApiKey(mappedCmpApplication.cmpApiKey, excludeSecret);
    }

    mappedCmpApplication.users = (mappedCmpApplication.users || [])
      .map(mapUser);

    delete mappedCmpApplication.deleted;
    delete mappedCmpApplication.createdAt;
    delete mappedCmpApplication.updatedAt;

    return mappedCmpApplication;
  };

  const listApplications = async (userId, excludeSecret = true, options = {}) => {
    try {
      const cmpApplications = userId ? await getByCriteriaUser(
        {}, userId, excludeSecret, true, options,
      ) : await getByCriteriaAdmin({}, excludeSecret, true, options);
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
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createApplication(
          name,
          cmpApiKeyId,
          applicationId,
          privateKey,
          excludeSecret,
        );
      }
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

  const updateApplication = async (
    cmpApplicationId, userId, changes, excludeSecret = true,
    options = {},
  ) => {
    try {
      const cmpApplication = await updateById(
        cmpApplicationId, userId, changes, excludeSecret, true, options,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (
    criteria, userId, changes, excludeSecret = true,
    options = {},
  ) => {
    try {
      const cmpApplications = await updateByCriteria(
        criteria, userId, changes, excludeSecret, true, options,
      );
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (
    cmpApplicationId, userId, excludeSecret = true,
    options = {},
  ) => {
    try {
      const changes = { deleted: true };
      const cmpApplication = await updateById(
        cmpApplicationId, userId, changes, excludeSecret, true, options,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (
    criteria = {}, userId, excludeSecret = true,
    options = {},
  ) => {
    try {
      const changes = { deleted: true };
      const cmpApplications = await updateByCriteria(
        criteria, userId, changes, excludeSecret, true, options,
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
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true, options = {},
  ) => {
    try {
      const cmpApplications = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted, options,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted, options);
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
