import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  router.route('/login')
    .post(
      validate(validator.login),
      controller.login,
    );

  router.route('/register')
    .post(
      validate(validator.register),
      controller.register,
    );

  return router;
};
