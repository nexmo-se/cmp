import AuthenticationError from '../errors/authError';
import ForbiddenError from '../errors/forbiddenError';
import NotFoundError from '../errors/notFoundError';

export default () => ({
  AuthenticationError,
  ForbiddenError,
  NotFoundError,

  defaultLogger: () => ({
    L: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
  }),
});
