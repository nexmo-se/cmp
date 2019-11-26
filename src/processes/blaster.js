export default (container) => {
  const { L } = container.defaultLogger('Blaster Process');

  const getRecords = async (recordSize) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const currentTime = new Date();
      const records = await CmpRecord.getActiveRecords(
        recordSize, currentTime, false,
      );
      L.debug(`Records Retrieved: ${records.length}`);
      return Promise.resolve(records);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const prepareRecord = async (record) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const recordId = record.id;
      const changes = {
        status: 'queuing',
        statusTime: new Date(),
      };

      const startTime = new Date().getTime();
      const updatedRecord = await CmpRecord.updateRecord(recordId, changes, true);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Prepare Record - ${recordId}): ${duration}ms`);
      return Promise.resolve(updatedRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const prepareRecords = async (records) => {
    try {
      const startTime = new Date().getTime();

      const promises = records.map(prepareRecord);
      const results = await Promise.all(promises);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Prepare Records): ${duration}ms`);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordSendTime = async (record) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const recordId = record.id;
      const changes = {
        status: 'requested',
        statusTime: new Date(),
        sendTime: new Date(),
      };

      const startTime = new Date().getTime();
      const updatedRecord = await CmpRecord.updateRecord(recordId, changes, true);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Update Record Send Time - ${recordId}): ${duration}ms`);
      return Promise.resolve(updatedRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastSms = async (record, axios) => {
    try {
      const { recipient, cmpTemplate, cmpParameters } = record;
      const { body, cmpChannel } = cmpTemplate;
      const { senderId, cmpApiKey } = cmpChannel;
      const { apiKey, apiSecret } = cmpApiKey;

      const parameters = cmpParameters
        .sort((a, b) => a.order - b.order)
        .map(cmpParameter => cmpParameter.parameter);
      const text = container.templateService.getText(body, parameters);

      const result = await container.nexmoService.sms.sendText(
        recipient, text, 'text', senderId, apiKey, apiSecret, axios,
      );
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastWhatsapp = async (record, axios) => {
    try {
      const {
        recipient, cmpTemplate, cmpParameters, cmpMedia,
      } = record;
      const { type } = cmpMedia || {};
      const { whatsappTemplateNamespace, whatsappTemplateName, cmpChannel } = cmpTemplate;
      const { senderId, cmpApplication } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};

      const parameters = cmpParameters
        .sort((a, b) => a.order - b.order)
        .map(cmpParameter => cmpParameter.parameter);
      const result = await container.nexmoService.whatsapp.sendTemplate(
        senderId, recipient, whatsappTemplateNamespace, whatsappTemplateName,
        type || 'text', cmpMedia, parameters, `rec_${record.id}`,
        applicationId, privateKey, axios,
      );

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastViber = async (record, axios) => {
    try {
      const {
        recipient, cmpTemplate, cmpParameters, cmpMedia,
      } = record;
      const {
        type, url, caption, actionUrl,
      } = cmpMedia || {};
      const {
        viberTtl, category, body, cmpChannel,
      } = cmpTemplate;
      const { senderId, cmpApplication } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};

      const parameters = cmpParameters
        .sort((a, b) => a.order - b.order)
        .map(cmpParameter => cmpParameter.parameter);
      const text = container.templateService.getText(body, parameters);

      let result;
      if (type === 'text') {
        result = await container.nexmoService.viber.sendText(
          senderId, recipient, text, `rec_${record.id}`,
          category, viberTtl,
          applicationId, privateKey, axios,
        );
      } else if (type === 'image') {
        result = await container.nexmoService.viber.sendImage(
          senderId, recipient, url, `rec_${record.id}`,
          category, viberTtl,
          applicationId, privateKey, axios,
        );
      } else if (type === 'viber_template') {
        result = await container.nexmoService.viber.sendTemplate(
          senderId, recipient,
          text, url, caption, actionUrl,
          `rec_${record.id}`, category, viberTtl,
          applicationId, privateKey, axios,
        );
      }

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastFacebook = async (record, axios) => {
    try {
      const {
        recipient, cmpTemplate, cmpParameters, cmpMedia,
      } = record;
      const { type } = cmpMedia || {};
      const {
        facebookTag, category, body, cmpChannel,
      } = cmpTemplate;
      const { senderId, cmpApplication } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};

      let media = cmpMedia;
      if (type === 'text') {
        const parameters = cmpParameters
          .sort((a, b) => a.order - b.order)
          .map(cmpParameter => cmpParameter.parameter);
        media = container.templateService.getText(body, parameters);
      }

      const result = await container.nexmoService.facebook.sendMedia(
        senderId, recipient, type, media, `rec_${record.id}`,
        category, facebookTag,
        applicationId, privateKey, axios,
      );

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  const blastRecord = async (record) => {
    try {
      const { cmpTemplate } = record;
      const { cmpChannel } = cmpTemplate;
      const { id, channel, tps } = cmpChannel;

      const startTime = new Date().getTime();
      const axios = container.rateLimiterService.getAxios(id, channel, tps);

      let result;
      if (channel === 'sms') {
        result = await blastSms(record, axios);
      } else if (channel === 'whatsapp') {
        result = await blastWhatsapp(record, axios);
      } else if (channel === 'facebook') {
        result = await blastFacebook(record, axios);
      } else if (channel === 'viber') {
        result = await blastViber(record, axios);
      }
      L.debug(`Blast Result - ${record.id}`, result);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Blast Record - ${record.id}): ${duration}ms`);

      await updateRecordSendTime(record);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastRecords = async (records) => {
    try {
      const startTime = new Date().getTime();

      const promises = records.map(blastRecord);
      const results = await Promise.all(promises);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Blast Records): ${duration}ms`);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

  const runIndefinitely = async (blastTime, blastsMade) => {
    try {
      const { recordsPerBatch, secondsPerBatch } = container.config.blaster;
      const records = await getRecords(recordsPerBatch);
      L.debug(`Number of Records: ${records.length}`);

      // Prepare
      await prepareRecords(records);

      // Wait
      const currentTime = new Date().getTime();
      const waitTime = blastTime - currentTime;
      if (waitTime > 0) {
        await wait(waitTime);
      }
      L.debug('Wait Over');

      // Make Blasts
      const blastsStart = new Date().getTime();
      await blastRecords(records);
      const blastsEnd = new Date().getTime();
      L.debug('Blasts made');
      L.debug(`Time Taken (Wait for Blasts): ${blastsEnd - blastsStart}`);

      const newBlast = records.length;
      const totalBlastsMade = blastsMade + newBlast;

      const nextBlastTime = blastsStart + (secondsPerBatch * 1000);
      return runIndefinitely(nextBlastTime, totalBlastsMade);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const run = async () => {
    try {
      // Check if Process Active Hour is OK
      const startTime = new Date();
      L.info(`Blaster Process started at ${startTime}`);

      await runIndefinitely(new Date().getTime(), 0);

      const endTime = new Date();
      L.info(`Blaster Process ended at ${endTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    run,
  };
};