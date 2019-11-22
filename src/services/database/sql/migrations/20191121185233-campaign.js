module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CmpCampaigns', {
    id: {
      type: Sequelize.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      default: 'No Name',
    },
    campaignStartDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    campaignEndDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    actualStartDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    actualEndDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    actualDuration: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
      default: 'draft',
    },
    statusTime: {
      type: Sequelize.DATE,
      allowNull: false,
      default: Sequelize.NOW,
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
  }),
  down: queryInterface => queryInterface
    .dropTable('CmpCampaigns'),
};
