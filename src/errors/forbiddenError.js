export default class ForbiddenError extends Error {
  constructor(message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }

    this.name = 'ForbiddenError';
    this.status = 403;
  }
}
