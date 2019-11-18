export default (container) => {
  const { L } = container.defaultLogger('User Controller');

  const listAllApiKeys = async (req, res, next) => {
    try {
      const { NexmoApiKey } = container.persistenceService;
      const nexmoApiKeys = await NexmoApiKey.listApiKeys();
      res.status(200).json(nexmoApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const listMyApiKeys = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all API Keys');
      const { NexmoApiKey } = container.persistenceService;
      const nexmoApiKeys = await NexmoApiKey.listApiKeys();
      res.status(200).json(nexmoApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllApiKeys = async (req, res, next) => {
    try {
      const { NexmoApiKey } = container.persistenceService;
      const nexmoApiKeys = await NexmoApiKey.deleteApiKeys({});
      res.status(200).json(nexmoApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const createApiKey = async (req, res, next) => {
    try {
      const { name, apiKey, apiSecret } = req.body;
      const { NexmoApiKey } = container.persistenceService;

      const nexmoApiKey = await NexmoApiKey.createApiKey(name, apiKey, apiSecret);
      res.status(200).json(nexmoApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readMyApiKey = async (req, res, next) => {
    try {
      const { nexmoApiKeyId } = req.params;
      const { NexmoApiKey } = container.persistenceService;

      const nexmoApiKey = await NexmoApiKey.readApiKey(nexmoApiKeyId);
      res.status(200).json(nexmoApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readApiKey = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all API Keys');
      const { nexmoApiKeyId } = req.params;
      const { NexmoApiKey } = container.persistenceService;

      const nexmoApiKey = await NexmoApiKey.readApiKey(nexmoApiKeyId);
      res.status(200).json(nexmoApiKey);
    } catch (error) {
      next(error);
    }
  };

  const updateApiKey = async (req, res, next) => {
    try {
      const { nexmoApiKeyId } = req.params;
      const { name, apiKey, apiSecret } = req.body;

      const changes = {};

      if (name && name !== '') {
        changes.name = name;
      }

      if (apiKey && apiKey !== '') {
        changes.apiKey = apiKey;
      }

      if (apiSecret && apiSecret !== '') {
        changes.apiSecret = apiSecret;
      }

      const { NexmoApiKey } = container.persistenceService;
      const nexmoApiKey = await NexmoApiKey.updateApiKey(nexmoApiKeyId, changes);
      res.status(200).json(nexmoApiKey);
    } catch (error) {
      next(error);
    }
  };

  const deleteApiKey = async (req, res, next) => {
    try {
      const { nexmoApiKeyId } = req.params;
      const { NexmoApiKey } = container.persistenceService;
      const nexmoApiKey = await NexmoApiKey.deleteApiKey(nexmoApiKeyId);
      res.status(200).json(nexmoApiKey);
    } catch (error) {
      next(error);
    }
  };

  return {
    listAllApiKeys,
    listMyApiKeys,
    deleteAllApiKeys,

    createApiKey,
    readApiKey,
    readMyApiKey,
    updateApiKey,
    deleteApiKey,
  };
};
