export default (container) => {
  const { L } = container.defaultLogger('User Model Accessor');
  const mapUser = (user, excludePassword = true) => {
    const mappedUser = Object.assign({}, user);

    if (excludePassword) {
      delete mappedUser.passwordHash;
      delete mappedUser.passwordSalt;
    }

    return mappedUser;
  };

  const listUsers = async (excludePassword = true) => {
    try {
      const { User } = container.databaseService.models;
      const users = await User.findAll({
        where: {
          deleted: false,
        },
      });

      const mappedUser = users.map(rawUser => rawUser.dataValues)
        .map(user => mapUser(user, excludePassword));
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
      });

      const jsonUser = rawUser.dataValues;
      const mappedUser = mapUser(jsonUser, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readUser = async (userId, excludePassword = true) => {
    try {
      const { User } = container.databaseService.models;
      const rawUser = await User.findOne({
        id: userId,
      });

      const jsonUser = rawUser.dataValues;
      const mappedUser = mapUser(jsonUser, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateUser = async (userId, changes, excludePassword = true) => {
    try {
      const { User } = container.databaseService.models;

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
      });

      const jsonUser = user.dataValues;
      const mappedUser = mapUser(jsonUser, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteUser = async (userId, excludePassword = true) => {
    try {
      const { User } = container.databaseService.models;

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
      });

      const jsonUser = user.dataValues;
      const mappedUser = mapUser(jsonUser, excludePassword);
      return Promise.resolve(mappedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findUsers = async (criteria, excludePassword = true) => {
    try {
      const { User } = container.databaseService.models;

      const user = await User.findAll({
        where: criteria,
      });

      const jsonUser = user.dataValues;
      const mappedUser = mapUser(jsonUser, excludePassword);
      return Promise.resolve(mappedUser);
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
