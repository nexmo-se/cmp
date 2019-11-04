import WebhookRouter from './webhook';

export default (container) => {
  const { L } = container.defaultLogger('Root Router');
  const router = container.express.Router();

  router.use('/', container.express.static('src/public'));

  router.use('/webhook', WebhookRouter(container));

  router.get('/test', async (req, res, next) => {
    try {
      L.debug('This is the test route');

      // Do whatever test you want here when developing features
      const username = 'nexmo';
      const password = 'passwords';

      const ok = await container.authService.authenticate(username, password);
      console.log(ok);

      res.status(200).send('ok');
    } catch (error) {
      next(error);
    }
  });

  return router;
};
