export default (container) => {
  const { L } = container.defaultLogger('Nexmo Application Persistence Accessor');

  const listApplications = async () => {
    try {
      const { NexmoApplication } = container.databaseService.accessors;
      const nexmoApplications = await NexmoApplication.listApplications();
      return Promise.resolve(nexmoApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createApplication = async (
    name,
    apiKey,
    applicationId,
    privateKey,
  ) => {
    try {
      const { NexmoApplication } = container.databaseService.accessors;
      const nexmoApplication = await NexmoApplication.createApplication(
        name,
        apiKey,
        applicationId,
        privateKey,
      );
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readApplication = async (nexmoApplicationId) => {
    try {
      const { NexmoApplication } = container.databaseService.accessors;
      const nexmoApplication = await NexmoApplication.readApplication(nexmoApplicationId);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplication = async (nexmoApplicationId, changes) => {
    try {
      const { NexmoApplication } = container.databaseService.accessors;
      const nexmoApplication = await NexmoApplication.updateApplication(
        nexmoApplicationId, changes,
      );
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (criteria, changes) => {
    try {
      const { NexmoApplication } = container.databaseService.accessors;
      const nexmoApplications = await NexmoApplication.updateApplications(criteria, changes);
      return Promise.resolve(nexmoApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (nexmoApplicationId) => {
    try {
      const { NexmoApplication } = container.databaseService.accessors;
      const nexmoApplication = await NexmoApplication.deleteApplication(nexmoApplicationId);
      return Promise.resolve(nexmoApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (criteria) => {
    try {
      const { NexmoApplication } = container.databaseService.accessors;
      const nexmoApplications = await NexmoApplication.deleteApplications(criteria);
      return Promise.resolve(nexmoApplications);
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
