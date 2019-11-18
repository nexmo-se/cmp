import AuthRouter from './auth';
import UserRouter from './user';
import ApiKeyRouter from './nexmoapikey';
import ApplicationRouter from './nexmoapplication';
import WebhookRouter from './webhook';

export default (container) => {
  const { L } = container.defaultLogger('Root Router');
  const router = container.express.Router();

  router.use('/', container.express.static('src/public'));

  router.use('/auth', AuthRouter(container));
  router.use('/users', UserRouter(container));
  router.use('/apikeys', ApiKeyRouter(container));
  router.use('/applications', ApplicationRouter(container));
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
    container.authenticator.checkAuthentication,
    async (req, res, next) => {
      try {
        L.debug('This is the test route');
        res.status(200).send('ok');
      } catch (error) {
        next(error);
      }
    },
  );

  return router;
};
