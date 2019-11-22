module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CmpRecords', {
    id: {
      type: Sequelize.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    recipient: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    cmpCampaignId: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    cmpTemplateId: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    cmpMediaId: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    activeStartHour: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    activeStartMinute: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    activeEndHour: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    activeEndMinute: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    activeOnWeekends: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    timezone: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    sendTime: {
      type: Sequelize.DATE,
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
    .dropTable('CmpRecords'),
};
