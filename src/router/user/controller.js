export default (container) => {
  const { L } = container.defaultLogger('User Controller');

  const listUsers = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllUsers = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const readMyUser = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const updateMyUser = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const changeMyUserPassword = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const readUser = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const updateUser = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const deleteUser = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const changeUserPassword = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const addUserRole = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const removeUserRole = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  return {
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
