export default (container) => {
  const { L } = container.defaultLogger('AuthService');

  const checkUsername = async (username) => {
    try {
      const usernameCorrect = username === container.config.user.username;
      if (!usernameCorrect) {
        throw new container.AuthenticationError('Invalid Username or Password');
      }

      return Promise.resolve(usernameCorrect);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const checkPassword = async (password, hash, salt) => {
    try {
      const currentHash = await container.hashService.hash(password, salt);
      const passwordCorrect = currentHash === hash;
      if (!passwordCorrect) {
        throw new container.AuthenticationError('Invalid Username or Password');
      }
      return Promise.resolve(passwordCorrect);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const authenticate = async (username, password) => {
    try {
      // Config
      const { passwordHash, passwordSalt } = container.config.user;
      const decodedPasswordHash = await container.base64Service.decode(passwordHash);
      const decodedPasswordSalt = await container.base64Service.decode(passwordSalt);

      // Check Username
      await checkUsername(username);

      // Check Password
      await checkPassword(password, decodedPasswordHash, decodedPasswordSalt);

      return Promise.resolve();
    } catch (error) {
      if (error.name === container.AuthenticationError.name) {
        L.warn('User Authentication Failed');
      }
      return Promise.reject(error);
    }
  };

  return {
    authenticate,
  };
};
