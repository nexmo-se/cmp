export default (container) => {
  const { L } = container.defaultLogger('UserRole Model Accessor');

  const listUserRoles = async () => {
    try {
      const { UserRole } = container.databaseService.models;
      const userRoles = await UserRole.findAll({
        where: {
          deleted: false,
        },
      });

      const mappedUserRoles = userRoles.map(rawUserRole => rawUserRole.dataValues);
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
      });

      const userRole = rawUserRole.dataValues;
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

      const userRole = rawUserRole.dataValues;
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

      const userRole = rawUserRole.dataValues;
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

      const userRole = rawUserRole.dataValues;
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUserRoles = async (criteria) => {
    try {
      const { UserRole } = container.databaseService.models;

      const rawUserRole = await UserRole.findAll({
        where: criteria,
      });

      const userRole = rawUserRole.dataValues;
      return Promise.resolve(userRole);
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

    findUserRoles,
  };
};
