export default (container) => {
  const { L } = container.defaultLogger('Cmp ApiKey Persistence Accessor');

  const listApiKeys = async () => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.listApiKeys();
      return Promise.resolve(cmpApiKeys);
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
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.createApiKey(
        name,
        apiKey,
        apiSecret,
      );
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApiKey = async (cmpApiKeyId) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.readApiKey(cmpApiKeyId);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKey = async (cmpApiKeyId, changes) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.updateApiKey(cmpApiKeyId, changes);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, changes) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.updateApiKeys(criteria, changes);
      return Promise.resolve(cmpApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (cmpApiKeyId) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.deleteApiKey(cmpApiKeyId);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (criteria) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.deleteApiKeys(criteria);
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
