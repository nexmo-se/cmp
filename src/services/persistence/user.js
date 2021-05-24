/**
 * Persistence Service for CMP Users
 * Create, Read, Update, Delete and List Users
 */

 export default (container) => {
  const { L } = container.defaultLogger('User Persistence Accessor');

  const listUsers = async (excludePassword = true, options = {}) => {
    try {
      const { User } = container.databaseService.accessors;
      const users = await User.listUsers(excludePassword, options);
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUser = async (criteria = {}, excludePassword = true) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.findUser(criteria, excludePassword, true);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUsers = async (criteria = {}, excludePassword = true, options = {}) => {
    try {
      const { User } = container.databaseService.accessors;
      const users = await User.findUsers(criteria, excludePassword, true, options);
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getUserByUsername = async (username, excludePassword = true, excludeDeleted = true) => {
    try {
      const { User } = container.databaseService.accessors;
      const criteria = { username };
      const users = await User.findUsers(criteria, excludePassword, excludeDeleted, {});
      if (users == null || users.length === 0) {
        return Promise.resolve(null);
      }

      return Promise.resolve(users[0]);
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

  const updateUser = async (userId, changes, excludePassword = true, options = {}) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.updateUser(userId, changes, excludePassword, options);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUsers = async (criteria, changes, excludePassword = true, options = {}) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.updateUsers(criteria, changes, excludePassword, options);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUser = async (userId, excludePassword = true, options = { noGet: true }) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.deleteUser(userId, excludePassword, options);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUsers = async (criteria, excludePassword = true, options = { noGet: true }) => {
    try {
      const { User } = container.databaseService.accessors;
      const user = await User.deleteUsers(criteria, excludePassword, options);
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
        L.trace('User Role has already existed, will not add new User Role');
      } else {
        const newUserRole = await UserRole.createUserRole(userId, role);
        L.trace('New User Role Created', newUserRole);
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
        L.trace('User Role does not exist, nothing to delete');
      } else {
        const deletedUserRole = await UserRole.deleteUserRole(userRoleId);
        L.trace('User Role Deleted', deletedUserRole);
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listUsers,
    getUserByUsername,

    createUser,
    readUser,

    updateUser,
    updateUsers,

    deleteUser,
    deleteUsers,

    findUser,
    findUsers,

    listUserRoles,
    assignRoleToUser,
    deassignRoleFromUser,
  };
};
