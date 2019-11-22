export default class BadRequestError extends Error {
  constructor(message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }

    this.name = 'BadRequestError';
    this.status = 400;
  }
}
