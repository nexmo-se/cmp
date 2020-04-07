import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);
  const storage = container.multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, container.config.csv.uploadPath);
    },
    filename: (req, file, cb) => {
      const now = new Date();
      const date = `0${now.getDate()}`.slice(-2);
      const month = `0${(now.getMonth() + 1)}`.slice(-2);
      const year = now.getFullYear();
      const hour = `0${now.getHours()}`.slice(-2);
      const minute = `0${now.getMinutes()}`.slice(-2);
      const second = `0${now.getSeconds()}`.slice(-2);
      const prefix = `${year}${month}${date}${hour}${minute}${second}`;
      console.log(req.params);
      cb(null, `${prefix}_${req.params.cmpCampaignId}_${req.params.cmpTemplateId}_${file.originalname}.tmp`);
    },
  });
  const upload = container.multer({ storage });

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

  router.route('/search')
    .post(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.searchRecords),
      map([
        { roles: ['admin'], controller: controller.findAllRecords },
        { roles: ['user'], controller: controller.findMyRecords },
      ]),
    );

  router.route('/active')
    .get(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.listActiveRecords),
      controller.listActiveRecords,
    );

  router.route('/batch')
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createRecordBatch),
      controller.createRecordBatch,
    );

  router.route('/csv/:cmpCampaignId/:cmpTemplateId/metadata')
    .post(
      checkAuthentication,
      authorize(['admin', 'user']),
      validate(validator.createCsvMetadata),
      controller.createCsvMetadata,
    );

  router.route('/csv/:cmpCampaignId/:cmpTemplateId')
    .post(
      checkAuthentication,
      authorize(['admin', 'user']),
      validate(validator.uploadCsv),
      upload.single('file'),
      controller.uploadCsv,
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
