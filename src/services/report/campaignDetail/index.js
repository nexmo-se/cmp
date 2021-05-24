/**
 * Campaign Detail Report Service
 * Create detailed campaign report - Record Level
 */

export default (container) => {
  const { L } = container.defaultLogger('Report Service - Campaign Detail');

  const isUuid = (uuid) => {
    const uuidRegex = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';
    const result = new RegExp(uuidRegex).test(uuid);
    return result;
  };

  const mapCmpRecord = (cmpRecord) => {
    const mappedCmpRecord = {
      id: cmpRecord.id,
      recipient: cmpRecord.recipient,
      cmpChannel: {
        id: cmpRecord.cmpTemplate.cmpChannel.id,
        recipient: cmpRecord.cmpTemplate.cmpChannel.name,
        channel: cmpRecord.cmpTemplate.cmpChannel.channel,
      },
      cmpTemplate: {
        id: cmpRecord.cmpTemplate.id,
        name: cmpRecord.cmpTemplate.name,
      },
    };


    if (cmpRecord.cmpRecordMessages && cmpRecord.cmpRecordMessages.length > 0) {
      const cmpRecordMessage = cmpRecord.cmpRecordMessages[0];
      mappedCmpRecord.cmpRecordMessages = cmpRecord.cmpRecordMessages[0];
      mappedCmpRecord.price = cmpRecord.cmpRecordMessages
        .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.price), 0);
      mappedCmpRecord.status = cmpRecordMessage.status;
      mappedCmpRecord.statusTime = cmpRecordMessage.statusTime;
    } else {
      mappedCmpRecord.price = 0;
      mappedCmpRecord.status = cmpRecord.status;
      mappedCmpRecord.statusTime = cmpRecord.statusTime;
    }
    mappedCmpRecord.submitTime = cmpRecord.sendTime;
    return mappedCmpRecord;
  };

  const getCampaignDetails = async (cmpCampaignId, limit = 30, offset = 0) => {
    try {
      const isValid = isUuid(cmpCampaignId);
      if (!isValid) {
        return Promise.reject(new container.BadRequestError('Invalid cmpCampaignId, expected a proper UUID for Campaign ID'));
      }

      const { CmpRecord } = container.persistenceService;
      const criteria = { cmpCampaignId };
      const cmpRecords = await CmpRecord.findRecords(criteria, true, { limit, offset });

      const report = {
        results: cmpRecords.map(mapCmpRecord),
        limit,
        offset,
      };

      return Promise.resolve(report);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getCampaignDetails,
  };
};
