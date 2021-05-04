module.exports = {
  up: (queryInterface, Sequelize) => {
    const addCampaignType = () => queryInterface.addColumn('CmpCampaigns', 'campaignType', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    return Promise.resolve()
      .then(addCampaignType);
  },
  down: (queryInterface) => {
    const removeCampaignType = () => queryInterface.removeColumn('CmpCampaigns', 'campaignType');
    return Promise.resolve()
      .then(removeCampaignType);
  },
};
