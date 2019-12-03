export default (container) => {
  const { L } = container.defaultLogger('Cmp ApiKey Model Accessor');

  const getByIdUser = async (cmpApiKeyId, userId, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApiKey,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApiKeyId,
        },
        include: [
          {
            model: CmpApplication,
            as: 'cmpApplications',
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
            required: true,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpApiKey = await CmpApiKey.findOne(query);
      if (rawCmpApiKey == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpApiKey = mapCmpApiKey(rawCmpApiKey, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByIdAdmin = async (cmpApiKeyId, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApiKey,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApiKeyId,
        },
        include: [
          {
            model: CmpApplication,
            as: 'cmpApplications',
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
              model: UserApiKey,
              where: {
                deleted: false,
              },
            },
            foreignKey: 'cmpApiKeyId',
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

      const rawCmpApiKey = await CmpApiKey.findOne(query);
      if (rawCmpApiKey == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpApiKey = mapCmpApiKey(rawCmpApiKey, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteriaUser = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApiKey,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpApplication,
            as: 'cmpApplications',
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
            required: true,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpApiKeys = await CmpApiKey.findAll(query);
      const cmpApiKeys = rawCmpApiKeys
        .map(cmpApiKey => mapCmpApiKey(cmpApiKey, excludeSecret));
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteriaAdmin = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, User, UserApiKey,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpApplication,
            as: 'cmpApplications',
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
              model: UserApiKey,
              where: {
                deleted: false,
              },
            },
            foreignKey: 'cmpApiKeyId',
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

      const rawCmpApiKeys = await CmpApiKey.findAll(query);
      const cmpApiKeys = rawCmpApiKeys
        .map(cmpApiKey => mapCmpApiKey(cmpApiKey, excludeSecret));
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const cmpApiKeys = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted);
      if (cmpApiKeys == null || cmpApiKeys.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpApiKey = cmpApiKeys[0];
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpApiKeyId, userId, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpApiKey } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApiKeyId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpApiKey.update(changes, query);
      L.debug('CmpApiKey Update Result', result);

      const apiKey = userId ? await getByIdUser(cmpApiKeyId, userId, excludeSecret, excludeDeleted)
        : await getByIdAdmin(cmpApiKeyId, excludeSecret, excludeDeleted);
      return Promise.resolve(apiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, userId, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpApiKey } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpApiKey.update(changes, query);
      L.debug('CmpApiKey Update Result', result);

      const cmpApiKeys = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApiKeys);
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

  const mapCmpChannel = (cmpChannel) => {
    const mappedCmpChannel = cmpChannel.dataValues;

    delete mappedCmpChannel.deleted;
    delete mappedCmpChannel.createdAt;
    delete mappedCmpChannel.updatedAt;

    return mappedCmpChannel;
  };

  const mapCmpApplication = (cmpApplication, excludeSecret = true) => {
    const mappedCmpApplication = cmpApplication.dataValues;

    if (excludeSecret) {
      delete mappedCmpApplication.privateKey;
    }

    delete mappedCmpApplication.deleted;
    delete mappedCmpApplication.createdAt;
    delete mappedCmpApplication.updatedAt;

    return mappedCmpApplication;
  };

  const mapCmpApiKey = (cmpApiKey, excludeSecret = true) => {
    const mappedCmpApiKey = cmpApiKey.dataValues;

    mappedCmpApiKey.cmpApplications = (mappedCmpApiKey.cmpApplications || [])
      .map(cmpApplication => mapCmpApplication(cmpApplication, excludeSecret));
    mappedCmpApiKey.cmpChannels = (mappedCmpApiKey.cmpChannels || [])
      .map(mapCmpChannel);
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

  const listApiKeys = async (userId, excludeSecret = true) => {
    try {
      const apiKeys = userId ? await getByCriteriaUser({}, userId, excludeSecret, true)
        : await getByCriteriaAdmin({}, excludeSecret, true);
      return Promise.resolve(apiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createApiKey = async (
    name,
    apiKey,
    apiSecret,
    excludeSecret = true,
  ) => {
    try {
      const { CmpApiKey } = container.databaseService.models;
      const rawCmpApiKey = await CmpApiKey.create({
        id: container.uuid(),
        name,
        apiKey,
        apiSecret,
        deleted: false,
      });

      const cmpApiKey = mapCmpApiKey(rawCmpApiKey, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApiKey = async (cmpApiKeyId, userId, excludeSecret = true) => {
    try {
      const cmpApiKey = userId ? await getByIdUser(cmpApiKeyId, userId, excludeSecret, false)
        : await getByIdAdmin(cmpApiKeyId, excludeSecret, false);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKey = async (cmpApiKeyId, userId, changes, excludeSecret = true) => {
    try {
      const cmpApiKey = await updateById(cmpApiKeyId, userId, changes, excludeSecret, true);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, userId, changes, excludeSecret = true) => {
    try {
      const cmpApiKeys = await updateByCriteria(criteria, userId, changes, excludeSecret, true);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (cmpApiKeyId, userId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpApiKey = await updateById(cmpApiKeyId, userId, changes, excludeSecret, true);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (criteria = {}, userId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpApiKeys = await updateByCriteria(criteria, userId, changes, excludeSecret, true);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKey = async (criteria = {}, userId, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpApiKey = await getOneByCriteria(criteria, userId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKeys = async (
    criteria = {}, userId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const cmpApiKeys = userId ? await getByCriteriaUser(
        criteria, userId, excludeSecret, excludeDeleted,
      ) : await getByCriteriaAdmin(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listApiKeys,

    createApiKey,
    readApiKey,

    updateApiKey,
    updateApiKeys,

    deleteApiKey,
    deleteApiKeys,

    findApiKey,
    findApiKeys,
  };
};
