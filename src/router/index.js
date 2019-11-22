import AuthRouter from './auth';
import UserRouter from './user';
import ApiKeyRouter from './cmpapikey';
import ApplicationRouter from './cmpapplication';
import ChannelRouter from './cmpchannel';
import TemplateRouter from './cmptemplate';
import ParameterRouter from './cmpparameter';
import MediaRouter from './cmpmedia';
import CampaignRouter from './cmpcampaign';
import RecordRouter from './cmprecord';
import WebhookRouter from './webhook';

export default (container) => {
  const { L } = container.defaultLogger('Root Router');
  const router = container.express.Router();

  router.use('/', container.express.static('src/public'));

  router.use('/auth', AuthRouter(container));
  router.use('/users', UserRouter(container));
  router.use('/apikeys', ApiKeyRouter(container));
  router.use('/applications', ApplicationRouter(container));
  router.use('/channels', ChannelRouter(container));
  router.use('/templates', TemplateRouter(container));
  router.use('/parameters', ParameterRouter(container));
  router.use('/media', MediaRouter(container));
  router.use('/campaigns', CampaignRouter(container));
  router.use('/records', RecordRouter(container));
  router.use('/webhook', WebhookRouter(container));

  router.get(
    '/generate/password',
    async (req, res, next) => {
      try {
        const { password } = req.query;
        const salt = await container.hashService.generateSalt();
        const hash = await container.hashService.hash(password, salt);

        const b64Salt = await container.base64Service.encode(salt);
        const b64Hash = await container.base64Service.encode(hash);

        res.status(200).json({
          hash,
          salt,
          b64Hash,
          b64Salt,
        });
      } catch (error) {
        next(error);
      }
    },
  );

  router.get(
    '/test',
    async (req, res, next) => {
      try {
        const { CmpTemplate } = container.persistenceService;
        const template = await CmpTemplate.readTemplate('a0a33d37-ec8e-4bc0-ac9c-a40f7714e190', false);
        const { mediaType, body, cmpChannel } = template;
        const { senderId, cmpApiKey } = cmpChannel;
        const { apiKey, apiSecret } = cmpApiKey;

        const to = '6583206274';
        const parameters = [
          'Kopitech',
          '1234',
          '5 minutes',
        ];

        const text = container.templateService.getText(body, parameters);
        const result = await container.nexmoService.sms.sendText(
          to, text, mediaType, senderId, apiKey, apiSecret,
        );
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    },
  );

  return router;
};
