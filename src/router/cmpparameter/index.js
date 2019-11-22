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
      validate(validator.listParameters),
      map([
        { roles: ['admin'], controller: controller.listAllParameters },
        { roles: ['user'], controller: controller.listMyParameters },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createParameter),
      controller.createParameter,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllParameters),
      controller.deleteAllParameters,
    );

  router.route('/:cmpParameterId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readParameter),
      map([
        { roles: ['admin'], controller: controller.readParameter },
        { roles: ['user'], controller: controller.readMyParameter },
      ]),
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteParameter),
      controller.deleteParameter,
    );

  return router;
};
