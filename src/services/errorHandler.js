export default (container) => {
  const isDevelopment = container.config.environment === 'development';
  const { L } = container.defaultLogger('Errohandler - Service');
  const handleGeneric = (err, req, res, next) => {
    console.error(err);
    const response = {
      code: err.status || 500,
      message: err.message || container.httpStatus[err.status],
      errors: err.errors,
      stack: err.stack,
    };

    if (!isDevelopment) {
      // Non-development environment should not save stack
      delete response.stack;
    }

    res.status(err.status);
    res.json(response);
  };

  const handleNotFound = (err, req, res, next) => {
    L.debug(err);
    if (err.status === 404 || err.type === 'not_found') {
      res.status(404).send('Not found');
      return;
    }

    next();
  };

  return {
    generic: handleGeneric,
    notFound: handleNotFound,
  };
};
