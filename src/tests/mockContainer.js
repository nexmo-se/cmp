import AuthenticationError from '../errors/authError';
import ForbiddenError from '../errors/forbiddenError';
import NotFoundError from '../errors/notFoundError';

export default (log = false) => ({
  AuthenticationError,
  ForbiddenError,
  NotFoundError,

  defaultLogger: log ? () => ({
    L: {
      debug: console.debug,
      info: console.info,
      warn: console.warn,
      error: console.error,
    },
  }) : () => ({
    L: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
  }),
});
