import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  const { authorize } = container.authorizer;
  const { checkAuthentication } = container.authenticator;

  router.route('/')
    .get(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.listUsers),
      controller.listUsers,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllUsers),
      controller.deleteAllUsers,
    );

  router.route('/search')
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.searchUsers),
      controller.findUsers,
    );

  router.route('/me')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readMyUser),
      controller.readMyUser,
    )
    .put(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.updateMyUser),
      controller.updateMyUser,
    );

  router.route('/me/password')
    .post(
      checkAuthentication,
      authorize(['user']),
      validate(validator.changeMyUserPassword),
      controller.changeMyUserPassword,
    );

  router.route('/:userId')
    .get(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.readUser),
      controller.readUser,
    )
    .put(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.updateUser),
      controller.updateUser,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteUser),
      controller.deleteUser,
    );

  router.route('/:userId/password')
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.changeUserPassword),
      controller.changeUserPassword,
    );

  router.route('/:userId/roles')
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.addUserRole),
      controller.addUserRole,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.removeUserRole),
      controller.removeUserRole,
    );


  return router;
};
