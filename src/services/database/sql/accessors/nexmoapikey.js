export default (container) => {
  const { L } = container.defaultLogger('Nexmo ApiKey Model Accessor');

  const getById = async (nexmoApiKeyId, excludeDeleted = true) => {
    try {
      const { NexmoApiKey, NexmoApplication } = container.databaseService.models;
      const query = {
        where: {
          id: nexmoApiKeyId,
        },
        include: [
          {
            model: NexmoApplication,
            as: 'applications',
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

      const rawNexmoApiKey = await NexmoApiKey.findOne(query);
      if (rawNexmoApiKey == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const nexmoApiKey = mapNexmoApiKey(rawNexmoApiKey);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const { NexmoApiKey, NexmoApplication } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: NexmoApplication,
            as: 'applications',
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

      const rawNexmoApiKeys = await NexmoApiKey.findAll(query);
      const nexmoApiKeys = rawNexmoApiKeys.map(mapNexmoApiKey);
      return Promise.resolve(nexmoApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const nexmoApiKeys = await getByCriteria(criteria, excludeDeleted);
      if (nexmoApiKeys == null || nexmoApiKeys.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const nexmoApiKey = nexmoApiKeys[0];
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (nexmoApiKeyId, changes = {}, excludeDeleted = true) => {
    try {
      const { NexmoApiKey } = container.databaseService.models;
      const query = {
        where: {
          id: nexmoApiKeyId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await NexmoApiKey.update(changes, query);
      L.debug('NexmoApiKey Update Result', result);

      const apiKey = await getById(nexmoApiKeyId, excludeDeleted);
      return Promise.resolve(apiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (criteria = {}, changes = {}, excludeDeleted = true) => {
    try {
      const { NexmoApiKey } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await NexmoApiKey.update(changes, query);
      L.debug('NexmoApiKey Update Result', result);

      const nexmoApiKeys = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(nexmoApiKeys);
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

  const mapNexmoApiKey = (nexmoApiKey) => {
    const mappedNexmoApiKey = nexmoApiKey.dataValues;

    mappedNexmoApiKey.applications = (mapNexmoApiKey.applications || []).map(mapNexmoApplication);

    delete mappedNexmoApiKey.deleted;
    delete mappedNexmoApiKey.createdAt;
    delete mappedNexmoApiKey.updatedAt;

    return mappedNexmoApiKey;
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
      const { NexmoApiKey } = container.databaseService.models;
      const rawNexmoApiKey = await NexmoApiKey.create({
        id: container.uuid(),
        name,
        apiKey,
        apiSecret,
        deleted: false,
      });

      const nexmoApiKey = mapNexmoApiKey(rawNexmoApiKey);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApiKey = async (nexmoApiKeyId) => {
    try {
      const nexmoApiKey = await getById(nexmoApiKeyId, false);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKey = async (nexmoApiKeyId, changes) => {
    try {
      const nexmoApiKey = await updateById(nexmoApiKeyId, changes, true);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, changes) => {
    try {
      const nexmoApiKeys = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(nexmoApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (nexmoApiKeyId) => {
    try {
      const changes = { deleted: true };
      const nexmoApiKey = await updateById(nexmoApiKeyId, changes, true);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const nexmoApiKeys = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(nexmoApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKey = async (criteria = {}, excludeDeleted = true) => {
    try {
      const nexmoApiKey = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKeys = async (criteria = {}, excludeDeleted = true) => {
    try {
      const nexmoApiKeys = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(nexmoApiKeys);
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
