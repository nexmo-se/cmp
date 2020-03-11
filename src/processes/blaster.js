export default (container) => {
  const { L } = container.defaultLogger('Blaster Process');

  const getRecords = async (recordSize) => {
    try {
      const startTime = new Date().getTime();
      const { CmpRecord } = container.persistenceService;
      const currentTime = new Date();
      const records = await CmpRecord.getActiveRecords(
        recordSize, currentTime, false,
      );
      L.debug(`Records Retrieved: ${records.length}`);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Get Records): ${endTime - startTime}ms`);
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

  const prepareRecordsBulk = async (records) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const changes = {
        status: 'queuing',
        statusTime: new Date(),
      };

      const ids = records.map(record => record.id);
      const criteria = {
        id: ids,
      };

      const startTime = new Date().getTime();
      const results = await CmpRecord.updateRecords(criteria, changes, true, false, {});
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Prepare Records Bulk): ${duration}ms`);

      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordSendTimeBulk = async (records) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const criteria = {
        id: records.map(record => record.id),
      };
      const changes = {
        status: 'requested',
        statusTime: new Date(),
        sendTime: new Date(),
      };

      const startTime = new Date().getTime();
      const updatedRecord = await CmpRecord.updateRecords(criteria, changes, true, false);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Update Record Send Time Bulk: ${duration}ms`);
      return Promise.resolve(updatedRecord);
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
      const updatedRecord = await CmpRecord.updateRecord(recordId, changes, true, false);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Update Record Send Time - ${recordId}): ${duration}ms`);
      return Promise.resolve(updatedRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessage = async (record, messageId) => {
    try {
      const { CmpRecordMessage } = container.persistenceService;
      const recordMessages = await CmpRecordMessage.createRecordMessage(record.id, messageId);
      return Promise.resolve(recordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessages = async (record, messageIds) => {
    try {
      const startTime = new Date().getTime();
      const promises = messageIds.map(messageId => createRecordMessage(record, messageId));
      const recordMessages = await Promise.all(promises);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Create Record Messages): ${duration}ms`);
      return Promise.resolve(recordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessagesBulk = async (records) => {
    try {
      const startTime = new Date().getTime();

      const { CmpRecordMessage } = container.persistenceService;
      const recordMessages = await CmpRecordMessage.createRecordMessageBulk(records);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Create Record Messages): ${duration}ms`);
      return Promise.resolve(recordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishCampaignStatusAudit = async (campaign, status) => {
    try {
      const { CmpCampaignStatusAudit } = container.persistenceService;
      const statusTime = new Date();
      const startTime = new Date().getTime();
      const cmpCampaignStatusAudit = await CmpCampaignStatusAudit
        .createCampaignStatusAudit(campaign.id, status, statusTime);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Publish Campaign Status Audit): ${duration}ms`);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaignStatuses = async (cmpCampaignIds, isStart = true, isEnd = true) => {
    try {
      const { CmpCampaign } = container.persistenceService;
      const criteria = { id: cmpCampaignIds };
      const cmpCampaigns = await CmpCampaign.findCampaigns(criteria);

      const promises = cmpCampaigns.map(
        cmpCampaign => updateCampaignStatus(cmpCampaign, isStart, isEnd),
      );
      const results = await Promise.all(promises);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaignStatus = async (campaign, isStart = true, isEnd = true) => {
    try {
      const { CmpRecord, CmpCampaign } = container.persistenceService;
      const cmpCampaignId = campaign.id;
      const currentTime = new Date();

      const changes = {};
      if (isStart && campaign.status === 'pending') {
        // Start, first record
        changes.status = 'started';
        changes.statusTime = currentTime;
        changes.actualStartDate = currentTime;
        L.debug(`Updating Campaign ${cmpCampaignId} Status to started at ${currentTime}`);

        await publishCampaignStatusAudit(campaign, 'started');
      }

      if (isEnd) {
        const countStartTime = new Date().getTime();
        const recordsCount = await CmpRecord
          .countPendingAndQueuingRecordsByCampaignId(cmpCampaignId);
        const countEndTime = new Date().getTime();
        const duration = countEndTime - countStartTime;
        L.debug(`Time Taken (Count Pending/Queuing Records): ${duration}ms`);

        if (recordsCount === 0) {
          const actualStartDate = campaign.actualStartDate || currentTime;
          // End, last record
          changes.status = 'completed';
          changes.statusTime = currentTime;
          changes.actualEndDate = currentTime;
          changes.actualDuration = currentTime.getTime() - actualStartDate.getTime();
          L.debug(`Updating Campaign ${cmpCampaignId} Status to completed at ${currentTime}`);

          await publishCampaignStatusAudit(campaign, 'completed');
        }
      }

      if (Object.keys(changes).length === 0) {
        return Promise.resolve();
      }

      const startTime = new Date().getTime();
      const result = await CmpCampaign.updateCampaign(cmpCampaignId, changes);
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Update Campaign Status): ${duration}ms`);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastSms = async (record, axios) => {
    try {
      const { recipient, cmpTemplate, cmpParameters } = record;
      const { body, cmpChannel } = cmpTemplate;
      const { senderId, cmpApiKey, smsUseSignature } = cmpChannel;
      const {
        apiKey, apiSecret, signatureSecret, signatureMethod,
      } = cmpApiKey;

      const parameters = cmpParameters
        .sort((a, b) => a.order - b.order)
        .map(cmpParameter => cmpParameter.parameter);
      const text = container.templateService.getText(body, parameters);

      const result = await container.nexmoService.sms.sendText(
        recipient, text, 'text', senderId, apiKey, apiSecret,
        smsUseSignature, signatureSecret, signatureMethod, axios,
      );

      const messageIds = result.messages.map(message => message['message-id']);
      return Promise.resolve(messageIds);
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

      const messageIds = [result.message_uuid];
      return Promise.resolve(messageIds);
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

      const messageIds = [result.message_uuid];
      return Promise.resolve(messageIds);
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

      const messageIds = [result.message_uuid];
      return Promise.resolve(messageIds);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  const blastRecord = async (record) => {
    try {
      const { cmpTemplate } = record;
      const { cmpChannel } = cmpTemplate;
      const { channel, tps } = cmpChannel;

      const startTime = new Date().getTime();
      const axios = container.rateLimiterService.getAxios(cmpChannel.id, channel, tps);

      let result;
      if (channel === 'sms') {
        // result = await blastSms(record, axios);
        result = ['mid'];
      } else if (channel === 'whatsapp') {
        // result = await blastWhatsapp(record, axios);
        result = ['mid'];
      } else if (channel === 'facebook') {
        // result = await blastFacebook(record, axios);
        result = ['mid'];
      } else if (channel === 'viber') {
        // result = await blastViber(record, axios);
        result = ['mid'];
      }
      L.debug(`Blast Result - ${record.id}`, result);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Blast Record - ${record.id}): ${duration}ms`);

      // await updateRecordSendTime(record);
      // await createRecordMessages(record, result);
      return Promise.resolve({ cmpRecordId: record.id, messageIds: result });
    } catch (error) {
      if (error.response != null) {
        L.error(error.message);
        if (error.response.status === 429) {
          L.error('Too many request (429) detected, put back into queue');
          return blastRecord(record);
        }
      } else {
        L.error(error.message, error);
      }
      return Promise.reject(error);
    }
  };

  const blastRecords = async (records) => {
    try {
      const startTime = new Date().getTime();

      const promises = records.map(blastRecord);
      const results = await Promise.all(promises);
      L.debug(results);

      await updateRecordSendTimeBulk(records);
      // await createRecordMessagesBulk(results);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Blast Records): ${duration}ms`);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

  const getUniqueCampaigns = (records) => {
    const campaignsMap = {};

    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      const { cmpCampaignId } = record;
      campaignsMap[cmpCampaignId] = true;
    }

    const campaigns = Object.keys(campaignsMap);
    return campaigns;
  };

  const runSingle = async (records) => {
    try {
      const campaigns = getUniqueCampaigns(records);
      // Update Campaign
      const campaignUpdateStart1 = new Date().getTime();
      updateCampaignStatuses(campaigns, true, false)
        .then(() => {
          const campaignUpdateEnd1 = new Date().getTime();
          L.debug('Campaign Updates 1 made');
          L.debug(`Time Taken (Campaign Updates 1): ${campaignUpdateEnd1 - campaignUpdateStart1}ms`);
        })
        .catch((error) => {
          L.error(error);
        });

      // Make Blasts
      const blastsStart = new Date().getTime();
      await blastRecords(records);
      const blastsEnd = new Date().getTime();
      L.debug('Blasts made');
      L.debug(`Time Taken (Wait for Blasts): ${blastsEnd - blastsStart}ms`);

      // Update Campaign
      const campaignUpdateStart2 = new Date().getTime();
      updateCampaignStatuses(campaigns, false, true)
        .then(() => {
          const campaignUpdateEnd2 = new Date().getTime();
          L.debug('Campaign Updates 2 made');
          L.debug(`Time Taken (Campaign Updates 2): ${campaignUpdateEnd2 - campaignUpdateStart2}ms`);
        })
        .catch((error) => {
          L.error(error);
        });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const runIndefinitely = async (blastTime, blastsMade) => {
    try {
      const startTime = new Date().getTime();
      const { recordsPerBatch, secondsPerBatch } = container.config.blaster;
      const records = await getRecords(recordsPerBatch);
      L.debug(`Number of Records: ${records.length}`);

      // Prepare
      await prepareRecordsBulk(records);

      // Wait
      const currentTime = new Date().getTime();
      const waitTime = blastTime - currentTime;
      if (waitTime > 0) {
        L.debug(`Start to Wait for ${waitTime}ms`);
        const waitStart = new Date().getTime();
        await wait(waitTime);
        const waitEnd = new Date().getTime();
        L.debug(`Time Taken (Wait): ${waitEnd - waitStart}ms`);
      }
      L.debug('Wait Over');

      const blastsStart = new Date().getTime();
      const newBlast = records.length;
      runSingle(records)
        .then(() => L.debug('Single Ended'))
        .catch((error) => {
          L.error(error);
          throw error;
        });

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Iteration): ${endTime - startTime}ms`);


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
