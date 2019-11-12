export default (container) => {
  const { L } = container.defaultLogger('User Model Accessor');
  const mapUserRole = (userRole) => {
    const mappedUserRole = userRole.dataValues;

    delete mappedUserRole.deleted;
    delete mappedUserRole.createdAt;
    delete mappedUserRole.updatedAt;

    return mappedUserRole;
  };
  const mapUser = (user, excludePassword = true) => {
    const mappedUser = Object.assign({}, user.dataValues);

    mappedUser.roles = (mappedUser.roles || []).map(mapUserRole);

    if (excludePassword) {
      delete mappedUser.passwordHash;
      delete mappedUser.passwordSalt;
    }

    delete mappedUser.deleted;
    delete mappedUser.createdAt;
    delete mappedUser.updatedAt;

    return mappedUser;
  };

  const listUsers = async (excludePassword = true) => {
    try {
      const { User, UserRole } = container.databaseService.models;
      const users = await User.findAll({
        where: {
          deleted: false,
        },
        include: [
          {
            model: UserRole,
            as: 'roles',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      });

      const mappedUser = users.map(user => mapUser(user, excludePassword));
      return Promise.resolve(mappedUser);
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
      const { User } = container.databaseService.models;
      const rawUser = await User.create({
        id: container.uuid(),
        username,
        passwordHash,
        passwordSalt,
        firstName,
        lastName,
        deleted: false,
      });

      const mappedUser = mapUser(rawUser, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readUser = async (userId, excludePassword = true) => {
    try {
      const { User, UserRole } = container.databaseService.models;
      const rawUser = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: UserRole,
            as: 'roles',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      });

      const mappedUser = mapUser(rawUser, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUser = async (userId, changes, excludePassword = true) => {
    try {
      const { User, UserRole } = container.databaseService.models;

      const query = {
        where: {
          id: userId,
        },
      };
      const result = await User.update(changes, query);
      L.debug('User Update Result', result);

      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: UserRole,
            as: 'roles',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      });

      const mappedUser = mapUser(user, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUser = async (userId, excludePassword = true) => {
    try {
      const { User, UserRole } = container.databaseService.models;

      const changes = {
        deleted: true,
      };
      const query = {
        where: {
          id: userId,
        },
      };
      const result = await User.update(changes, query);
      L.debug('User Delete Result', result);

      const user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: UserRole,
            as: 'roles',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      });

      const mappedUser = mapUser(user, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUsers = async (criteria, excludePassword = true) => {
    try {
      const { User, UserRole } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: UserRole,
            as: 'roles',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };
      query.where.deleted = false;
      const users = await User.findAll(query);

      if (users.length === 0) {
        return Promise.resolve([]);
      }
      const mappedUsers = users.map(user => mapUser(user, excludePassword));
      return Promise.resolve(mappedUsers);
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

    findUsers,
  };
};
