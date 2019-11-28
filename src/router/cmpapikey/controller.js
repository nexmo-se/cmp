export default (container) => {
  const { L } = container.defaultLogger('Cmp ApiKey Controller');

  const updateWebhook = async (apiKey, apiSecret) => {
    try {
      const routes = {
        inbound: 'webhook/sms/inbound',
        delivery: 'webhook/sms/delivery',
      };

      await container.nexmoService.webhook.registerSms(
        apiKey, apiSecret, routes.inbound, routes.delivery,
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const setWebhook = async (req, res, next) => {
    try {
      const { cmpApiKeyId } = req.params;
      const { CmpApiKey } = container.persistenceService;

      const cmpApiKey = await CmpApiKey.readApiKey(cmpApiKeyId, false);
      const { apiKey, apiSecret } = cmpApiKey;

      await updateWebhook(apiKey, apiSecret);
      res.status(200).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const listAllApiKeys = async (req, res, next) => {
    try {
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKeys = await CmpApiKey.listApiKeys();
      res.status(200).json(cmpApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const listMyApiKeys = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all API Keys');
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKeys = await CmpApiKey.listApiKeys();
      res.status(200).json(cmpApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllApiKeys = async (req, res, next) => {
    try {
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKeys = await CmpApiKey.deleteApiKeys({});
      res.status(200).json(cmpApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const createApiKey = async (req, res, next) => {
    try {
      const { name, apiKey, apiSecret } = req.body;
      const { CmpApiKey } = container.persistenceService;

      const cmpApiKey = await CmpApiKey.createApiKey(name, apiKey, apiSecret);
      await updateWebhook(apiKey, apiSecret);
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readMyApiKey = async (req, res, next) => {
    try {
      const { cmpApiKeyId } = req.params;
      const { CmpApiKey } = container.persistenceService;

      const cmpApiKey = await CmpApiKey.readApiKey(cmpApiKeyId);
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readApiKey = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all API Keys');
      const { cmpApiKeyId } = req.params;
      const { CmpApiKey } = container.persistenceService;

      const cmpApiKey = await CmpApiKey.readApiKey(cmpApiKeyId);
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  const updateApiKey = async (req, res, next) => {
    try {
      const { cmpApiKeyId } = req.params;
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

      const { CmpApiKey } = container.persistenceService;
      const cmpApiKey = await CmpApiKey.updateApiKey(cmpApiKeyId, changes);
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  const deleteApiKey = async (req, res, next) => {
    try {
      const { cmpApiKeyId } = req.params;
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKey = await CmpApiKey.deleteApiKey(cmpApiKeyId);
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  return {
    setWebhook,

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
