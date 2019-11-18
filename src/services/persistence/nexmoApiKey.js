export default (container) => {
  const { L } = container.defaultLogger('Nexmo ApiKey Persistence Accessor');

  const listApiKeys = async () => {
    try {
      const { NexmoApiKey } = container.databaseService.accessors;
      const nexmoApiKeys = await NexmoApiKey.listApiKeys();
      return Promise.resolve(nexmoApiKeys);
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
      const { NexmoApiKey } = container.databaseService.accessors;
      const nexmoApiKey = await NexmoApiKey.createApiKey(
        name,
        apiKey,
        apiSecret,
      );
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApiKey = async (nexmoApiKeyId) => {
    try {
      const { NexmoApiKey } = container.databaseService.accessors;
      const nexmoApiKey = await NexmoApiKey.readApiKey(nexmoApiKeyId);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKey = async (nexmoApiKeyId, changes) => {
    try {
      const { NexmoApiKey } = container.databaseService.accessors;
      const nexmoApiKey = await NexmoApiKey.updateApiKey(nexmoApiKeyId, changes);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, changes) => {
    try {
      const { NexmoApiKey } = container.databaseService.accessors;
      const nexmoApiKeys = await NexmoApiKey.updateApiKeys(criteria, changes);
      return Promise.resolve(nexmoApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (nexmoApiKeyId) => {
    try {
      const { NexmoApiKey } = container.databaseService.accessors;
      const nexmoApiKey = await NexmoApiKey.deleteApiKey(nexmoApiKeyId);
      return Promise.resolve(nexmoApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (criteria) => {
    try {
      const { NexmoApiKey } = container.databaseService.accessors;
      const nexmoApiKey = await NexmoApiKey.deleteApiKeys(criteria);
      return Promise.resolve(nexmoApiKey);
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
