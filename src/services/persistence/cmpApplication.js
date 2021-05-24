/**
 * Persistence Service for CMP Applications
 * Create, Read, Update, Delete and List Applications
 */

export default (container) => {
  const { L } = container.defaultLogger('Cmp Application Persistence Accessor');

  const filterApplications = (userId, cmpApplications) => cmpApplications
    .filter((cmpApplication) => {
      if (userId == null) {
        return true;
      }

      let found = false;

      // Check Application Users
      L.trace('Check Application Users');
      if (cmpApplication.users) {
        for (let i = 0; i < cmpApplication.users.length; i += 1) {
          const user = cmpApplication.users[i];
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      // Check Api Key Users
      L.trace('Check Api Key Users');
      if (cmpApplication.cmpApiKey && cmpApplication.cmpApiKey.users) {
        for (let i = 0; i < cmpApplication.cmpApiKey.users.length; i += 1) {
          const user = cmpApplication.cmpApiKey.users[i];
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      return found;
    });

  const listApplications = async (userId, excludeSecret = true, options = {}) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.listApplications(userId, excludeSecret, options);
      const filteredApplications = filterApplications(userId, cmpApplications);
      return Promise.resolve(filteredApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplication = async (userId, criteria = {}, excludeSecret = true) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.findApplication(
        criteria, userId, excludeSecret, true,
      );
      const filteredApplications = filterApplications(userId, [cmpApplications]);
      if (filteredApplications.length > 0) {
        return Promise.resolve(filteredApplications[0]);
      }
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findApplications = async (userId, criteria = {}, excludeSecret = true, options = {}) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.findApplications(
        criteria, userId, excludeSecret, true, options,
      );
      const filteredApplications = filterApplications(userId, cmpApplications);
      return Promise.resolve(filteredApplications);
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

  const updateApplication = async (
    cmpApplicationId, userId, changes, excludeSecret = true, options = {}) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.updateApplication(
        cmpApplicationId, userId, changes, excludeSecret, options,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateApplications = async (
    criteria, userId, changes, excludeSecret = true, options = {},
  ) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.updateApplications(
        criteria, userId, changes, excludeSecret, options,
      );
      const filteredApplications = filterApplications(userId, cmpApplications);
      return Promise.resolve(filteredApplications);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplication = async (
    cmpApplicationId, userId, excludeSecret = true, options = { noGet: true },
  ) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplication = await CmpApplication.deleteApplication(
        cmpApplicationId, userId, excludeSecret, options,
      );
      return Promise.resolve(cmpApplication);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteApplications = async (
    criteria, userId, excludeSecret = true, options = { noGet: true },
  ) => {
    try {
      const { CmpApplication } = container.databaseService.accessors;
      const cmpApplications = await CmpApplication.deleteApplications(
        criteria, userId, excludeSecret, options,
      );
      const filteredApplications = filterApplications(userId, cmpApplications);
      return Promise.resolve(filteredApplications);
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

    findApplication,
    findApplications,
  };
};
