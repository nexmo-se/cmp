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
      validate(validator.listRecords),
      map([
        { roles: ['admin'], controller: controller.listAllRecords },
        { roles: ['user'], controller: controller.listMyRecords },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createRecordSingle),
      controller.createRecordSingle,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllRecords),
      controller.deleteAllRecords,
    );

  router.route('/batch')
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createRecordBatch),
      controller.createRecordBatch,
    );

  router.route('/:cmpRecordId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readRecord),
      map([
        { roles: ['admin'], controller: controller.readRecord },
        { roles: ['user'], controller: controller.readMyRecord },
      ]),
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteRecord),
      controller.deleteRecord,
    );

  return router;
};
