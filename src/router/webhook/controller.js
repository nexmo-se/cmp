export default (container) => {
  const { L } = container.defaultLogger('Webhook Controller');
  const getUserId = (req) => {
    const nexmoIni = container.utils.getIniStuff();
    const bearerToken = container.utils.getBearerToken(req);
    const userId = container.utils.getIdFromJWT(nexmoIni, bearerToken) || 'demo';
    return userId;
  };

  const register = async (req, res, next) => {
    try {
      L.debug('Demo Registering');
      const startTime = new Date().getTime();

      // Get User Nexmo Ini
      const userId = getUserId(req);
      const userNexmoIni = container.utils.getNexmo(userId);

      // Setup Nexmo Applications (VAPI, MAPI, SMS, etc.) Webhooks here
      const demoRoute = 'example';
      const routes = {
        sms: {
          inbound: `sms/inbound/${userId}`,
          delivery: `sms/delivery/${userId}`,
        },
        vapi: {
          answer: `vapi/answer/${userId}`,
          fallbackAnswer: `vapi/fallbackAnswer/${userId}`,
          event: `vapi/event/${userId}`,
        },
        mapi: {
          inbound: `mapi/inbound/${userId}`,
          status: `mapi/status/${userId}`,
        },
        rtc: {
          event: `rtc/event/${userId}`,
        },
      };
      await container.nexmoService.webhook.registerSms(
        userNexmoIni, demoRoute, routes.sms.inbound, routes.sms.delivery,
      );
      await container.nexmoService.webhook.registerVapi(
        userNexmoIni, demoRoute, routes.vapi.event, routes.vapi.answer, routes.vapi.fallbackAnswer,
      );
      await container.nexmoService.webhook.registerMapi(
        userNexmoIni, demoRoute, routes.mapi.inbound, routes.mapi.status,
      );
      await container.nexmoService.webhook.registerRtc(
        userNexmoIni, demoRoute, routes.rtc.event,
      );

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Nexmo Webhook Registration): ${endTime - startTime}ms`);
      res.status(container.httpStatus.OK).send('registered');
    } catch (error) {
      next(error);
    }
  };

  const smsInbound = async (req, res, next) => {
    try {
      L.debug('SMS Inbound');
      L.trace(req.params);
      L.trace(req.body);
      L.trace(req.query);
      const combined = Object.assign({}, req.body || {}, req.query || {});
      L.trace(combined);
      const startTime = new Date().getTime();

      const endTime = new Date().getTime();
      L.debug(`Time Taken (SMS Inbound Webhook): ${endTime - startTime}ms`);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const smsDelivery = async (req, res, next) => {
    try {
      L.debug('SMS Delivery');
      L.trace(req.params);
      L.trace(req.body);
      L.trace(req.query);
      const combined = Object.assign({}, req.body || {}, req.query || {});
      L.trace(combined);
      const startTime = new Date().getTime();

      const { messageId, status, price } = combined;
      await container.webhookService.updateRecordMessage(messageId, status, price);
      await container.webhookService.publishSmsStatusAudit(combined);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (SMS Delivery Webhook): ${endTime - startTime}ms`);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const vapiAnswer = async (req, res, next) => {
    try {
      L.debug('VAPI Answer');
      L.trace(req.params);
      L.trace(req.body);
      const startTime = new Date().getTime();

      const ncco = [
        {
          action: 'text',
          text: 'You have reached the C M P Answer Webhook. Have a nice day and goodbye.',
        },
      ];
      const endTime = new Date().getTime();
      L.debug(`Time Taken (VAPI Answer Webhook): ${endTime - startTime}ms`);
      res.json(ncco);
    } catch (error) {
      next(error);
    }
  };

  const vapiFallbackAnswer = async (req, res, next) => {
    try {
      L.debug('VAPI Fallback Answer');
      L.trace(req.params);
      L.trace(req.body);
      const startTime = new Date().getTime();

      const ncco = [
        {
          action: 'text',
          text: 'You have reached the C M P Fallback Answer Webhook. Have a nice day and goodbye.',
        },
      ];
      const endTime = new Date().getTime();
      L.debug(`Time Taken (VAPI Fallback Answer Webhook): ${endTime - startTime}ms`);
      res.json(ncco);
    } catch (error) {
      next(error);
    }
  };

  const vapiEvent = async (req, res, next) => {
    try {
      L.debug('VAPI Event');
      L.trace(req.params);
      L.trace(req.body);
      const startTime = new Date().getTime();

      const ncco = [
        {
          action: 'text',
          text: 'You have reached the C M P Event Webhook. Have a nice day and goodbye.',
        },
      ];
      const endTime = new Date().getTime();
      L.debug(`Time Taken (VAPI Event Webhook): ${endTime - startTime}ms`);
      res.json(ncco);
    } catch (error) {
      next(error);
    }
  };

  const vapiEventDynamic = async (req, res, next) => {
    try {
      L.debug('VAPI Event Dynamic');
      L.trace(req.params);
      L.trace(req.body);

      const startTime = new Date().getTime();

      const { clientRef } = req.params;
      const { uuid, status, price } = req.body;
      await container.webhookService.updateRecordMessage(uuid, status, price);
      await container.webhookService.publishVapiEventAudit(req.body, clientRef);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (VAPI Event Dynamic Webhook): ${endTime - startTime}ms`);
      res.json([]);
    } catch (error) {
      next(error);
    }
  };

  const mapiInbound = async (req, res, next) => {
    try {
      L.debug('MAPI Inbound');
      L.trace(req.params);
      L.trace(req.body);
      const startTime = new Date().getTime();
      const endTime = new Date().getTime();
      L.debug(`Time Taken (MAPI Inbound Webhook): ${endTime - startTime}ms`);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const mapiStatus = async (req, res, next) => {
    try {
      L.debug('MAPI Status');
      L.trace(req.params);
      L.trace(req.body);

      const startTime = new Date().getTime();

      const { status, usage } = req.body;
      const messageId = req.body.message_uuid;
      const { price } = usage || {};
      await container.webhookService.updateRecordMessage(messageId, status, price);
      await container.webhookService.publishMapiStatusAudit(req.body);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (MAPI Status Webhook): ${endTime - startTime}ms`);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const rtcEvent = async (req, res, next) => {
    try {
      L.debug('RTC Event');
      L.trace(req.params);
      L.trace(req.body);
      const startTime = new Date().getTime();
      const endTime = new Date().getTime();
      L.debug(`Time Taken (RTC Status Webhook): ${endTime - startTime}ms`);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const niCallback = async (req, res, next) => {
    try {
      L.debug('Number Insight Callback');
      L.trace(req.params);
      L.trace(req.body);

      const startTime = new Date().getTime();

      const { status_message: status, request_id: messageId, request_price: price } = req.body;

      await container.webhookService.updateRecordMessage(messageId, status, price);
      await container.webhookService.publishNiCallbackAudit(req.body);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Number Insight Callback Webhook): ${endTime - startTime}ms`);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  return {
    register,

    smsInbound,
    smsDelivery,

    vapiAnswer,
    vapiFallbackAnswer,
    vapiEvent,
    vapiEventDynamic,

    mapiInbound,
    mapiStatus,

    rtcEvent,

    niCallback,
  };
};
