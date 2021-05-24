/**
 * Authentication Service
 * To check whether the user is logged in, throw Unauthorized 401 if not having valid JWT token
 */

export default (container) => {
  const checkAuthenticationBasic = async (authValue, req) => {
    try {
      const b64Value = authValue.slice('Basic '.length);
      const b64DecodedValue = await container.base64Service.decode(b64Value);
      const decodedValues = b64DecodedValue.split(':');

      if (decodedValues.length < 2) {
        throw new container.AuthenticationError('Invalid Authorization Header Value');
      }

      const username = decodedValues[0];
      const password = decodedValues[1];

      const user = await container.authService.authenticateBasic(username, password);
      req.user = user;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const checkAuthenticationBearer = async (authValue, req) => {
    try {
      const token = authValue.slice('Bearer '.length);
      const user = await container.authService.authenticateBearer(token);
      req.user = user;
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const checkAuthentication = async (req, res, next) => {
    try {
      const authValue = req.headers.Authorization || req.headers.authorization;
      if (authValue == null || authValue === 'empty') {
        throw new container.AuthenticationError('Invalid Authorization Header Value');
      }

      if (authValue.indexOf('Basic ') === 0) {
        await checkAuthenticationBasic(authValue, req);
      } else if (authValue.indexOf('Bearer ') === 0) {
        await checkAuthenticationBearer(authValue, req);
      } else {
        throw new container.AuthenticationError('Invalid Authorization Header Value');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  return {
    checkAuthentication,
  };
};
