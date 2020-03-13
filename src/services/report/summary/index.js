export default (container) => {
  const { L } = container.defaultLogger('Report Service - Summary');

  const isUuid = (uuid) => {
    const uuidRegex = '^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$';
    const result = new RegExp(uuidRegex).test(uuid);
    return result;
  };

  const getSummaries = async (cmpCampaignId, from, to, limit, offset) => {
    try {
      const { databaseService, Sequelize } = container;
      const { client: rawClient } = databaseService;
      let sql = `
select 
ACampaigns.id, 
ACampaigns.name, 
CmpRecordMessages.status,
COUNT(*) as statusCount
from (
select * from CmpCampaigns
where CmpCampaigns.deleted=0
__CAMPAIGN_ID__
order by CmpCampaigns.id asc
__LIMIT__
__OFFSET__
) as ACampaigns
left join CmpRecords
on ACampaigns.id=CmpRecords.cmpCampaignId 
and CmpRecords.deleted=0
left join CmpRecordMessages
on CmpRecords.id=CmpRecordMessages.cmpRecordId 
and CmpRecordMessages.deleted=0
__FROM_TO__
group by ACampaigns.id, ACampaigns.name, CmpRecordMessages.status

    `.replace(/\n/g, ' ');

      if (cmpCampaignId && cmpCampaignId !== '') {
        const isValid = isUuid(cmpCampaignId);
        console.log(isValid);
        sql = sql.replace(/__CAMPAIGN_ID__/g, `and CmpCampaigns.id='${cmpCampaignId}'`);
      } else {
        sql = sql.replace(/__CAMPAIGN_ID__/g, '');
      }

      if (from && to) {
        const timePattern = 'YYYY-MM-DD HH:mm:ss';
        const fromText = container.moment(from).format(timePattern);
        const toText = container.moment(to).format(timePattern);
        sql = sql.replace(/__FROM_TO__/g, `and CmpRecordMessages.statusTime between '${fromText}' and '${toText}'`);
      } else {
        sql = sql.replace(/__FROM_TO__/g, '');
      }

      if (limit) {
        const sanitizedLimit = parseInt(limit, 10) || -1;
        if (sanitizedLimit >= 0) {
          sql = sql.replace(/__LIMIT__/g, `limit ${sanitizedLimit}`);
        } else {
          sql = sql.replace(/__LIMIT__/g, '');
        }
      } else {
        sql = sql.replace(/__LIMIT__/g, '');
      }

      if (offset) {
        const sanitizedOffset = parseInt(offset, 10) || -1;
        if (sanitizedOffset >= 0) {
          sql = sql.replace(/__OFFSET__/g, `offset ${sanitizedOffset}`);
        } else {
          sql = sql.replace(/__OFFSET__/g, '');
        }
      } else {
        sql = sql.replace(/__OFFSET__/g, '');
      }

      const items = await rawClient.query(sql, { type: Sequelize.QueryTypes.SELECT });
      const summary = {};
      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        const {
          id, name, status, statusCount,
        } = item;
        if (summary[id] == null) {
          summary[id] = {
            id,
            name,
            summary: {},
          };
        }
        summary[id].summary[status] = statusCount;
      }

      const summaryList = Object.keys(summary).map((key) => {
        const data = summary[key];
        data.summary.total = Object.keys(data.summary).reduce(
          (previousValue, currentValue) => data.summary[currentValue] + previousValue, 0,
        );
        return data;
      });
      return Promise.resolve(summaryList);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOverallSummary = async (from, to, limit = 30, offset = 0) => {
    // from, to - REQUIRED
    try {
      const campaigns = await getSummaries(null, from, to, limit, offset);
      const summary = {
        results: campaigns,
        limit,
        offset,
      };
      return Promise.resolve(summary);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getCampaignSummary = async (cmpCampaignId, from, to) => {
    // cmpCampaignId - REQUIRED
    // from, to - Optional
    try {
      let summaries = [];
      if (from && to) {
        summaries = await getSummaries(cmpCampaignId, from, to);
      } else {
        summaries = await getSummaries(cmpCampaignId);
      }

      if (summaries.length > 0) {
        const summary = summaries[0];
        return Promise.resolve(summary);
      }
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getOverallSummary,
    getCampaignSummary,
  };
};
