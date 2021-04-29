import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  router.get('/', (_, res) => res.send('You have reached the webhook route'));

  // MUST HAVE ROUTE FOR REGISTRATION
  router.route('/register')
    .get(controller.register)
    .post(controller.register);

  // SMS
  router.get(
    '/sms/inbound',
    validate(validator.smsInbound),
    controller.smsInbound,
  );
  router.post(
    '/sms/inbound',
    validate(validator.smsInbound),
    controller.smsInbound,
  );
  router.get(
    '/sms/delivery',
    validate(validator.smsDelivery),
    controller.smsDelivery,
  );
  router.post(
    '/sms/delivery',
    validate(validator.smsDelivery),
    controller.smsDelivery,
  );

  // VAPI
  router.post(
    '/vapi/answer',
    validate(validator.vapiAnswer),
    controller.vapiAnswer,
  );
  router.post(
    '/vapi/fallbackAnswer',
    validate(validator.vapiFallbackAnswer),
    controller.vapiFallbackAnswer,
  );
  router.post(
    '/vapi/event',
    validate(validator.vapiEvent),
    controller.vapiEvent,
  );
  router.post(
    '/vapi/event/:clientRef',
    validate(validator.vapiEventDynamic),
    controller.vapiEventDynamic,
  );

  // MAPI
  router.post(
    '/mapi/inbound',
    validate(validator.mapiInbound),
    controller.mapiInbound,
  );
  router.post(
    '/mapi/status',
    validate(validator.mapiStatus),
    controller.mapiStatus,
  );

  // RTC
  router.post(
    '/rtc/event',
    validate(validator.rtcEvent),
    controller.rtcEvent,
  );

  // Number Insight
  router.post(
    '/ni/callback',
    validate(validator.niCallback),
    controller.niCallback,
  );

  return router;
};
