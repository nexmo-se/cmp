/**
 * Persistence Service for CMP Campaign Status Audits
 * Create, Read, Delete and List Campaign Status Audits
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Persistence Accessor');

  const listCampaignStatusAudits = async (options = {}) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.accessors;
      const cmpCampaignStatusAudits = await CmpCampaignStatusAudit
        .listCampaignStatusAudits(options);
      return Promise.resolve(cmpCampaignStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createCampaignStatusAudit = async (
    cmpCampaignId,
    status,
    statusTime,
  ) => {
    try {
      const {
        CmpCampaignStatusAudit,
      } = container.databaseService.accessors;

      // Create CampaignStatusAudit
      const cmpCampaignStatusAudit = await CmpCampaignStatusAudit
        .createCampaignStatusAudit(
          cmpCampaignId,
          status,
          statusTime,
        );

      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readCampaignStatusAudit = async (cmpCampaignStatusAuditId) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.accessors;
      const cmpCampaignStatusAudit = await CmpCampaignStatusAudit
        .readCampaignStatusAudit(cmpCampaignStatusAuditId);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaignStatusAudit = async (cmpCampaignStatusAuditId, options = { noGet: true }) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.accessors;
      const cmpCampaignStatusAudit = await CmpCampaignStatusAudit
        .deleteCampaignStatusAudit(cmpCampaignStatusAuditId, options);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaignStatusAudits = async (criteria, options = { noGet: true }) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.accessors;
      const cmpCampaignStatusAudits = await CmpCampaignStatusAudit
        .deleteCampaignStatusAudits(criteria, options);
      return Promise.resolve(cmpCampaignStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listCampaignStatusAudits,

    createCampaignStatusAudit,
    readCampaignStatusAudit,

    deleteCampaignStatusAudit,
    deleteCampaignStatusAudits,
  };
};
