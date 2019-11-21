export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Persistence Accessor');

  const listApplications = async (excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.listApplications(excludeSecret);
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

  const readApplication = async (cmpApplicationId, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.readApplication(cmpApplicationId, excludeSecret);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (cmpApplicationId, changes, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.updateApplication(
        cmpApplicationId, changes, excludeSecret,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, changes, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.updateApplications(criteria, changes, excludeSecret);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (cmpApplicationId, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.deleteApplication(cmpApplicationId, excludeSecret);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.deleteApplications(criteria, excludeSecret);
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
