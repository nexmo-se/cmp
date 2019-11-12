export default (container) => {
  const { L } = container.defaultLogger('User Model Accessor');

  const getById = async (userId, excludePassword = true, excludeDeleted = true) => {
    try {
      const { User, UserRole } = container.databaseService.models;
      const query = {
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
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawUser = await User.findOne(query);
      if (rawUser == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const userRole = mapUser(rawUser, excludePassword);
      return Promise.resolve(userRole);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludePassword = true, excludeDeleted = true) => {
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

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawUsers = await User.findAll(query);
      const users = rawUsers.map(user => mapUser(user, excludePassword));
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludePassword = true, excludeDeleted = true) => {
    try {
      const users = await getByCriteria(criteria, excludePassword, excludeDeleted);
      if (users == null || users.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const user = users[0];
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (userId, changes, excludePassword = true, excludeDeleted = true) => {
    try {
      const { User } = container.databaseService.models;
      const query = {
        where: {
          id: userId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await User.update(changes, query);
      L.debug('User Update Result', result);

      const user = await getById(userId, excludePassword, excludeDeleted);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludePassword = true, excludeDeleted = true,
  ) => {
    try {
      const { User } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await User.update(changes, query);
      L.debug('User Update Result', result);

      const users = await getByCriteria(criteria, excludePassword, excludeDeleted);
      return Promise.resolve(users);
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
      const users = await getByCriteria({}, excludePassword, true);
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
      const user = await getById(userId, excludePassword, false);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUser = async (userId, changes = {}, excludePassword = true) => {
    try {
      const user = await updateById(userId, changes, excludePassword, true);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUsers = async (criteria = {}, changes = {}, excludePassword = true) => {
    try {
      const users = await updateByCriteria(criteria, changes, excludePassword, true);
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUser = async (userId, excludePassword = true) => {
    try {
      const changes = { deleted: true };
      const user = await updateById(userId, changes, excludePassword, true);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUsers = async (criteria = {}, excludePassword = true) => {
    try {
      const changes = { deleted: true };
      const users = await updateByCriteria(criteria, changes, excludePassword, true);
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUser = async (criteria = {}, excludePassword = true, excludeDeleted = true) => {
    try {
      const user = await getOneByCriteria(criteria, excludePassword, excludeDeleted);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUsers = async (criteria = {}, excludePassword = true, excludeDeleted = true) => {
    try {
      const users = await getByCriteria(criteria, excludePassword, excludeDeleted);
      return Promise.resolve(users);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listUsers,

    createUser,
    readUser,

    updateUser,
    updateUsers,

    deleteUser,
    deleteUsers,

    findUser,
    findUsers,
  };
};
