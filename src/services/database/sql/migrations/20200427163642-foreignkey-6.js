module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToReportCampaignDetail = () => queryInterface.addConstraint('CmpReportCampaignDetails', ['cmpCampaignId'], {
      type: 'foreign key',
      name: 'fk_cmpreportcampaigndetail_campaign',
      references: {
        table: 'CmpCampaigns',
        field: 'id',
      },
    });

    const addForeignKeyToReportCampaignSummary = () => queryInterface.addConstraint('CmpReportCampaignSummaries', ['cmpCampaignId'], {
      type: 'foreign key',
      name: 'fk_cmpreportcampaignsummary_campaign',
      references: {
        table: 'CmpCampaigns',
        field: 'id',
      },
    });

    const addForeignKeyToReport1 = () => queryInterface.addConstraint('CmpReports', ['cmpReportOverallSummaryId'], {
      type: 'foreign key',
      name: 'fk_cmpreport_overallsummary',
      references: {
        table: 'CmpReportOverallSummaries',
        field: 'id',
      },
    });

    const addForeignKeyToReport2 = () => queryInterface.addConstraint('CmpReports', ['cmpReportCampaignSummaryId'], {
      type: 'foreign key',
      name: 'fk_cmpreport_campaignsummary',
      references: {
        table: 'CmpReportCampaignSummaries',
        field: 'id',
      },
    });

    const addForeignKeyToReport3 = () => queryInterface.addConstraint('CmpReports', ['cmpReportCampaignDetailId'], {
      type: 'foreign key',
      name: 'fk_cmpreport_campaigndetail',
      references: {
        table: 'CmpReportCampaignDetails',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToReportCampaignDetail)
      .then(addForeignKeyToReportCampaignSummary)
      .then(addForeignKeyToReport1)
      .then(addForeignKeyToReport2)
      .then(addForeignKeyToReport3);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromReportCampaignDetail = () => queryInterface.removeConstraint('CmpReportCampaignDetails', 'fk_cmpreportcampaigndetail_campaign');
    const removeForeignKeyFromReportCampaignSummary = () => queryInterface.removeConstraint('CmpReportCampaignSummaries', 'fk_cmpreportcampaignsummary_campaign');
    const removeForeignKeyFromReport1 = () => queryInterface.removeConstraint('CmpReports', 'fk_cmpreport_overallsummary');
    const removeForeignKeyFromReport2 = () => queryInterface.removeConstraint('CmpReports', 'fk_cmpreport_campaignsummary');
    const removeForeignKeyFromReport3 = () => queryInterface.removeConstraint('CmpReports', 'fk_cmpreport_campaigndetail');

    return Promise.resolve()
      .then(removeForeignKeyFromReport3)
      .then(removeForeignKeyFromReport2)
      .then(removeForeignKeyFromReport1)
      .then(removeForeignKeyFromReportCampaignSummary)
      .then(removeForeignKeyFromReportCampaignDetail);
  },
};
