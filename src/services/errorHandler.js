export default (container) => {
  const isDevelopment = container.config.environment === 'development';
  const { L } = container.defaultLogger('Router - ErrorHandler');

  const handleError = (err, req, res, next) => {
    L.error(err);
    const response = {
      code: err.status || 500,
      message: err.message || container.httpStatus[err.status],
      errors: err.errors,
      stack: err.stack,
    };
    L.warn(JSON.stringify(response, null, 2));

    if (!isDevelopment) {
      // Non-development environment should not save stack
      delete response.stack;
    }

    res.status(err.status || 500);
    res.json(response);
  };

  return {
    handleError,
  };
};
