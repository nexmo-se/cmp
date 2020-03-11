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

      const startTime = new Date().getTime();
      const recordMessages = await CmpRecordMessage.updateRecordMessages(criteria, changes);
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Update Record Message): ${endTime - startTime}ms`);
      return Promise.resolve(recordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishMapiStatusAudit = async (recordMessage, data) => {
    try {
      L.trace(recordMessage.id);
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

      const startTime = new Date().getTime();
      const statusAudit = await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditMapi(
        recordMessage.id,
        messageUuid,
        toType, toId, toNumber,
        fromType, fromId, fromNumber,
        timestamp, status,
        code, reason,
        currency, price,
        clientRef,
      );
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Publish Mapi Status Audit): ${endTime - startTime}ms`);
      return Promise.resolve(statusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishSmsStatusAudit = async (recordMessage, data) => {
    try {
      L.trace(recordMessage.id);
      const { CmpRecordMessageStatusAudit } = container.persistenceService;
      const {
        msisdn, to,
        messageId,
        price, status, scts,
      } = data;
      const networkCode = data['network-code'];
      const errCode = data['err-code'];
      const messageTimestamp = data['message-timestamp'];

      const startTime = new Date().getTime();
      const statusAudit = await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditSms(
        recordMessage.id,
        msisdn, to,
        networkCode, messageId,
        price, status,
        scts, errCode,
        messageTimestamp,
      );
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Publish SMS Status Audit): ${endTime - startTime}ms`);
      return Promise.resolve(statusAudit);
    } catch (error) {
      return Promise.reject(error);
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

      const { messageId, status } = combined;
      const recordMessages = await updateRecordMessage(messageId, status);

      if (recordMessages.length < 1) {
        L.info('No Sms Record Message Updated');
      } else {
        L.trace('Publishing Sms Status Audit');
        const recordMessage = recordMessages[0];
        await publishSmsStatusAudit(recordMessage, combined);
      }

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
          text: 'You have reached the NIDS Demo Answer. Have a nice day and goodbye.',
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
          text: 'You have reached the NIDS Demo Fallback Answer. Have a nice day and goodbye.',
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
          text: 'You have reached the NIDS Demo Event. Have a nice day and goodbye.',
        },
      ];
      const endTime = new Date().getTime();
      L.debug(`Time Taken (VAPI Event Webhook): ${endTime - startTime}ms`);
      res.json(ncco);
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

      const { status } = req.body;
      const messageId = req.body.message_uuid;
      const recordMessages = await updateRecordMessage(messageId, status);

      if (recordMessages.length < 1) {
        L.info('No Mapi Record Message Updated');
      } else {
        L.trace('Publishing Mapi Status Audit');
        const recordMessage = recordMessages[0];
        await publishMapiStatusAudit(recordMessage, req.body);
      }

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
