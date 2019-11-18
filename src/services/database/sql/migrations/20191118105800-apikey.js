module.exports = {
  up: (queryInterface, Sequelize) => {
    const createApiKeyTable = () => queryInterface.createTable('NexmoApiKeys', {
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
      apiKey: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      apiSecret: {
        type: Sequelize.STRING(45),
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

    const createApplicationTable = () => queryInterface.createTable('NexmoApplications', {
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
      apiKey: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      applicationId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      privateKey: {
        type: Sequelize.STRING(10000),
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
      .then(createApiKeyTable)
      .then(createApplicationTable);
  },
  down: (queryInterface) => {
    const dropApplcationTable = () => queryInterface.dropTable('NexmoApplications');
    const dropApiKeyTable = () => queryInterface.dropTable('NexmoApiKeys');
    return Promise.resolve()
      .then(dropApplcationTable)
      .then(dropApiKeyTable);
  },
};
