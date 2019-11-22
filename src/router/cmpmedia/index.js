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
      validate(validator.listMedias),
      map([
        { roles: ['admin'], controller: controller.listAllMedias },
        { roles: ['user'], controller: controller.listMyMedias },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createMedia),
      controller.createMedia,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllMedias),
      controller.deleteAllMedias,
    );

  router.route('/:cmpMediaId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readMedia),
      map([
        { roles: ['admin'], controller: controller.readMedia },
        { roles: ['user'], controller: controller.readMyMedia },
      ]),
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteMedia),
      controller.deleteMedia,
    );

  return router;
};
