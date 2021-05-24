/**
 * Generate Number Insight Report
 */

export default (container) => {
  const { L } = container.defaultLogger('Report Process - Campaign Detail NI');

  const appendHeader = async (filePath) => {
    try {
      const startTime = new Date().getTime();

      // Write Header
      const header = [[
        'id',
        'mobile number',
        'channel',
        'status',
        'status message',

        'status time',
        'submit time',

        'requestId',
        'international format number',
        'national format number',
        'country code',
        'country prefix',
        'request price',
        'refund price',
        'remaining balance',
        'current carrier network code',
        'current carrier name',
        'current carrier country',
        'current carrier network type',
        'original carrier network code',
        'original carrier name',
        'original carrier country',
        'original carrier network type',
        'ported',
        'roaming status',
        'roaming country code',
        'roaming network code',
        'roaming network name',
        'caller type',
        'caller name',
        'caller first name',
        'caller last name',
        'lookup outcome',
        'lookup outcome message',
        'valid number',
        'reachable',
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
        // TODO: Get Status Audit
        const { cmpRecordMessages = {} } = record;
        const { cmpRecordMessageStatusAudits = [] } = cmpRecordMessages;
        const statusAudit = cmpRecordMessageStatusAudits.length > 0 ? cmpRecordMessageStatusAudits[0] : {};

        // Return proper array
        return [
          record.id,
          record.recipient,
          (record.cmpChannel || {}).channel,
          (statusAudit || {}).status == null ? record.status : (statusAudit || {}).status,
          (statusAudit || {}).statusMessage,

          record.statusTime ? container.moment(record.statusTime).format(timePattern) : null,
          record.submitTime ? container.moment(record.submitTime).format(timePattern) : null,

          (statusAudit || {}).requestId,
          (statusAudit || {}).internationalFormatNumber,
          (statusAudit || {}).nationalFormatNumber,
          (statusAudit || {}).countryCode,
          (statusAudit || {}).countryPrefix,
          (statusAudit || {}).requestPrice,
          (statusAudit || {}).refundPrice,
          (statusAudit || {}).remainingBalance,
          (statusAudit || {}).currentCarrierNetworkCode,
          (statusAudit || {}).currentCarrierName,
          (statusAudit || {}).currentCarrierCountry,
          (statusAudit || {}).currentCarrierNetworkType,
          (statusAudit || {}).originalCarrierNetworkCode,
          (statusAudit || {}).originalCarrierName,
          (statusAudit || {}).originalCarrierCountry,
          (statusAudit || {}).originalCarrierNetworkType,
          (statusAudit || {}).ported,
          (statusAudit || {}).roamingStatus,
          (statusAudit || {}).roamingCountryCode,
          (statusAudit || {}).roamingNetworkCode,
          (statusAudit || {}).roamingNetworkName,
          (statusAudit || {}).callerType,
          (statusAudit || {}).callerName,
          (statusAudit || {}).callerFirstName,
          (statusAudit || {}).callerLastName,
          (statusAudit || {}).lookupOutcome,
          (statusAudit || {}).lookupOutcomeMessage,
          (statusAudit || {}).validNumber,
          (statusAudit || {}).reachable,
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
