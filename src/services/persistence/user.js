export default (container) => {
  const { L } = container.defaultLogger('User Persistence Accessor');

  const listUsers = async (excludePassword = true) => {
    try {
      const { User } = container.databaseService.accessors;
      const users = await User.listUsers(excludePassword);
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createUser = async (
    username,
    passwordHash,
    passwordSalt,
    firstName,
    lastName,
    excludePassword = true,
  ) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.createUser(
        username,
        passwordHash,
        passwordSalt,
        firstName,
        lastName,
        excludePassword,
      );
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readUser = async (userId, excludePassword = true) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.readUser(userId, excludePassword);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUser = async (userId, changes, excludePassword = true) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.updateUser(userId, changes, excludePassword);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUser = async (userId, excludePassword = true) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.deleteUser(userId, excludePassword);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const listUserRoles = async (userId) => {
    try {
      const { UserRole } = container.databaseService.accessors;
      const userRoles = await UserRole.findUserRoles({ user: userId });
      return Promise.resolve(userRoles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const assignRoleToUser = async (userId, role) => {
    try {
      const { UserRole } = container.databaseService.accessors;
      const userRoles = await UserRole.findUserRoles({
        user: userId,
      });

      let roleExists = false;
      for (let i = 0; i < userRoles.length; i += 1) {
        const userRole = userRoles[i];
        if (userRole.role === role) {
          roleExists = true;
          break;
        }
      }

      if (roleExists) {
        L.debug('User Role has already existed, will not add new User Role');
      } else {
        const newUserRole = await UserRole.createUserRole(userId, role);
        L.debug('New User Role Created', newUserRole);
      }

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deassignRoleFromUser = async (userId, role) => {
    try {
      const { UserRole } = container.databaseService.accessors;
      const userRoles = await UserRole.findUserRoles({
        user: userId,
      });

      let userRoleId = null;
      for (let i = 0; i < userRoles.length; i += 1) {
        const userRole = userRoles[i];
        if (userRole.role === role) {
          userRoleId = userRole.id;
          break;
        }
      }

      if (userRoleId == null) {
        L.debug('User Role does not exist, nothing to delete');
      } else {
        const deletedUserRole = await UserRole.deleteUserRole(userRoleId);
        L.debug('User Role Deleted', deletedUserRole);
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listUsers,

    createUser,
    readUser,
    updateUser,
    deleteUser,

    listUserRoles,
    assignRoleToUser,
    deassignRoleFromUser,
  };
};