export default (container) => {
  const { L } = container.defaultLogger('Cmp ApiKey Model Accessor');

  const getById = async (cmpApiKeyId, excludeDeleted = true) => {
    try {
      const { CmpApiKey, CmpApplication, CmpChannel } = container.databaseService.models;
      const query = {
        where: {
          id: cmpApiKeyId,
        },
        include: [
          {
            model: CmpApplication,
            as: 'applications',
            where: {
              deleted: false,
            },
            required: false,
          },
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

      const rawCmpApiKey = await CmpApiKey.findOne(query);
      if (rawCmpApiKey == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpApiKey = mapCmpApiKey(rawCmpApiKey);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const { CmpApiKey, CmpApplication, CmpChannel } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpApplication,
            as: 'applications',
            where: {
              deleted: false,
            },
            required: false,
          },
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

      const rawCmpApiKeys = await CmpApiKey.findAll(query);
      const cmpApiKeys = rawCmpApiKeys.map(mapCmpApiKey);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpApiKeys = await getByCriteria(criteria, excludeDeleted);
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

  const updateById = async (cmpApiKeyId, changes = {}, excludeDeleted = true) => {
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

      const apiKey = await getById(cmpApiKeyId, excludeDeleted);
      return Promise.resolve(apiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (criteria = {}, changes = {}, excludeDeleted = true) => {
    try {
      const { CmpApiKey } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpApiKey.update(changes, query);
      L.debug('CmpApiKey Update Result', result);

      const cmpApiKeys = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpApiKeys);
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

  const mapCmpApiKey = (cmpApiKey) => {
    const mappedCmpApiKey = cmpApiKey.dataValues;

    mappedCmpApiKey.applications = (mapCmpApiKey.applications || []).map(mapCmpApplication);

    delete mappedCmpApiKey.deleted;
    delete mappedCmpApiKey.createdAt;
    delete mappedCmpApiKey.updatedAt;

    return mappedCmpApiKey;
  };

  const listApiKeys = async () => {
    try {
      const apiKeys = await getByCriteria({}, true);
      return Promise.resolve(apiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createApiKey = async (
    name,
    apiKey,
    apiSecret,
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

      const cmpApiKey = mapCmpApiKey(rawCmpApiKey);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApiKey = async (cmpApiKeyId) => {
    try {
      const cmpApiKey = await getById(cmpApiKeyId, false);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKey = async (cmpApiKeyId, changes) => {
    try {
      const cmpApiKey = await updateById(cmpApiKeyId, changes, true);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, changes) => {
    try {
      const cmpApiKeys = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (cmpApiKeyId) => {
    try {
      const changes = { deleted: true };
      const cmpApiKey = await updateById(cmpApiKeyId, changes, true);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpApiKeys = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKey = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpApiKey = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKeys = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpApiKeys = await getByCriteria(criteria, excludeDeleted);
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
