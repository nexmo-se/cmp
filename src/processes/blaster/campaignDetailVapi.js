/**
 * Generate Voice API Reports
 */

export default (container) => {
  const { L } = container.defaultLogger('Report Process - Campaign Detail VAPI');

  const appendHeader = async (filePath) => {
    try {
      const startTime = new Date().getTime();

      // Write Header
      const header = [[
        'id',
        'recipient',
        'channel',
        'template',
        'status',

        'status time',
        'submit time',

        'from',
        'uuid',
        'conversation uuid',
        'direction',
        'timestamp',
        'start time',
        'end time',
        'duration',
        'rate',
        'price',
        'network',
        'detail',
        'clientRef',
      ]];
      const headerCsv = await container.csvService.toCsv(header);
      await container.fileService.writeContent(filePath, headerCsv);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Append Header): ${endTime - startTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const appendContent = async (filePath, records) => {
    try {
      const startTime = new Date().getTime();

      // Write Content
      const timePattern = 'YYYY/MM/DD HH:mm:ss';
      const content = records.map(record => {
        // Get Status Audit
        const { cmpRecordMessages = {} } = record;
        const { cmpRecordMessageStatusAudits = [] } = cmpRecordMessages;

        // Use Completed Status
        let statusAudit = {};
        for (let i = 0; i < cmpRecordMessageStatusAudits.length; i += 1) {
          const cmpRecordMessageStatusAudit = cmpRecordMessageStatusAudits[i];
          if (cmpRecordMessageStatusAudit.status === 'completed') {
            statusAudit = cmpRecordMessageStatusAudit;
          }
        }

        // Return proper array
        return [
          record.id,
          record.recipient,
          (record.cmpChannel || {}).channel,
          (record.cmpTemplate || {}).name,
          record.status,

          record.statusTime ? container.moment(record.statusTime).format(timePattern) : null,
          record.submitTime ? container.moment(record.submitTime).format(timePattern) : null,

          (statusAudit || {}).from,
          (statusAudit || {}).uuid,
          (statusAudit || {}).conversationUuid,
          (statusAudit || {}).direction,
          (statusAudit || {}).timestamp,
          (statusAudit || {}).startTime,
          (statusAudit || {}).endTime,
          (statusAudit || {}).duration,
          (statusAudit || {}).rate,
          (statusAudit || {}).price,
          (statusAudit || {}).network,
          (statusAudit || {}).detail,
          (statusAudit || {}).clientRef,
        ];
      });

      const contentCsv = await container.csvService.toCsv(content);
      await container.fileService.writeContent(filePath, contentCsv);

      const endTime = new Date().getTime();
      L.debug(`Time Taken (Append Content) [${records.length}]: ${endTime - startTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCampaignNextBatch = async (cmpCampaignId, filePath, limit, offset) => {
    try {
      const { campaignDetail: campaignDetailService } = container.reportService;
      const paginatedResults = await campaignDetailService
        .getCampaignDetails(cmpCampaignId, limit, offset);

      const { results } = paginatedResults;

      await appendContent(filePath, results);

      if (results.length <= 0) {
        return Promise.resolve();
      }
      return generateCampaignNextBatch(cmpCampaignId, filePath, limit, offset + results.length);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const generateCampaign = async (cmpCampaignId, filePath) => {
    try {
      const { batchLimit } = container.config.report;
      await appendHeader(filePath);
      await generateCampaignNextBatch(cmpCampaignId, filePath, batchLimit, 0);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    generateCampaign,
  };
};
