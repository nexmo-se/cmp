export default (container) => {
  const { L } = container.defaultLogger('UserRole Model Accessor');
  const mapUserRole = (userRole) => {
    const mappedUserRole = userRole.dataValues;

    delete mappedUserRole.deleted;
    delete mappedUserRole.createdAt;
    delete mappedUserRole.updatedAt;

    return mappedUserRole;
  };

  const listUserRoles = async () => {
    try {
      const { UserRole } = container.databaseService.models;
      const userRoles = await UserRole.findAll({
        where: {
          deleted: false,
        },
      });

      const mappedUserRoles = userRoles.map(mapUserRole);
      return Promise.resolve(mappedUserRoles);
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
      const { UserRole } = container.databaseService.models;
      const rawUserRole = await UserRole.findOne({
        id: userRoleId,
      });

      const userRole = mapUserRole(rawUserRole);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUserRole = async (userRoleId, changes) => {
    try {
      const { UserRole } = container.databaseService.models;

      const query = {
        where: {
          id: userRoleId,
        },
      };
      const result = await UserRole.update(changes, query);
      L.debug('UserRole Update Result', result);

      const rawUserRole = await UserRole.findOne({
        where: {
          id: userRoleId,
        },
      });

      const userRole = mapUserRole(rawUserRole);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUserRole = async (userRoleId) => {
    try {
      const { UserRole } = container.databaseService.models;

      const changes = {
        deleted: true,
      };
      const query = {
        where: {
          id: userRoleId,
        },
      };
      const result = await UserRole.update(changes, query);
      L.debug('UserRole Delete Result', result);

      const rawUserRole = await UserRole.findOne({
        where: {
          id: userRoleId,
        },
      });

      const userRole = mapUserRole(rawUserRole);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUserRole = async (criteria) => {
    try {
      const { UserRole } = container.databaseService.models;

      const rawUserRole = await UserRole.findOne({
        where: criteria,
      });

      const userRole = mapUserRole(rawUserRole);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUserRoles = async (criteria) => {
    try {
      const { UserRole } = container.databaseService.models;

      const rawUserRoles = await UserRole.findAll({
        where: criteria,
      });

      const userRoles = rawUserRoles.map(mapUserRole);
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
    deleteUserRole,

    findUserRole,
    findUserRoles,
  };
};
