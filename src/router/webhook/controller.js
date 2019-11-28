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

  const updateRecordMessage = async (messageId, status) => {
    try {
      const { CmpRecordMessage } = container.persistenceService;
      const criteria = {
        messageId,
      };
      const changes = {
        status,
        statusTime: new Date(),
      };
      const recordMessages = await CmpRecordMessage.updateRecordMessages(criteria, changes);
      return Promise.resolve(recordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishMapiStatusAudit = async (data) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.persistenceService;
      const {
        to, from,
        timestamp, status,
        error, usage,
      } = data;
      const messageUuid = data.message_uuid;
      const clientRef = data.client_ref;
      const { code, reason } = error || {};
      const { currency, price } = usage || {};
      const toType = to.type;
      const toId = to.id;
      const toNumber = to.number;
      const fromType = from.type;
      const fromId = from.id;
      const fromNumber = from.number;

      const statusAudit = await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditMapi(
        messageUuid,
        toType, toId, toNumber,
        fromType, fromId, fromNumber,
        timestamp, status,
        code, reason,
        currency, price,
        clientRef,
      );
      return Promise.resolve(statusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishSmsStatusAudit = async (data) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.persistenceService;
      const {
        msisdn, to,
        messageId,
        price, status, scts,
      } = data;
      const networkCode = data['network-code'];
      const errCode = data['err-code'];
      const messageTimestamp = data['message-timestamp'];

      const statusAudit = await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditSms(
        msisdn, to,
        networkCode, messageId,
        price, status,
        scts, errCode,
        messageTimestamp,
      );
      return Promise.resolve(statusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const smsInbound = async (req, res, next) => {
    try {
      L.debug('SMS Inbound');
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
      L.debug('SMS Delivery');
      L.debug(req.params);
      L.debug(req.body);
      L.debug(req.query);
      const combined = Object.assign({}, req.body || {}, req.query || {});
      L.debug(combined);

      const { messageId, status } = combined;
      await updateRecordMessage(messageId, status);
      await publishSmsStatusAudit(combined);

      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const vapiAnswer = async (req, res, next) => {
    try {
      L.debug('VAPI Answer');
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
      L.debug('VAPI Fallback Answer');
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
      L.debug('VAPI Event');
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
      L.debug('MAPI Inbound');
      L.debug(req.params);
      L.debug(req.body);
      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const mapiStatus = async (req, res, next) => {
    try {
      L.debug('MAPI Status');
      L.debug(req.params);
      L.debug(req.body);

      const { status } = req.body;
      const messageId = req.body.message_uuid;
      await updateRecordMessage(messageId, status);
      await publishMapiStatusAudit(req.body);

      res.status(container.httpStatus.OK).send('ok');
    } catch (error) {
      next(error);
    }
  };

  const rtcEvent = async (req, res, next) => {
    try {
      L.debug('RTC Event');
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
