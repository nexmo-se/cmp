export default (container) => {
  const checkAuthentication = async (req, res, next) => {
    try {
      const authValue = req.headers.Authorization || req.headers.authorization;
      if (authValue == null || authValue === 'empty') {
        throw new container.AuthenticationError('Invalid Authorization Header Value');
      }

      if (authValue.indexOf('Basic ') !== 0) {
        throw new container.AuthenticationError('Invalid Authorization Header Value');
      }

      const b64Value = authValue.slice('Basic '.length);
      const b64DecodedValue = await container.base64Service.decode(b64Value);
      const decodedValues = b64DecodedValue.split(':');

      if (decodedValues.length < 2) {
        throw new container.AuthenticationError('Invalid Authorization Header Value');
      }

      const username = decodedValues[0];
      const password = decodedValues[1];

      await container.authService.authenticate(username, password);
      next();
    } catch (error) {
      next(error);
    }
  };

  return {
    checkAuthentication,
  };
};
