import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  const { authorize } = container.authorizer;
  const { checkAuthentication } = container.authenticator;
  const { map } = container.controllerMapper;

  router.route('/')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.listApiKeys),
      map([
        { roles: ['admin'], controller: controller.listAllApiKeys },
        { roles: ['user'], controller: controller.listMyApiKeys },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createApiKey),
      controller.createApiKey,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllApiKeys),
      controller.deleteAllApiKeys,
    );

  router.route('/search')
    .post(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.searchApiKeys),
      map([
        { roles: ['admin'], controller: controller.findAllApiKeys },
        { roles: ['user'], controller: controller.findMyApiKeys },
      ]),
    );

  router.route('/:cmpApiKeyId/webhook')
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.setWebhook),
      controller.setWebhook,
    );

  router.route('/:cmpApiKeyId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readApiKey),
      map([
        { roles: ['admin'], controller: controller.readApiKey },
        { roles: ['user'], controller: controller.readMyApiKey },
      ]),
    )
    .put(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.updateApiKey),
      controller.updateApiKey,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteApiKey),
      controller.deleteApiKey,
    );

  return router;
};
