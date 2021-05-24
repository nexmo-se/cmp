/**
 * Accessor Service for CMP User Roles
 * Create, Read, Update, Delete and List User Roles
 */

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
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const userRole = mapUserRole(rawUserRole);
      return Promise.resolve(userRole);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(userRoleId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const { UserRole } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawUserRoles = await UserRole.findAll(query);
      const userRoles = rawUserRoles.map(mapUserRole);
      return Promise.resolve(userRoles);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const userRoles = await getByCriteria(criteria, excludeDeleted, options);
      if (userRoles == null || userRoles.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const userRole = userRoles[0];
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (userRoleId, changes = {}, excludeDeleted = true, options = {}) => {
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
      L.trace('UserRole Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const userRole = await getById(userRoleId, excludeDeleted);
      return Promise.resolve(userRole);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(userRoleId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { UserRole } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await UserRole.update(changes, query);
      L.trace('UserRole Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const userRoles = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(userRoles);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
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

  const listUserRoles = async (options = {}) => {
    try {
      const userRoles = await getByCriteria({}, true, options);
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
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createUserRole(user, role);
      }
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

  const updateUserRole = async (userRoleId, changes, options = {}) => {
    try {
      const userRole = await updateById(userRoleId, changes, true, options);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUserRoles = async (criteria, changes, options = {}) => {
    try {
      const userRoles = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUserRole = async (userRoleId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const userRole = await updateById(userRoleId, changes, true, options);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUserRoles = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const userRoles = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUserRole = async (criteria = {}, excludeDeleted = true) => {
    try {
      const userRole = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUserRoles = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const userRoles = await getByCriteria(criteria, excludeDeleted, options);
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
