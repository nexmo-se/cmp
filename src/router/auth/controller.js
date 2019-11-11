export default (container) => {
  const { L } = container.defaultLogger('Auth Controller');

  const login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const { User } = container.persistenceService;
      const user = await User.getUserByUsername(username, false);

      if (user == null) {
        L.warn('Invalid username');
        throw new container.AuthenticationError('Invalid Username or Password');
      }

      const { passwordHash, passwordSalt } = user;
      const currentHash = await container.hashService.hash(password, passwordSalt);

      if (passwordHash !== currentHash) {
        L.warn('Incorrect password hash');
        throw new container.AuthenticationError('Invalid Username or Password');
      }

      const { id } = user;
      const payload = { userId: id };
      const token = await container.jwtService.encode(payload);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };

  const register = async (req, res, next) => {
    try {
      const {
        username,
        password,
        firstName,
        lastName,
      } = req.body;

      const passwordSalt = await container.hashService.generateSalt();
      const passwordHash = await container.hashService.hash(password, passwordSalt);

      const { User } = container.persistenceService;
      const user = await User.createUser(username, passwordHash, passwordSalt, firstName, lastName);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  return {
    login,
    register,
  };
};
