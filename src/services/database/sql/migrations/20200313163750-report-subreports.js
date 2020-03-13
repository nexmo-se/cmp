module.exports = {
  up: (queryInterface, Sequelize) => {
    const addOverallSummary = () => queryInterface.addColumn('CmpReports', 'cmpReportOverallSummaryId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
    const addCampaignSummary = () => queryInterface.addColumn('CmpReports', 'cmpReportCampaignSummaryId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
    const addCampaignDetail = () => queryInterface.addColumn('CmpReports', 'cmpReportCampaignDetailId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
    return Promise.resolve()
      .then(addOverallSummary)
      .then(addCampaignSummary)
      .then(addCampaignDetail);
  },
  down: (queryInterface) => {
    const removeOverallSummary = () => queryInterface.removeColumn('CmpReports', 'cmpReportOverallSummaryId');
    const removeCampaignSummary = () => queryInterface.removeColumn('CmpReports', 'cmpReportCampaignSummaryId');
    const removeCampaignDetail = () => queryInterface.removeColumn('CmpReports', 'cmpReportCampaignDetailId');
    return Promise.resolve()
      .then(removeOverallSummary)
      .then(removeCampaignSummary)
      .then(removeCampaignDetail);
  },
};
