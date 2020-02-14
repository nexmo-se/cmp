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
      validate(validator.listTemplates),
      map([
        { roles: ['admin'], controller: controller.listAllTemplates },
        { roles: ['user'], controller: controller.listMyTemplates },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createTemplate),
      controller.createTemplate,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllTemplates),
      controller.deleteAllTemplates,
    );

  router.route('/search')
    .post(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.searchTemplates),
      map([
        { roles: ['admin'], controller: controller.findAllTemplates },
        { roles: ['user'], controller: controller.findMyTemplates },
      ]),
    );

  router.route('/:cmpTemplateId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readTemplate),
      map([
        { roles: ['admin'], controller: controller.readTemplate },
        { roles: ['user'], controller: controller.readMyTemplate },
      ]),
    )
    .put(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.updateTemplate),
      controller.updateTemplate,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteTemplate),
      controller.deleteTemplate,
    );

  return router;
};
