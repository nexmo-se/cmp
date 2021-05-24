/**
 * Blaster Process
 * Get records from database and send
 */

import CampaignDetailReporter from './campaignDetail';

export default (container) => {
  const { L } = container.defaultLogger('Blaster Process');

  const campaignCache = {};

  const campaignDetailReporter = CampaignDetailReporter(container);

  const getCampaigns = async (cmpCampaignIds) => {
    try {
      const campaigns = [];
      const missingCampaignIds = [];

      // Get From Cache
      const startTime1 = new Date().getTime();
      for (let i = 0; i < cmpCampaignIds.length; i += 1) {
        const cmpCampaignId = cmpCampaignIds[i];

        const campaign = campaignCache[cmpCampaignId];
        if (campaign == null) {
          missingCampaignIds.push(cmpCampaignId);
        } else {
          campaigns.push(campaign);
        }
      }
      const endTime1 = new Date().getTime();
      L.debug(`Time Taken (Find Campaign Cache): ${endTime1 - startTime1}ms`);

      if (missingCampaignIds.length > 0) {
        // Get From Database
        const startTime2 = new Date().getTime();
        const { CmpCampaign } = container.persistenceService;
        const criteria = { id: missingCampaignIds };
        const dbCampaigns = await CmpCampaign.findCampaigns(criteria);
        const endTime2 = new Date().getTime();
        L.debug(`Time Taken (Find Campaign Database): ${endTime2 - startTime2}ms`);

        // Merge
        const startTime3 = new Date().getTime();
        for (let i = 0; i < dbCampaigns.length; i += 1) {
          const dbCampaign = dbCampaigns[i];
          // Add to Return list
          campaigns.push(dbCampaign);

          // Add to Cache
          campaignCache[dbCampaign.id] = dbCampaign;
        }
        const endTime3 = new Date().getTime();
        L.debug(`Time Taken (Find Campaign Merge): ${endTime3 - startTime3}ms`);
      }

      return Promise.resolve(campaigns);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaign = async (cmpCampaignId, changes) => {
    try {
      // Update to Database
      const startTime1 = new Date().getTime();
      const { CmpCampaign } = container.persistenceService;
      const result = await CmpCampaign.updateCampaign(cmpCampaignId, changes);
      const endTime1 = new Date().getTime();
      L.debug(`Time Taken (Update Campaign Database): ${endTime1 - startTime1}ms`);

      // Update to Cache
      const startTime2 = new Date().getTime();
      const campaign = campaignCache[cmpCampaignId];
      if (campaign != null) {
        campaignCache[cmpCampaignId] = Object.assign({}, campaign, changes);
      }
      const endTime2 = new Date().getTime();
      L.debug(`Time Taken (Update Campaign Cache): ${endTime2 - startTime2}ms`);

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

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

  const prepareRecordsBulk = async (records) => {
    try {
      if (records.length === 0) {
        return Promise.resolve();
      }

      const { CmpRecord } = container.persistenceService;
      const changes = {
        status: 'queuing',
        statusTime: new Date(),
      };

      const ids = records.map(record => record.id);
      const criteria = {
        id: ids,
        status: 'pending',
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
      if (records.length === 0) {
        return Promise.resolve();
      }

      const { CmpRecord } = container.persistenceService;
      const criteria = {
        id: records.map(record => record.id),
        status: ['queuing', 'pending'],
      };
      const changes = {
        status: 'requested',
        statusTime: new Date(),
        sendTime: new Date(),
      };

      const startTime = new Date().getTime();
      const updatedRecord = await CmpRecord.updateRecords(criteria, changes, true, false, {});
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Update Record Send Time Bulk: ${duration}ms`);
      return Promise.resolve(updatedRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordErrorBulk = async (records) => {
    try {
      if (records.length === 0) {
        return Promise.resolve();
      }

      const { CmpRecord } = container.persistenceService;
      const criteria = {
        id: records.map(record => record.id),
        status: ['queuing', 'pending'],
      };
      const changes = {
        status: 'error',
        statusTime: new Date(),
        sendTime: new Date(),
      };

      const startTime = new Date().getTime();
      const updatedRecord = await CmpRecord.updateRecords(criteria, changes, true, false, {});
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Update Record Error Time Bulk: ${duration}ms`);
      return Promise.resolve(updatedRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessagesBulk = async (records) => {
    try {
      if (records.length === 0) {
        return Promise.resolve();
      }

      const startTime = new Date().getTime();

      const { CmpRecordMessage } = container.persistenceService;
      const recordMessages = await CmpRecordMessage.createRecordMessageBulk(records);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Create Record Messages Bulk): ${duration}ms`);
      return Promise.resolve(recordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const publishCampaignStatusAudit = async (campaign, status) => {
    try {
      const { saveCampaignAudits } = container.config.audit;
      const { CmpCampaignStatusAudit } = container.persistenceService;

      const statusTime = new Date();
      const startTime = new Date().getTime();

      let cmpCampaignStatusAudit;
      if (saveCampaignAudits) {
        cmpCampaignStatusAudit = await CmpCampaignStatusAudit
          .createCampaignStatusAudit(campaign.id, status, statusTime);
      }

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Publish Campaign Status Audit): ${duration}ms`);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaignStatuses = async (campaigns, isStart = true, isEnd = true) => {
    try {
      if (campaigns.length === 0) {
        return Promise.resolve();
      }

      // const { CmpCampaign } = container.persistenceService;
      // const criteria = { id: cmpCampaignIds };
      // const cmpCampaigns = await CmpCampaign.findCampaigns(criteria);

      const campaignTypes = {};
      for (let i = 0; i < campaigns.length; i += 1) {
        const { id, campaignType } = campaigns[i];
        campaignTypes[id] = campaignType;
      }

      const cmpCampaignIds = campaigns.map(campaign => campaign.id);
      const cmpCampaigns = await getCampaigns(cmpCampaignIds);

      const promises = cmpCampaigns.map(
        cmpCampaign => updateCampaignStatus(cmpCampaign, isStart, isEnd, campaignTypes[cmpCampaign.id]),
      );
      const results = await Promise.all(promises);
      return Promise.resolve(results);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateCampaignStatus = async (campaign, isStart = true, isEnd = true, campaignType) => {
    try {
      const { generateReport, reportDelay } = container.config.blaster;
      const { CmpRecord } = container.persistenceService;
      const cmpCampaignId = campaign.id;
      const currentTime = new Date();

      const changes = { campaignType };
      if (isStart && campaign.status === 'pending') {
        // Start, first record
        changes.status = 'started';
        changes.statusTime = currentTime;
        changes.actualStartDate = currentTime;
        L.trace(`Updating Campaign ${cmpCampaignId} Status to started at ${currentTime}`);

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
          // End, last record
          const actualStartDate = campaign.actualStartDate || currentTime;
          changes.actualEndDate = currentTime;
          changes.actualDuration = currentTime.getTime() - actualStartDate.getTime();

          if (generateReport) {
            // Reporting State
            changes.status = 'reporting';
            changes.statusTime = currentTime;
            L.trace(`Updating Campaign ${cmpCampaignId} Status to reporting at ${currentTime}`);

            await publishCampaignStatusAudit(campaign, 'reporting');

            // Generate Report
            const { filePath } = container.config.report;
            const fileName = `${cmpCampaignId}.csv`;
            const fullPath = `${filePath}/${fileName}`;
            setTimeout(() => campaignDetailReporter.generateCampaign(cmpCampaignId, fullPath)
              .then(() => publishCampaignStatusAudit(campaign, 'completed'))
              // .then(() => CmpCampaign.updateCampaign(cmpCampaignId, {
              //   status: 'completed',
              //   statusTime: new Date(),
              // })), reportDelay * 1000);
              .then(() => updateCampaign(cmpCampaignId, {
                status: 'completed',
                statusTime: new Date(),
              })), reportDelay * 1000);
          } else {
            // Direct Complete
            changes.status = 'completed';
            changes.statusTime = currentTime;
            L.trace(`Updating Campaign ${cmpCampaignId} Status to completed at ${currentTime}`);

            await publishCampaignStatusAudit(campaign, 'completed');
          }
        }
      }

      if (Object.keys(changes).length === 0) {
        return Promise.resolve();
      }

      const startTime = new Date().getTime();
      // const result = await CmpCampaign.updateCampaign(cmpCampaignId, changes);
      const result = await updateCampaign(cmpCampaignId, changes);
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
        recipient, text, 'none', senderId, apiKey, apiSecret,
        smsUseSignature, signatureSecret, signatureMethod, axios,
      );

      const messageIds = result.messages.map(message => message['message-id']);
      const prices = result.messages.map(message => message['message-price'] || 0);
      return Promise.resolve({
        messageIds,
        prices,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastWhatsapp = async (record, axios) => {
    try {
      const { clientRefPrefix } = container.config.blaster;
      const {
        recipient, cmpTemplate, cmpParameters, cmpMedia,
      } = record;
      const { mediaType: type } = cmpMedia || {};
      const { whatsappTemplateNamespace, whatsappTemplateName, cmpChannel } = cmpTemplate;
      const { senderId, cmpApplication } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};

      const parameters = cmpParameters
        .sort((a, b) => a.order - b.order)
        .map(cmpParameter => cmpParameter.parameter);
      const result = await container.nexmoService.whatsapp.sendTemplate(
        senderId, recipient, whatsappTemplateNamespace, whatsappTemplateName,
        type || 'none', cmpMedia, parameters, `${clientRefPrefix}${record.id}`,
        applicationId, privateKey, axios,
      );

      const messageIds = [result.message_uuid];
      return Promise.resolve({
        messageIds,
        prices: [0],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastViber = async (record, axios) => {
    try {
      const { clientRefPrefix } = container.config.blaster;
      const {
        recipient, cmpTemplate, cmpParameters, cmpMedia,
      } = record;
      const { mediaType: type } = cmpMedia || {};
      const {
        viberTtl = 600, category = 'transaction', body, cmpChannel,
      } = cmpTemplate;
      const { senderId, cmpApplication } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};

      const parameters = cmpParameters
        .sort((a, b) => a.order - b.order)
        .map(cmpParameter => cmpParameter.parameter);
      const text = container.templateService.getText(body, parameters);

      let result;
      if (type == null || type === 'none') {
        L.trace('Sending Viber Text');
        result = await container.nexmoService.viber.sendText(
          senderId, recipient, text, `${clientRefPrefix}${record.id}`,
          category, viberTtl,
          applicationId, privateKey, axios,
        );
      } else if (type === 'image') {
        L.trace('Sending Viber Image');
        const { url } = cmpMedia.cmpMediaImage;
        result = await container.nexmoService.viber.sendImage(
          senderId, recipient, url, `${clientRefPrefix}${record.id}`,
          category, viberTtl,
          applicationId, privateKey, axios,
        );
      } else if (type === 'viber_template') {
        L.trace('Sending Viber Template');
        const { url, caption, actionUrl } = cmpMedia.cmpMediaViberTemplate;
        result = await container.nexmoService.viber.sendTemplate(
          senderId, recipient,
          text, url, caption, actionUrl,
          `${clientRefPrefix}${record.id}`, category, viberTtl,
          applicationId, privateKey, axios,
        );
      }

      const messageIds = [result.message_uuid];
      return Promise.resolve({
        messageIds,
        prices: [0],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastFacebook = async (record, axios) => {
    try {
      const { clientRefPrefix } = container.config.blaster;
      const {
        recipient, cmpTemplate, cmpParameters, cmpMedia,
      } = record;
      const { mediaType: type } = cmpMedia || {};
      const {
        facebookTag, category, body, cmpChannel,
      } = cmpTemplate;
      const { senderId, cmpApplication } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};

      let media = cmpMedia;
      if (type === 'none') {
        L.trace('Sending Facebook Text');
        const parameters = cmpParameters
          .sort((a, b) => a.order - b.order)
          .map(cmpParameter => cmpParameter.parameter);
        media = container.templateService.getText(body, parameters);
      }

      const result = await container.nexmoService.facebook.sendMedia(
        senderId, recipient, type, media, `${clientRefPrefix}${record.id}`,
        category, facebookTag,
        applicationId, privateKey, axios,
      );

      const messageIds = [result.message_uuid];
      return Promise.resolve({
        messageIds,
        prices: [0],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastVoice = async (record, axios) => {
    try {
      const { clientRefPrefix } = container.config.blaster;
      const { recipient, cmpTemplate, cmpParameters, cmpVoice, } = record;
      const { body, cmpChannel, } = cmpTemplate;
      const { senderId, cmpApplication } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};
      const { voiceType, language, style, streamUrl, answerUrl } = cmpVoice || {};


      let result;
      if (voiceType && voiceType.toLowerCase() === 'tts') {
        const parameters = cmpParameters
          .sort((a, b) => a.order - b.order)
          .map(cmpParameter => cmpParameter.parameter);
        const text = container.templateService.getText(body, parameters);

        result = await container.nexmoService.voice.sendTts(
          senderId, recipient, text, language, style, `${clientRefPrefix}${record.id}`,
          applicationId, privateKey, axios,
        );
      } else if (voiceType && voiceType.toLowerCase() === 'stream') {
        result = await container.nexmoService.voice.sendStream(
          senderId, recipient, streamUrl, `${clientRefPrefix}${record.id}`,
          applicationId, privateKey, axios,
        );
      } else if (voiceType && voiceType.toLowerCase() === 'answer') {
        return Promise.reject(new Error('Answer URL not supported yet'));
      } else {
        return Promise.reject(new Error(`Unsupported Voice Type: ${voiceType}`));
      }

      const messageIds = [result.uuid];
      return Promise.resolve({
        messageIds,
        prices: [0],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastNumberInsight = async (record, axios) => {
    try {
      const { recipient, cmpTemplate, cmpCampaign } = record;
      const { niCnam = false } = cmpCampaign;
      const { body, cmpChannel } = cmpTemplate;
      const { cmpApiKey } = cmpChannel;
      const { apiKey, apiSecret } = cmpApiKey;

      const result = await container.nexmoService.numberInsight.sendAdvanced(
        apiKey, apiSecret, recipient, niCnam, axios
      );

      if (result.status === 1) {
        throw new Error('ni_busy');
      }

      return Promise.resolve({
        messageIds: [result.request_id],
        prices: [result.request_price || 0],
      });
    } catch (error) {
      return Promise.reject(error);
    }
  };


  const blastRecord = async (record) => {
    try {
      const { cmpTemplate } = record;
      const { cmpChannel } = cmpTemplate;
      const { channel, tps } = cmpChannel;
      const { useMockBlast } = container.config.blaster;

      const axios = container.rateLimiterService.getAxios(cmpChannel.id, channel, tps);

      let result;
      if (useMockBlast) {
        const messageId = container.uuid();
        result = [messageId];
      } else if (channel === 'sms') {
        result = await blastSms(record, axios);
      } else if (channel === 'whatsapp') {
        result = await blastWhatsapp(record, axios);
      } else if (channel === 'facebook') {
        result = await blastFacebook(record, axios);
      } else if (channel === 'viber') {
        result = await blastViber(record, axios);
      } else if (channel === 'voice') {
        result = await blastVoice(record, axios);
      } else if (channel === 'number_insight') {
        result = await blastNumberInsight(record, axios);
      }
      L.trace(`Blast Result - ${record.id}`, result);

      // await updateRecordSendTime(record);
      // await createRecordMessages(record, result);
      return Promise.resolve({
        cmpRecordId: record.id,
        messageIds: result.messageIds,
        prices: result.prices,
      });
    } catch (error) {
      if (error.response != null) {
        L.error(error.message);
        if (error.response.status === 429) {
          L.error('Too many request (429) detected, put back into queue');
          return blastRecord(record);
        }
      } else if (error.message === 'socket hang up') {
        L.error('Socket Hang Up detected, put back into queue');
        return blastRecord(record);
      } else if (error.message === 'ni_busy') {
        L.error('Busy detected for Number Insight, put back into queue');
        return blastRecord(record);
      } else {
        L.error(error.message, error);
      }
      return Promise.resolve({
        cmpRecordId: record.id,
        messageIds: [],
        prices: [],
        error,
      });
    }
  };

  const blastRecords = async (records) => {
    try {
      const startTime = new Date().getTime();

      const promises = records.map(blastRecord);
      const results = await Promise.all(promises);
      L.trace('Record Blast Results', results);

      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      L.debug(`Time Taken (Blast Records): ${duration}ms`);

      const postStartTime = new Date().getTime();

      const sentRecords = [];
      const errorRecords = [];
      for (let i = 0; i < results.length; i += 1) {
        const record = records[i];
        const result = results[i];
        if (result.messageIds == null) {
          errorRecords.push(record);
        } else if (result.messageIds.length <= 0) {
          errorRecords.push(record);
        } else if (result.messageIds[0] == null) {
          errorRecords.push(record);
        } else {
          sentRecords.push(record);
        }
      }
      await updateRecordSendTimeBulk(sentRecords);
      await updateRecordErrorBulk(errorRecords);

      await createRecordMessagesBulk(results);
      const postEndTime = new Date().getTime();
      const postDuration = [postEndTime] - postStartTime;
      L.debug(`Time Taken (PostBlast Records): ${postDuration}ms`);

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
      const { cmpCampaignId, cmpTemplate } = record;
      const { cmpChannel } = cmpTemplate || {};
      const { channel } = cmpChannel || {};
      
      campaignsMap[cmpCampaignId] = channel;
    }

    const campaignIds = Object.keys(campaignsMap);
    return campaignIds.map(campaignId => ({
      id: campaignId,
      campaignType: campaignsMap[campaignId],
    }));
  };

  // Single loop workings
  const runSingle = async (records) => {
    try {
      if (records.length === 0) {
        return Promise.resolve();
      }

      const campaigns = getUniqueCampaigns(records);
      // Update Campaign
      const campaignUpdateStart1 = new Date().getTime();
      updateCampaignStatuses(campaigns, true, false)
        .then(() => {
          const campaignUpdateEnd1 = new Date().getTime();
          L.trace('Campaign Updates 1 made');
          L.debug(`Time Taken (Campaign Updates 1): ${campaignUpdateEnd1 - campaignUpdateStart1}ms`);
        })
        .catch((error) => {
          L.error(error);
        });

      // Make Blasts
      const blastsStart = new Date().getTime();
      await blastRecords(records);
      const blastsEnd = new Date().getTime();
      L.trace('Blasts made');
      L.debug(`Time Taken (Wait for Blasts): ${blastsEnd - blastsStart}ms`);

      // Update Campaign
      const campaignUpdateStart2 = new Date().getTime();
      updateCampaignStatuses(campaigns, false, true)
        .then(() => {
          const campaignUpdateEnd2 = new Date().getTime();
          L.trace('Campaign Updates 2 made');
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

  // This will run in a loop
  const runIndefinitely = async (blastTime, blastsMade) => {
    try {
      const startTime = new Date().getTime();
      const { recordsPerBatch, secondsPerBatch } = container.config.blaster;
      const records = await getRecords(recordsPerBatch);
      L.info(`Number of Records: ${records.length}`);

      // Prepare
      await prepareRecordsBulk(records);

      // Wait
      const currentTime = new Date().getTime();
      const waitTime = blastTime - currentTime;
      if (waitTime > 0) {
        L.trace(`Start to Wait for ${waitTime}ms`);
        const waitStart = new Date().getTime();
        await wait(waitTime);
        const waitEnd = new Date().getTime();
        L.debug(`Time Taken (Wait): ${waitEnd - waitStart}ms`);
      }
      L.trace('Wait Over');

      const blastsStart = new Date().getTime();
      const newBlast = records.length;
      runSingle(records)
        .then(() => L.trace('Single Ended'))
        .catch((error) => {
          L.error(error);
          throw error;
        });

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Iteration): ${endTime - startTime}ms`);


      const totalBlastsMade = blastsMade + newBlast;

      const nextBlastTime = blastsStart + (secondsPerBatch * 1000);
      return runIndefinitely(nextBlastTime, totalBlastsMade); // Run next loop
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
