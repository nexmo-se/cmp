export default (container) => {
  const { L } = container.defaultLogger('User Controller');

  const listAllApplications = async (req, res, next) => {
    try {
      const { NexmoApplication } = container.persistenceService;
      const nexmoApplications = await NexmoApplication.listApplications();
      res.status(200).json(nexmoApplications);
    } catch (error) {
      next(error);
    }
  };

  const listMyApplications = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Applications');
      const { NexmoApplication } = container.persistenceService;
      const nexmoApplications = await NexmoApplication.listApplications();
      res.status(200).json(nexmoApplications);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllApplications = async (req, res, next) => {
    try {
      const { NexmoApplication } = container.persistenceService;
      const nexmoApplications = await NexmoApplication.deleteApplications({});
      res.status(200).json(nexmoApplications);
    } catch (error) {
      next(error);
    }
  };

  const createApplication = async (req, res, next) => {
    try {
      const {
        name, apiKeyId, applicationId, privateKey,
      } = req.body;
      const { NexmoApplication } = container.persistenceService;

      const nexmoApiKey = await NexmoApplication.createApplication(
        name, apiKeyId, applicationId, privateKey,
      );
      res.status(200).json(nexmoApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readApplication = async (req, res, next) => {
    try {
      const { nexmoApplicationId } = req.params;
      const { NexmoApplication } = container.persistenceService;

      const nexmoApplication = await NexmoApplication.readApplication(nexmoApplicationId);
      res.status(200).json(nexmoApplication);
    } catch (error) {
      next(error);
    }
  };

  const readMyApplication = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Applications');
      const { nexmoApplicationId } = req.params;
      const { NexmoApplication } = container.persistenceService;

      const nexmoApplication = await NexmoApplication.readApplication(nexmoApplicationId);
      res.status(200).json(nexmoApplication);
    } catch (error) {
      next(error);
    }
  };

  const updateApplication = async (req, res, next) => {
    try {
      const { nexmoApplicationId } = req.params;
      const {
        name, apiKeyId, applicationId, privateKey,
      } = req.body;

      const changes = {};

      if (name && name !== '') {
        changes.name = name;
      }

      if (apiKeyId && apiKeyId !== '') {
        changes.apiKeyId = apiKeyId;
      }

      if (applicationId && applicationId !== '') {
        changes.applicationId = applicationId;
      }

      if (privateKey && privateKey !== '') {
        changes.privateKey = privateKey;
      }

      const { NexmoApplication } = container.persistenceService;
      const nexmoApplication = await NexmoApplication.updateApplication(
        nexmoApplicationId, changes,
      );
      res.status(200).json(nexmoApplication);
    } catch (error) {
      next(error);
    }
  };

  const deleteApplication = async (req, res, next) => {
    try {
      const { nexmoApplicationId } = req.params;
      const { NexmoApplication } = container.persistenceService;
      const nexmoApplication = await NexmoApplication.deleteApplication(nexmoApplicationId);
      res.status(200).json(nexmoApplication);
    } catch (error) {
      next(error);
    }
  };

  return {
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
