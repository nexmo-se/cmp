export default (container) => {
  const { L } = container.defaultLogger('Cmp ApiKey Persistence Accessor');

  const listApiKeys = async (excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.listApiKeys(excludeSecret);
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

  const readApiKey = async (cmpApiKeyId, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.readApiKey(cmpApiKeyId, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKey = async (cmpApiKeyId, changes, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.updateApiKey(cmpApiKeyId, changes, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, changes, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.updateApiKeys(criteria, changes, excludeSecret);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (cmpApiKeyId, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.deleteApiKey(cmpApiKeyId, excludeSecret);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (criteria, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.deleteApiKeys(criteria, excludeSecret);
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
