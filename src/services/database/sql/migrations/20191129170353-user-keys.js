module.exports = {
  up: (queryInterface, Sequelize) => {
    const createUserApiKey = () => queryInterface.createTable('UserApiKeys', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      cmpApiKeyId: {
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

    const createUserApplication = () => queryInterface.createTable('UserApplications', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      cmpApplicationId: {
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

    const createUserChannel = () => queryInterface.createTable('UserChannels', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      cmpChannelId: {
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

    return Promise.resolve()
      .then(createUserApiKey)
      .then(createUserApplication)
      .then(createUserChannel);
  },
  down: (queryInterface) => {
    const dropUserApiKey = () => queryInterface
      .dropTable('UserApiKeys');
    const dropUserApplication = () => queryInterface
      .dropTable('UserApplications');
    const dropUserChannel = () => queryInterface
      .dropTable('UserChannels');

    return Promise.resolve()
      .then(dropUserApiKey)
      .then(dropUserApplication)
      .then(dropUserChannel);
  },
};
