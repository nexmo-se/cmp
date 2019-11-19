export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Controller');

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
      const { CmpApplication } = container.persistenceService;
      const cmpApplications = await CmpApplication.listApplications();
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

      const cmpApiKey = await CmpApplication.createApplication(
        name, cmpApiKeyId, applicationId, privateKey,
      );
      res.status(200).json(cmpApiKey);
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
      const { cmpApplicationId } = req.params;
      const { CmpApplication } = container.persistenceService;

      const cmpApplication = await CmpApplication.readApplication(cmpApplicationId);
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
        cmpApplicationId, changes,
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
