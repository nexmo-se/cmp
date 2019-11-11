export default (container) => {
  const { L } = container.defaultLogger('Auth Controller');

  const login = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  const register = async (req, res, next) => {
    try {
      res.status(200).json([]);
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    register,
  };
};
