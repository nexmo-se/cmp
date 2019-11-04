export default class AuthenticationError extends Error {
  constructor(message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }

    this.name = 'AuthenticationError';
    this.status = 401;
  }
}
