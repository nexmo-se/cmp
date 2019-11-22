module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CmpParameters', {
    id: {
      type: Sequelize.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    cmpRecordId: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    parameter: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
    order: {
      type: Sequelize.INTEGER,
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
    .dropTable('CmpParameters'),
};
