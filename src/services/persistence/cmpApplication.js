export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Persistence Accessor');

  const listApplications = async (userId, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.listApplications(userId, excludeSecret);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createApplication = async (
    name,
    cmpApiKeyId,
    applicationId,
    privateKey,
    excludeSecret = true,
  ) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.createApplication(
        name,
        cmpApiKeyId,
        applicationId,
        privateKey,
        excludeSecret,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApplication = async (cmpApplicationId, userId, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.readApplication(
        cmpApplicationId, userId, excludeSecret,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (cmpApplicationId, userId, changes, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.updateApplication(
        cmpApplicationId, userId, changes, excludeSecret,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, userId, changes, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.updateApplications(
        criteria, userId, changes, excludeSecret,
      );
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (cmpApplicationId, userId, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.deleteApplication(
        cmpApplicationId, userId, excludeSecret,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria, userId, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.deleteApplications(
        criteria, userId, excludeSecret,
      );
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listApplications,

    createApplication,
    readApplication,

    updateApplication,
    updateApplications,

    deleteApplication,
    deleteApplications,
  };
};
