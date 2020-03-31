
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CmpReports', {
    id: {
      type: Sequelize.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING(1000),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING(2000),
      allowNull: false,
    },
    url: {
      type: Sequelize.STRING(2000),
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(45),
      allowNull: false,
      default: 'pending',
    },
    submitTime: {
      type: Sequelize.DATE,
      allowNull: false,
      default: Sequelize.NOW,
    },
    startTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    endTime: {
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
  }),
  down: queryInterface => queryInterface
    .dropTable('CmpReports'),
};
