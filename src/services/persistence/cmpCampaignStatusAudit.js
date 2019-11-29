export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Persistence Accessor');

  const listCampaignStatusAudits = async () => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.accessors;
      const cmpCampaignStatusAudits = await CmpCampaignStatusAudit
        .listCampaignStatusAudits();
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
      L.debug(cmpCampaignId);
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

  const deleteCampaignStatusAudit = async (cmpCampaignStatusAuditId) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.accessors;
      const cmpCampaignStatusAudit = await CmpCampaignStatusAudit
        .deleteCampaignStatusAudit(cmpCampaignStatusAuditId);
      return Promise.resolve(cmpCampaignStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteCampaignStatusAudits = async (criteria) => {
    try {
      const { CmpCampaignStatusAudit } = container.databaseService.accessors;
      const cmpCampaignStatusAudits = await CmpCampaignStatusAudit
        .deleteCampaignStatusAudits(criteria);
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
