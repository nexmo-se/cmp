import { duration } from "moment";

export default (container) => {
  const { L } = container.defaultLogger('Webhook Service');

  const getRecordMessage = async (messageId) => {
    try {
      const { CmpRecordMessage } = container.persistenceService;

      const startTime = new Date().getTime();

      const criteria = { messageId };
      const recordMessage = await CmpRecordMessage.findRecordMessage(criteria);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Get Record Message): ${endTime - startTime}ms`);

      if (recordMessage == null) {
        throw new Error('Record Message not found');
      }

      return Promise.resolve(recordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessage = async (messageId, status, price) => {
    try {
      const { useQueue } = container.config.webhook;
      const { CmpRecordMessage } = container.persistenceService;

      const startTime = new Date().getTime();

      if (useQueue) {
        // Add to Queue
        container.queueService.pushRecordMessageUpdate(messageId, status, price);
      } else {
        // Update Immediately
        const criteria = { messageId };
        const changes = { status, statusTime: new Date(), price };
        const options = { noGet: true };
        await CmpRecordMessage.updateRecordMessages(criteria, changes, options);
      }
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Handle Update Record Message): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishMapiStatusAudit = async (data) => {
    try {
      const { useQueue } = container.config.webhook;
      const { saveRecordAudits } = container.config.audit;
      const { CmpRecordMessageStatusAudit } = container.persistenceService;

      if (!saveRecordAudits) {
        return Promise.resolve();
      }

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

      if (useQueue) {
        // Add to Queue
        const creatableData = {
          messageUuid,
          toType,
          toId,
          toNumber,
          fromType,
          fromId,
          fromNumber,
          timestamp,
          status,
          errorCode: code,
          errorReason: reason,
          usageCurrency: currency,
          usagePrice: price,
          clientRef,
        };
        container.queueService.pushMapiStatusAudit(creatableData);
      } else {
        // Insert Immediately
        const recordMessage = await getRecordMessage(messageUuid);
        await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditMapi(
          recordMessage.id,
          messageUuid,
          toType, toId, toNumber,
          fromType, fromId, fromNumber,
          timestamp, status,
          code, reason,
          currency, price,
          clientRef,
        );
      }
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Handle Publish Mapi Status Audit): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishSmsStatusAudit = async (data) => {
    try {
      const { useQueue } = container.config.webhook;
      const { saveRecordAudits } = container.config.audit;
      const { CmpRecordMessageStatusAudit } = container.persistenceService;

      if (!saveRecordAudits) {
        return Promise.resolve();
      }

      const {
        msisdn, to,
        messageId,
        price, status, scts,
      } = data;
      const networkCode = data['network-code'];
      const errCode = data['err-code'];
      const messageTimestamp = data['message-timestamp'];

      const startTime = new Date().getTime();

      if (useQueue) {
        // Add to Queue
        const creatableData = {
          msisdn,
          to,
          networkCode,
          messageId,
          price,
          status,
          scts,
          errCode,
          messageTimestamp,
        };
        container.queueService.pushSmsStatusAudit(creatableData);
      } else {
        const recordMessage = await getRecordMessage(messageId);
        await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditSms(
          recordMessage.id,
          msisdn, to,
          networkCode, messageId,
          price, status,
          scts, errCode,
          messageTimestamp,
        );
      }

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Handling Publish SMS Status Audit): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishVapiEventAudit = async (data, clientRef) => {
    try {
      const { useQueue } = container.config.webhook;
      const { saveRecordAudits } = container.config.audit;
      const { CmpRecordMessageStatusAudit } = container.persistenceService;

      if (!saveRecordAudits) {
        return Promise.resolve();
      }

      const {
        from, to,
        uuid, conversation_uuid: conversationUuid,
        status, direction, timestamp,
        start_time: callStartTime, end_time: callEndTime,
        duration, rate, price, network, detail,
        dtmf, speech,
      } = data;

      // DTMF Input
      const { digits: dtmfDigits, timed_out: dtmfTimedOut } = dtmf || {};
      
      // Speech Input
      const { timeout_reason: speechTimeoutReason, error: speechError, results: speechResults } = speech || {};
      const { text: speechText, confidence: speechConfidence } = speechResults || {};
      const { reason: speechErrorReason } = speechError || {};

      const startTime = new Date().getTime();

      if (useQueue) {
        // Add to Queue
        const creatableData = {
          from,
          to,
          uuid,
          conversationUuid,
          status,
          direction,
          timestamp,
          startTime: callStartTime,
          endTime: callEndTime,
          duration,
          rate,
          price,
          network,
          detail,
          dtmfDigits,
          dtmfTimedOut,
          speechText,
          speechConfidence,
          speechTimeoutReason,
          speechErrorReason,
          clientRef,
        };
        container.queueService.pushVapiEventAudit(creatableData);
      } else {
        // Insert Immediately
        const recordMessage = await getRecordMessage(uuid);
        await CmpRecordMessageStatusAudit.createRecordMessageStatusAuditVapi(
          recordMessage.id,
          from,
          to,
          uuid,
          conversationUuid,
          status,
          direction,
          timestamp,
          startTime: callStartTime,
          endTime: callEndTime,
          duration,
          rate,
          price,
          network,
          detail,
          dtmfDigits,
          dtmfTimedOut,
          speechText,
          speechConfidence,
          speechTimeoutReason,
          speechErrorReason,
          clientRef,
        );
      }
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Handle Publish Vapi Event Audit): ${endTime - startTime}ms`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    updateRecordMessage,

    publishMapiStatusAudit,
    publishSmsStatusAudit,
    publishVapiEventAudit,
  };
};
