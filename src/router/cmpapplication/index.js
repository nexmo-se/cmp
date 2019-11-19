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
      validate(validator.listApplications),
      map([
        { roles: ['admin'], controller: controller.listAllApplications },
        { roles: ['user'], controller: controller.listMyApplications },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createApplication),
      controller.createApplication,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllApplications),
      controller.deleteAllApplications,
    );

  router.route('/:cmpApplicationId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readApplication),
      map([
        { roles: ['admin'], controller: controller.readApplication },
        { roles: ['user'], controller: controller.readMyApplication },
      ]),
    )
    .put(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.updateApplication),
      controller.updateApplication,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteApplication),
      controller.deleteApplication,
    );

  return router;
};
