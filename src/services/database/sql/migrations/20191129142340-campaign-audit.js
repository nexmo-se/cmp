module.exports = {
  up: (queryInterface, Sequelize) => {
    const createCampaignAudit = () => queryInterface.createTable('CmpCampaignStatusAudits', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      cmpCampaignId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      statusTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return Promise.resolve()
      .then(createCampaignAudit);
  },
  down: (queryInterface) => {
    const dropCampaignAudit = () => queryInterface
      .dropTable('CmpCampaignStatusAudits');

    return Promise.resolve()
      .then(dropCampaignAudit);
  },
};
