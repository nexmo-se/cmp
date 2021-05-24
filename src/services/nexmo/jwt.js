/**
 * JWT
 * Generate JWT token for Nexmo Application
 */

export default (container) => {
  const acl = {
    paths: {
      '/v1/users/**': {},
      '/v1/conversations/**': {},
      '/v1/sessions/**': {},
      '/v1/devices/**': {},
      '/v1/image/**': {},
      '/v3/media/**': {},
      '/v1/applications/**': {},
      '/v1/push/**': {},
      '/v1/knocking/**': {},
    },
  };

  const getSystemJwt = async (applicationId, privateKey) => {
    try {
      const decodedPrivateKey = await container.base64Service.decode(privateKey);
      const privateKeyBuffer = Buffer.from(decodedPrivateKey);
      const jwt = container.nexmo.generateJwt(privateKeyBuffer, {
        application_id: applicationId,
      });

      return Promise.resolve(jwt);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getUserJwt = async (username, applicationId, privateKey) => {
    try {
      const expiry = new Date().getTime() + 86400;
      const decodedPrivateKey = await container.base64Service.decode(privateKey);
      const privateKeyBuffer = Buffer.from(decodedPrivateKey);
      const jwt = container.nexmo.generateJwt(privateKeyBuffer, {
        application_id: applicationId,
        sub: username,
        exp: expiry,
        acl,
      });

      return Promise.resolve(jwt);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getUserJwt, // Not in use, only for In-App usage
    getSystemJwt, // Server use, for API calls
  };
};
