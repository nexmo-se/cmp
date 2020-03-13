module.exports = {
  up: (queryInterface, Sequelize) => {
    const createOverallSummary = () => queryInterface.createTable('CmpReportOverallSummary', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      from: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      to: {
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
    const createCampaignSummary = () => queryInterface.createTable('CmpReportCampaignSummary', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      cmpCampaignId: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      from: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      to: {
        type: Sequelize.DATE,
        allowNull: true,
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
    const createCampaignDetail = () => queryInterface.createTable('CmpReportCampaignDetail', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      cmpCampaignId: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      from: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      to: {
        type: Sequelize.DATE,
        allowNull: true,
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
      .then(createOverallSummary)
      .then(createCampaignSummary)
      .then(createCampaignDetail);
  },
  down: (queryInterface) => {
    const dropOverallSummary = () => queryInterface
      .dropTable('CmpReportOverallSummary');
    const dropCampaignSummary = () => queryInterface
      .dropTable('CmpReportCampaignSummary');
    const dropCampaignDetail = () => queryInterface
      .dropTable('CmpReportCampaignDetail');

    return Promise.resolve()
      .then(dropOverallSummary)
      .then(dropCampaignSummary)
      .then(dropCampaignDetail);
  },
};
