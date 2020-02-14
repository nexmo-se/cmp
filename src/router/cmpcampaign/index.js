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
      validate(validator.listCampaigns),
      map([
        { roles: ['admin'], controller: controller.listAllCampaigns },
        { roles: ['user'], controller: controller.listMyCampaigns },
      ]),
    )
    .post(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.createCampaign),
      controller.createCampaign,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteAllCampaigns),
      controller.deleteAllCampaigns,
    );

  router.route('/search')
    .post(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.searchCampaigns),
      map([
        { roles: ['admin'], controller: controller.findAllCampaigns },
        { roles: ['user'], controller: controller.findMyCampaigns },
      ]),
    );

  router.route('/:cmpCampaignId/status')
    .put(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.updateCampaignStatus),
      controller.updateCampaignStatus,
    );

  router.route('/:cmpCampaignId')
    .get(
      checkAuthentication,
      authorize(['user', 'admin']),
      validate(validator.readCampaign),
      map([
        { roles: ['admin'], controller: controller.readCampaign },
        { roles: ['user'], controller: controller.readMyCampaign },
      ]),
    )
    .put(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.updateCampaign),
      controller.updateCampaign,
    )
    .delete(
      checkAuthentication,
      authorize(['admin']),
      validate(validator.deleteCampaign),
      controller.deleteCampaign,
    );

  return router;
};
