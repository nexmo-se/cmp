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
      validate(validator.listChannels),
      map([
        { roles: ['admin'], controller: controller.listAllChannels },
        { roles: ['user'], controller: controller.listMyChannels },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createChannel),
      controller.createChannel,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllChannels),
      controller.deleteAllChannels,
    );

  router.route('/search')
    .post(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.searchChannels),
      map([
        { roles: ['admin'], controller: controller.findAllChannels },
        { roles: ['user'], controller: controller.findMyChannels },
      ]),
    );

  router.route('/:cmpChannelId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readChannel),
      map([
        { roles: ['admin'], controller: controller.readChannel },
        { roles: ['user'], controller: controller.readMyChannel },
      ]),
    )
    .put(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.updateChannel),
      controller.updateChannel,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteChannel),
      controller.deleteChannel,
    );

  return router;
};
