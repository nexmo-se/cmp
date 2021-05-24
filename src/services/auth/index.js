/**
 * Authentication Token Checker Service
 * To actually check the provided JWT token against database
 */

export default (container) => {
  const { L } = container.defaultLogger('AuthService');

  const authenticateBearer = async (token) => {
    try {
      if (token == null || token === '') {
        L.warn('Null or Empty Token');
        throw new container.AuthenticationError('Invalid token');
      }

      const payload = await container.jwtService.decode(token);
      if (payload == null) {
        L.warn('Null Token Payload');
        throw new container.AuthenticationError('Invalid token');
      }

      const { userId } = payload;
      if (userId == null || userId === '') {
        L.warn('Null or Empty User Id in Token Payload');
        throw new container.AuthenticationError('Invalid token');
      }

      const { User } = container.persistenceService;
      const user = await User.readUser(userId, true);
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const authenticateBasic = async (username, password) => {
    try {
      const { User } = container.persistenceService;
      const user = await User.getUserByUsername(username, false, true);
      const { passwordHash, passwordSalt } = user;

      const currentHash = await container.hashService.hash(password, passwordSalt);
      if (currentHash !== passwordHash) {
        L.warn('Password hash mismatch');
        throw new container.AuthenticationError('Invalid Username or Password');
      }

      delete user.passwordHash;
      delete user.passwordSalt;

      return Promise.resolve(user);
    } catch (error) {
      if (error.name === container.AuthenticationError.name) {
        L.warn('User Authentication Failed');
      }
      return Promise.reject(error);
    }
  };

  return {
    authenticateBearer, // Check Bearer token against database
    authenticateBasic, // Check Basic token against database
  };
};
