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

  const findAllApiKeys = async (req, res, next) => {
    try {
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        name, signatureMethod,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (signatureMethod) {
        criteria.signatureMethod = signatureMethod;
      }
      const options = { limit, offset };
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKeys = await CmpApiKey.findApiKeys(null, criteria, true, options);
      res.status(200).json(cmpApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const findMyApiKeys = async (req, res, next) => {
    try {
      const { Op } = container.Sequelize;
      L.warn('Temporary: User can read all API Keys');
      const {
        limit, offset,
        name, signatureMethod,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (signatureMethod) {
        criteria.signatureMethod = signatureMethod;
      }
      const options = { limit, offset };
      const { user } = req;
      const userId = user.id;
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKeys = await CmpApiKey.findApiKeys(userId, criteria, true, options);
      res.status(200).json(cmpApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const listAllApiKeys = async (req, res, next) => {
    try {
      const {
        limit, offset,
        name, signatureMethod,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (signatureMethod) {
        criteria.signatureMethod = signatureMethod;
      }
      const options = { limit, offset };
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKeys = await CmpApiKey.findApiKeys(null, criteria, true, options);
      res.status(200).json(cmpApiKeys);
    } catch (error) {
      next(error);
    }
  };

  const listMyApiKeys = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all API Keys');
      const {
        limit, offset,
        name, signatureMethod,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (signatureMethod) {
        criteria.signatureMethod = signatureMethod;
      }
      const options = { limit, offset };
      const { user } = req;
      const userId = user.id;
      const { CmpApiKey } = container.persistenceService;
      const cmpApiKeys = await CmpApiKey.findApiKeys(userId, criteria, true, options);
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
      const {
        name, apiKey, apiSecret, signatureSecret, signatureMethod,
      } = req.body;
      const { CmpApiKey } = container.persistenceService;

      const cmpApiKey = await CmpApiKey.createApiKey(
        name, apiKey, apiSecret, signatureSecret, signatureMethod,
      );
      await updateWebhook(apiKey, apiSecret);
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readMyApiKey = async (req, res, next) => {
    try {
      const { user } = req;
      const userId = user.id;
      const { cmpApiKeyId } = req.params;
      const { CmpApiKey } = container.persistenceService;

      const cmpApiKey = await CmpApiKey.readApiKey(cmpApiKeyId, userId);
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
      const {
        name, apiKey, apiSecret, signatureSecret, signatureMethod,
      } = req.body;

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

      if (signatureSecret && signatureSecret !== '') {
        changes.signatureSecret = signatureSecret;
      }

      if (signatureMethod && signatureMethod !== '') {
        changes.signatureMethod = signatureMethod;
      }

      const { CmpApiKey } = container.persistenceService;
      const cmpApiKey = await CmpApiKey.updateApiKey(cmpApiKeyId, null, changes);
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

    findAllApiKeys,
    findMyApiKeys,

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
