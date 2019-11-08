export default (container) => {
  const { L } = container.defaultLogger('User Controller');
  const getUserId = (req) => {
    const nexmoIni = container.utils.getIniStuff();
    const bearerToken = container.utils.getBearerToken(req);
    const userId = container.utils.getIdFromJWT(nexmoIni, bearerToken) || 'demo';
    return userId;
  };

  const sample = async (req, res, next) => {
    try {
      L.debug('Demo Sample');

      // Get User Nexmo Ini
      const userId = getUserId(req);
      const userNexmoIni = container.utils.getNexmo(userId);

      L.debug('data', userNexmoIni);
      res.status(200).json(userNexmoIni);
    } catch (error) {
      next(error);
    }
  };

  return {
    sample,
  };
};
