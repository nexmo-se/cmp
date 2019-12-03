export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Controller');

  const updateWebhook = async (apiKey, apiSecret, applicationId) => {
    try {
      const routes = {
        inbound: 'webhook/mapi/inbound',
        status: 'webhook/mapi/status',
      };

      await container.nexmoService.webhook.registerMapi(
        apiKey, apiSecret, applicationId, routes.inbound, routes.status,
      );
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const setWebhook = async (req, res, next) => {
    try {
      const { cmpApplicationId } = req.params;
      const { CmpApplication } = container.persistenceService;

      const cmpApplication = await CmpApplication.readApplication(cmpApplicationId);
      const { cmpApiKey, applicationId } = cmpApplication;
      const { apiKey, apiSecret } = cmpApiKey;

      await updateWebhook(apiKey, apiSecret, applicationId);
      res.status(200).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const listAllApplications = async (req, res, next) => {
    try {
      const { CmpApplication } = container.persistenceService;
      const cmpApplications = await CmpApplication.listApplications();
      res.status(200).json(cmpApplications);
    } catch (error) {
      next(error);
    }
  };

  const listMyApplications = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Applications');
      const { user } = req;
      const userId = user.id;
      const { CmpApplication } = container.persistenceService;
      const cmpApplications = await CmpApplication.listApplications(userId);
      res.status(200).json(cmpApplications);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllApplications = async (req, res, next) => {
    try {
      const { CmpApplication } = container.persistenceService;
      const cmpApplications = await CmpApplication.deleteApplications({});
      res.status(200).json(cmpApplications);
    } catch (error) {
      next(error);
    }
  };

  const createApplication = async (req, res, next) => {
    try {
      const {
        name, cmpApiKeyId, applicationId, privateKey,
      } = req.body;
      const { CmpApplication } = container.persistenceService;

      const createdCmpApplication = await CmpApplication.createApplication(
        name, cmpApiKeyId, applicationId, privateKey,
      );

      // Setup Webhook
      const cmpApplication = CmpApplication.readApplication(createdCmpApplication.id, false);
      const { cmpApiKey } = cmpApplication;
      const { apiKey, apiSecret } = cmpApiKey;
      await updateWebhook(apiKey, apiSecret, applicationId);

      res.status(200).json(createdCmpApplication);
    } catch (error) {
      next(error);
    }
  };

  const readApplication = async (req, res, next) => {
    try {
      const { cmpApplicationId } = req.params;
      const { CmpApplication } = container.persistenceService;

      const cmpApplication = await CmpApplication.readApplication(cmpApplicationId);
      res.status(200).json(cmpApplication);
    } catch (error) {
      next(error);
    }
  };

  const readMyApplication = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Applications');
      const { user } = req;
      const userId = user.id;
      const { cmpApplicationId } = req.params;
      const { CmpApplication } = container.persistenceService;

      const cmpApplication = await CmpApplication.readApplication(cmpApplicationId, userId);
      res.status(200).json(cmpApplication);
    } catch (error) {
      next(error);
    }
  };

  const updateApplication = async (req, res, next) => {
    try {
      const { cmpApplicationId } = req.params;
      const {
        name, cmpApiKeyId, applicationId, privateKey,
      } = req.body;

      const changes = {};

      if (name && name !== '') {
        changes.name = name;
      }

      if (cmpApiKeyId && cmpApiKeyId !== '') {
        changes.cmpApiKeyId = cmpApiKeyId;
      }

      if (applicationId && applicationId !== '') {
        changes.applicationId = applicationId;
      }

      if (privateKey && privateKey !== '') {
        changes.privateKey = privateKey;
      }

      const { CmpApplication } = container.persistenceService;
      const cmpApplication = await CmpApplication.updateApplication(
        cmpApplicationId, null, changes,
      );
      res.status(200).json(cmpApplication);
    } catch (error) {
      next(error);
    }
  };

  const deleteApplication = async (req, res, next) => {
    try {
      const { cmpApplicationId } = req.params;
      const { CmpApplication } = container.persistenceService;
      const cmpApplication = await CmpApplication.deleteApplication(cmpApplicationId);
      res.status(200).json(cmpApplication);
    } catch (error) {
      next(error);
    }
  };

  return {
    setWebhook,

    listAllApplications,
    listMyApplications,
    deleteAllApplications,

    createApplication,
    readApplication,
    readMyApplication,
    updateApplication,
    deleteApplication,
  };
};
