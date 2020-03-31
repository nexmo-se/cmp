import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  const { filePath } = container.config.report;

  const { authorize } = container.authorizer;
  const { checkAuthentication } = container.authenticator;
  const { map } = container.controllerMapper;

  router.route('/')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.listReports),
      map([
        { roles: ['admin'], controller: controller.listAllReports },
        { roles: ['user'], controller: controller.listMyReports },
      ]),
    );

  // router.use('/archive', container.express.static(filePath));
  router.route('/archive/:fileName')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.getReportArchive),
      controller.getReportArchive,
    );

  router.route('/json')
    .post(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.createReportJson),
      controller.createJsonReport,
    );

  router.route('/csv')
    .post(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.createReportCsv),
      controller.createCsvReport,
    );

  router.route('/:cmpReportId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readReport),
      map([
        { roles: ['admin'], controller: controller.readReport },
        { roles: ['user'], controller: controller.readMyReport },
      ]),
    );

  return router;
};
