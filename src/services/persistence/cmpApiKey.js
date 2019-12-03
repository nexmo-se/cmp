export default (container) => {
  const { L } = container.defaultLogger('Cmp ApiKey Persistence Accessor');

  const listApiKeys = async (userId, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.listApiKeys(userId, excludeSecret);
      return Promise.resolve(cmpApiKeys);
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
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.createApiKey(
        name,
        apiKey,
        apiSecret,
        excludeSecret,
      );
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApiKey = async (cmpApiKeyId, userId, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.readApiKey(cmpApiKeyId, userId, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKey = async (cmpApiKeyId, userId, changes, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.updateApiKey(cmpApiKeyId, userId, changes, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, userId, changes, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.updateApiKeys(criteria, userId, changes, excludeSecret);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (cmpApiKeyId, userId, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.deleteApiKey(cmpApiKeyId, userId, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (criteria, userId, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.deleteApiKeys(criteria, userId, excludeSecret);
      return Promise.resolve(cmpApiKey);
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
  };
};
