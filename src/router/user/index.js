import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  const { authorize } = container.authorizer;
  const { checkAuthentication } = container.authenticator;

  router.get('/', (_, res) => res.send('You have reached the user route'));

  router.get(
    '/sample',
    checkAuthentication,
    authorize(['user']),
    validate(validator.sample),
    controller.sample,
  );

  return router;
};
