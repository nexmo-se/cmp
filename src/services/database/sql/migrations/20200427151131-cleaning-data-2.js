module.exports = {
  up: (queryInterface) => {
    const nullifyInvalidReportReportOverallSummary = () => queryInterface.sequelize.query(
      'update CmpReports set cmpReportOverallSummaryId = null where cmpReportOverallSummaryId not in (select id from CmpReportOverallSummaries)',
    );
    const nullifyInvalidReportReportCampaignSummary = () => queryInterface.sequelize.query(
      'update CmpReports set cmpReportCampaignSummaryId = null where cmpReportCampaignSummaryId not in (select id from CmpReportCampaignSummaries)',
    );
    const nullifyInvalidReportReportCampaignDetail = () => queryInterface.sequelize.query(
      'update CmpReports set cmpReportCampaignDetailId = null where cmpReportCampaignDetailId not in (select id from CmpReportCampaignDetails)',
    );
    const deleteInvalidReportCampaignDetailCampaign = () => queryInterface.sequelize.query(
      'delete from CmpReportCampaignDetails where cmpCampaignId not in (select id from CmpCampaigns)',
    );
    const deleteInvalidReportCampaignSummaryCampaign = () => queryInterface.sequelize.query(
      'delete from CmpReportCampaignSummaries where cmpCampaignId not in (select id from CmpCampaigns)',
    );

    return Promise.resolve()
      .then(nullifyInvalidReportReportOverallSummary)
      .then(nullifyInvalidReportReportCampaignSummary)
      .then(nullifyInvalidReportReportCampaignDetail)
      .then(deleteInvalidReportCampaignDetailCampaign)
      .then(deleteInvalidReportCampaignSummaryCampaign);
  },

  // This is a one way migration, undo is not possible and not necessary at this stage
  // Reason: no live customer yet
  down: () => Promise.resolve(),
};
