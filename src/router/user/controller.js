export default (container) => {
  const { L } = container.defaultLogger('User Controller');

  const listUsers = async (req, res, next) => {
    try {
      const {
        limit, offset,
        username, firstName, lastName,
      } = req.query;
      const criteria = {};
      if (username) {
        criteria.username = username;
      }
      if (firstName) {
        criteria.firstName = firstName;
      }
      if (lastName) {
        criteria.lastName = lastName;
      }
      const options = { limit, offset };
      const { User } = container.persistenceService;
      const users = await User.findUsers(criteria, true, options);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  const findUsers = async (req, res, next) => {
    try {
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        username, firstName, lastName,
      } = req.body;
      const criteria = {};
      if (username) {
        if (typeof username === 'string') {
          criteria.username = {
            [Op.like]: `%${username}%`,
          };
        } else {
          criteria.username = username;
        }
      }
      if (firstName) {
        if (typeof firstName === 'string') {
          criteria.firstName = {
            [Op.like]: `%${firstName}%`,
          };
        } else {
          criteria.firstName = firstName;
        }
      }
      if (lastName) {
        if (typeof lastName === 'string') {
          criteria.lastName = {
            [Op.like]: `%${lastName}%`,
          };
        } else {
          criteria.lastName = lastName;
        }
      }
      const options = { limit, offset };
      const { User } = container.persistenceService;
      const users = await User.findUsers(criteria, true, options);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllUsers = async (req, res, next) => {
    try {
      const { User } = container.persistenceService;
      const users = await User.deleteUsers({}, true);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  const readMyUser = async (req, res, next) => {
    try {
      const { user } = req;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  const updateMyUser = async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = user;
      const { firstName, lastName } = req.body;

      const changes = {};

      if (firstName && firstName !== '') {
        changes.firstName = firstName;
      }

      if (lastName && lastName !== '') {
        changes.lastName = lastName;
      }

      const { User } = container.persistenceService;
      const updatedUser = await User.updateUser(id, changes);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  const changeMyUserPassword = async (req, res, next) => {
    try {
      const { user } = req;
      const { id } = user;
      const { password } = req.body;

      const passwordSalt = await container.hashService.generateSalt();
      const passwordHash = await container.hashService.hash(password, passwordSalt);

      const changes = { passwordHash, passwordSalt };

      const { User } = container.persistenceService;
      const updatedUser = await User.updateUser(id, changes);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  const readUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { User } = container.persistenceService;

      const user = await User.readUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  const updateUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { firstName, lastName } = req.body;

      const changes = {};

      if (firstName && firstName !== '') {
        changes.firstName = firstName;
      }

      if (lastName && lastName !== '') {
        changes.lastName = lastName;
      }

      const { User } = container.persistenceService;
      const updatedUser = await User.updateUser(userId, changes);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  const deleteUser = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { User } = container.persistenceService;
      const user = await User.deleteUser(userId, true);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  const changeUserPassword = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { password } = req.body;

      const passwordSalt = await container.hashService.generateSalt();
      const passwordHash = await container.hashService.hash(password, passwordSalt);

      const changes = { passwordHash, passwordSalt };

      const { User } = container.persistenceService;
      const updatedUser = await User.updateUser(userId, changes);
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  const addUserRole = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const { User } = container.persistenceService;
      await User.assignRoleToUser(userId, role);

      const user = await User.readUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  const removeUserRole = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      const { User } = container.persistenceService;
      await User.deassignRoleFromUser(userId, role);

      const user = await User.readUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  return {
    findUsers,
    listUsers,
    deleteAllUsers,

    readMyUser,
    updateMyUser,
    changeMyUserPassword,

    readUser,
    updateUser,
    deleteUser,
    changeUserPassword,
    addUserRole,
    removeUserRole,
  };
};
