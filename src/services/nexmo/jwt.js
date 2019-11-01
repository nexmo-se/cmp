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

  const getSystemJwt = (userNexmoIni) => {
    const applicationId = userNexmoIni.app_id;
    const privateKeyPath = userNexmoIni.keyfile;
    const jwt = container.nexmo.generateJwt(privateKeyPath, {
      application_id: applicationId,
    });

    return jwt;
  };

  const getUserJwt = (username, userNexmoIni) => {
    const applicationId = userNexmoIni.app_id;
    const privateKeyPath = userNexmoIni.keyfile;
    const expiry = new Date().getTime() + 86400;

    const jwt = container.nexmo.generateJwt(privateKeyPath, {
      application_id: applicationId,
      sub: username,
      exp: expiry,
      acl,
    });

    return jwt;
  };

  return {
    getUserJwt,
    getSystemJwt,
  };
};
