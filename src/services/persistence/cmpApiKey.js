/**
 * Persistence Service for CMP API Keys
 * Create, Read, Update, Delete and List API Keys
 */

export default (container) => {
  const { L } = container.defaultLogger('Cmp ApiKey Persistence Accessor');

  const filterApiKeys = (userId, cmpApiKeys) => cmpApiKeys
    .filter((cmpApiKey) => {
      if (userId == null) {
        return true;
      }

      let found = false;

      // Check Application Users
      L.trace('Check ApiKey Users');
      if (cmpApiKey.users) {
        for (let i = 0; i < cmpApiKey.users.length; i += 1) {
          const user = cmpApiKey.users[i];
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      return found;
    });

  const listApiKeys = async (userId, excludeSecret = true, options = {}) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.listApiKeys(userId, excludeSecret, options);
      const filteredApiKeys = filterApiKeys(userId, cmpApiKeys);
      return Promise.resolve(filteredApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKey = async (userId, criteria, excludeSecret = true) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.findApiKey(
        criteria, userId, excludeSecret, true,
      );
      const filteredApiKeys = filterApiKeys(userId, [cmpApiKeys]);
      if (filteredApiKeys.length > 0) {
        return Promise.resolve(filteredApiKeys[0]);
      }
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApiKeys = async (userId, criteria, excludeSecret = true, options = {}) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.findApiKeys(
        criteria, userId, excludeSecret, true, options,
      );
      const filteredApiKeys = filterApiKeys(userId, cmpApiKeys);
      return Promise.resolve(filteredApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createApiKey = async (
    name,
    apiKey,
    apiSecret,
    signatureSecret,
    signatureMethod,
    excludeSecret = true,
  ) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.createApiKey(
        name,
        apiKey,
        apiSecret,
        signatureSecret,
        signatureMethod,
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

  const updateApiKey = async (cmpApiKeyId, userId, changes, excludeSecret = true, options = {}) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.updateApiKey(
        cmpApiKeyId, userId, changes, excludeSecret, options,
      );
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApiKeys = async (criteria, userId, changes, excludeSecret = true, options = {}) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.updateApiKeys(
        criteria, userId, changes, excludeSecret, options,
      );
      const filteredApiKeys = filterApiKeys(userId, cmpApiKeys);
      return Promise.resolve(filteredApiKeys);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKey = async (
    cmpApiKeyId, userId, excludeSecret = true, options = { noGet: true },
  ) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKey = await CmpApiKey.deleteApiKey(cmpApiKeyId, userId, excludeSecret, options);
      return Promise.resolve(cmpApiKey);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApiKeys = async (
    criteria, userId, excludeSecret = true, options = { noGet: true },
  ) => {
    try {
      const { CmpApiKey } = container.databaseService.accessors;
      const cmpApiKeys = await CmpApiKey.deleteApiKeys(criteria, userId, excludeSecret, options);
      const filteredApiKeys = filterApiKeys(userId, cmpApiKeys);
      return Promise.resolve(filteredApiKeys);
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
