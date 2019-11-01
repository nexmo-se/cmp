export default (container) => {
  const { L } = container.defaultLogger('ExampleDemo Controller');
  const getUserId = (req) => {
    const nexmoIni = container.utils.getIniStuff();
    const bearerToken = container.utils.getBearerToken(req);
    const userId = container.utils.getIdFromJWT(nexmoIni, bearerToken) || 'demo';
    return userId;
  };

  const register = async (req, res, next) => {
    try {
      L.debug('Demo Registering');

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

      res.status(container.httpStatus.OK).send('registered');
    } catch (error) {
      next(error);
    }
  };

  const smsInbound = async (req, res, next) => {
    try {
      L.debug('Demo SMS Inbound');
      L.debug(req.params);
      L.debug(req.body);
      L.debug(req.query);
      const combined = Object.assign({}, req.body || {}, req.query || {});
      L.debug(combined);

      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const smsDelivery = async (req, res, next) => {
    try {
      L.debug('Demo SMS Delivery');
      L.debug(req.params);
      L.debug(req.body);
      L.debug(req.query);
      const combined = Object.assign({}, req.body || {}, req.query || {});
      L.debug(combined);

      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const vapiAnswer = async (req, res, next) => {
    try {
      L.debug('Demo VAPI Answer');
      L.debug(req.params);
      L.debug(req.body);

      const ncco = [
        {
          action: 'text',
          text: 'You have reached the NIDS Demo Answer. Have a nice day and goodbye.',
        },
      ];
      res.json(ncco);
    } catch (error) {
      next(error);
    }
  };

  const vapiFallbackAnswer = async (req, res, next) => {
    try {
      L.debug('Demo VAPI Fallback Answer');
      L.debug(req.params);
      L.debug(req.body);

      const ncco = [
        {
          action: 'text',
          text: 'You have reached the NIDS Demo Fallback Answer. Have a nice day and goodbye.',
        },
      ];
      res.json(ncco);
    } catch (error) {
      next(error);
    }
  };

  const vapiEvent = async (req, res, next) => {
    try {
      L.debug('Demo VAPI Event');
      L.debug(req.params);
      L.debug(req.body);

      const ncco = [
        {
          action: 'text',
          text: 'You have reached the NIDS Demo Event. Have a nice day and goodbye.',
        },
      ];
      res.json(ncco);
    } catch (error) {
      next(error);
    }
  };

  const mapiInbound = async (req, res, next) => {
    try {
      L.debug('Demo MAPI Inbound');
      L.debug(req.params);
      L.debug(req.body);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const mapiStatus = async (req, res, next) => {
    try {
      L.debug('Demo MAPI Status');
      L.debug(req.params);
      L.debug(req.body);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const rtcEvent = async (req, res, next) => {
    try {
      L.debug('Demo RTC Event');
      L.debug(req.params);
      L.debug(req.body);
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

    mapiInbound,
    mapiStatus,

    rtcEvent,
  };
};
