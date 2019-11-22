import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  const { authorize } = container.authorizer;
  const { checkAuthentication } = container.authenticator;

  router.route('/batch')
    .post(
      checkAuthentication,
      authorize(['admin', 'user']),
      validate(validator.blastBatch),
      controller.blastBatch,
    );

  router.route('/single')
    .post(
      checkAuthentication,
      authorize(['admin', 'user']),
      validate(validator.blastSingle),
      controller.blastSingle,
    );

  return router;
};
