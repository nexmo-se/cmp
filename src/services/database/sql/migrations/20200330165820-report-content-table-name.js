module.exports = {
  up: (queryInterface) => {
    const renameOverallSummary = () => queryInterface.renameTable('CmpReportOverallSummary', 'CmpReportOverallSummaries');
    const renameCampaignSummary = () => queryInterface.renameTable('CmpReportCampaignSummary', 'CmpReportCampaignSummaries');
    const renameCampaignDetail = () => queryInterface.renameTable('CmpReportCampaignDetail', 'CmpReportCampaignDetails');
    return Promise.resolve()
      .then(renameOverallSummary)
      .then(renameCampaignSummary)
      .then(renameCampaignDetail);
  },
  down: (queryInterface) => {
    const undoRenameOverallSummary = () => queryInterface.renameTable('CmpReportOverallSummaries', 'CmpReportOverallSummary');
    const undoRenameCampaignSummary = () => queryInterface.renameTable('CmpReportCampaignSummaries', 'CmpReportCampaignSummary');
    const undoRenameCampaignDetail = () => queryInterface.renameTable('CmpReportCampaignDetails', 'CmpReportCampaignDetail');
    return Promise.resolve()
      .then(undoRenameOverallSummary)
      .then(undoRenameCampaignSummary)
      .then(undoRenameCampaignDetail);
  },
};
