module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CmpChannels', {
    id: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
      default: 'No Name',
    },
    channel: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    senderId: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    tps: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 5,
    },
    cmpApplicationId: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    cmpApiKeyId: {
      type: Sequelize.STRING(45),
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
    .dropTable('CmpChannels'),
};
