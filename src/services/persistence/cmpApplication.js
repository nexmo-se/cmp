export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Persistence Accessor');

  const listApplications = async () => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.listApplications();
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
  ) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.createApplication(
        name,
        cmpApiKeyId,
        applicationId,
        privateKey,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApplication = async (cmpApplicationId) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.readApplication(cmpApplicationId);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (cmpApplicationId, changes) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.updateApplication(
        cmpApplicationId, changes,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, changes) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.updateApplications(criteria, changes);
      return Promise.resolve(cmpApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (cmpApplicationId) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.deleteApplication(cmpApplicationId);
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.deleteApplications(criteria);
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
