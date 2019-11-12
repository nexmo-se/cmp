export default (container) => {
  const { L } = container.defaultLogger('UserRole Model Accessor');

  const getById = async (userRoleId, excludeDeleted = true) => {
    try {
      const { UserRole } = container.databaseService.models;
      const query = {
        where: {
          id: userRoleId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawUserRole = await UserRole.findOne(query);
      if (rawUserRole == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const userRole = mapUserRole(rawUserRole);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const { UserRole } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawUserRoles = await UserRole.findAll(query);
      const userRoles = rawUserRoles.map(mapUserRole);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const userRoles = await getByCriteria(criteria, excludeDeleted);
      if (userRoles == null || userRoles.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const userRole = userRoles[0];
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (userRoleId, changes = {}, excludeDeleted = true) => {
    try {
      const { UserRole } = container.databaseService.models;
      const query = {
        where: {
          id: userRoleId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await UserRole.update(changes, query);
      L.debug('UserRole Update Result', result);

      const userRole = await getById(userRoleId, excludeDeleted);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (criteria = {}, changes = {}, excludeDeleted = true) => {
    try {
      const { UserRole } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await UserRole.update(changes, query);
      L.debug('UserRole Update Result', result);

      const userRoles = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapUserRole = (userRole) => {
    const mappedUserRole = userRole.dataValues;

    delete mappedUserRole.deleted;
    delete mappedUserRole.createdAt;
    delete mappedUserRole.updatedAt;

    return mappedUserRole;
  };

  const listUserRoles = async () => {
    try {
      const userRoles = await getByCriteria({}, true);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createUserRole = async (
    user,
    role,
  ) => {
    try {
      const { UserRole } = container.databaseService.models;
      const rawUserRole = await UserRole.create({
        id: container.uuid(),
        user,
        role,
        deleted: false,
      });

      const userRole = mapUserRole(rawUserRole);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readUserRole = async (userRoleId) => {
    try {
      const userRole = await getById(userRoleId, false);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUserRole = async (userRoleId, changes) => {
    try {
      const userRole = await updateById(userRoleId, changes, true);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUserRoles = async (criteria, changes) => {
    try {
      const userRoles = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUserRole = async (userRoleId) => {
    try {
      const changes = { deleted: true };
      const userRole = await updateById(userRoleId, changes, true);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUserRoles = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const userRoles = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUserRole = async (criteria = {}) => {
    try {
      const userRole = await getOneByCriteria(criteria, true);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUserRoles = async (criteria = {}) => {
    try {
      const userRoles = await getByCriteria(criteria, true);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listUserRoles,

    createUserRole,
    readUserRole,

    updateUserRole,
    updateUserRoles,

    deleteUserRole,
    deleteUserRoles,

    findUserRole,
    findUserRoles,
  };
};
