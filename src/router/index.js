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
import ReportRouter from './cmpreport';
import WebhookRouter from './webhook';
import BlasterRouter from './blaster';

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
  router.use('/reports', ReportRouter(container));
  router.use('/blaster', BlasterRouter(container));
  router.use('/webhook', WebhookRouter(container));

  router.get(
    '/test',
    (req, res) => {
      console.log(req.query);
      res.send('ok');
    },
  );

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
    '/test/:id',
    async (req, res, next) => {
      try {
        const { CmpRecord } = container.persistenceService;
        const { id } = req.params;
        const record = await CmpRecord.readRecord(id, false);
        const {
          recipient, cmpTemplate, cmpParameters, cmpMedia,
        } = record;
        const { type } = cmpMedia || {};
        const {
          whatsappTemplateNamespace, whatsappTemplateName, body, cmpChannel,
        } = cmpTemplate;
        const {
          channel, senderId, cmpApiKey, cmpApplication, smsUseSignature,
        } = cmpChannel;
        const { applicationId, privateKey } = cmpApplication || {};
        const {
          apiKey, apiSecret, signatureSecret, signatureMethod,
        } = cmpApiKey;

        let result;
        if (channel === 'sms') {
          const parameters = cmpParameters
            .sort((a, b) => a.order - b.order)
            .map(cmpParameter => cmpParameter.parameter);
          const text = container.templateService.getText(body, parameters);
          result = await container.nexmoService.sms.sendText(
            recipient, text, 'text', senderId, apiKey, apiSecret,
            smsUseSignature, signatureSecret, signatureMethod,
          );
        } else if (channel === 'whatsapp') {
          const parameters = cmpParameters
            .sort((a, b) => a.order - b.order)
            .map(cmpParameter => cmpParameter.parameter);
          result = await container.nexmoService.whatsapp.sendTemplate(
            senderId, recipient, whatsappTemplateNamespace, whatsappTemplateName,
            type || 'text', cmpMedia, parameters, `rec_${id}`,
            applicationId, privateKey,
          );
        }

        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    },
  );

  return router;
};
