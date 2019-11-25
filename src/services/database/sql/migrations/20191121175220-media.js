module.exports = {
  up: (queryInterface, Sequelize) => {
    const createMediaTable = () => queryInterface.createTable('CmpMedia', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      mediaType: {
        type: Sequelize.STRING(45),
        allowNull: false,
        default: 'text',
      },
      cmpMediaTextId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      cmpMediaImageId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      cmpMediaAudioId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      cmpMediaVideoId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      cmpMediaFileId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      cmpMediaLocationId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      cmpMediaViberTemplateId: {
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
    });

    const createMediaTextTable = () => queryInterface.createTable('CmpMediaTexts', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: Sequelize.STRING(5000),
        allowNull: false,
        default: 'No Text',
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
    const createMediaImageTable = () => queryInterface.createTable('CmpMediaImages', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      caption: {
        type: Sequelize.STRING(2000),
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
    const createMediaAudioTable = () => queryInterface.createTable('CmpMediaAudios', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING(1000),
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
    const createMediaVideoTable = () => queryInterface.createTable('CmpMediaVideos', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      caption: {
        type: Sequelize.STRING(2000),
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
    const createMediaFileTable = () => queryInterface.createTable('CmpMediaFiles', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      caption: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      fileName: {
        type: Sequelize.STRING(1000),
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
    const createMediaLocationTable = () => queryInterface.createTable('CmpMediaLocations', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(9, 5),
        allowNull: false,
      },
      longitude: {
        type: Sequelize.DECIMAL(9, 5),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING(1000),
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

    const createMediaViberTemplateTable = () => queryInterface.createTable('CmpMediaViberTemplates', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      url: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      caption: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      actionUrl: {
        type: Sequelize.STRING(1000),
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
      .then(createMediaTextTable)
      .then(createMediaImageTable)
      .then(createMediaAudioTable)
      .then(createMediaVideoTable)
      .then(createMediaFileTable)
      .then(createMediaLocationTable)
      .then(createMediaViberTemplateTable)
      .then(createMediaTable);
  },
  down: (queryInterface) => {
    const dropMediaTable = () => queryInterface.dropTable('CmpMedia');
    const dropMediaTextTable = () => queryInterface.dropTable('CmpMediaTexts');
    const dropMediaImageTable = () => queryInterface.dropTable('CmpMediaImages');
    const dropMediaAudioTable = () => queryInterface.dropTable('CmpMediaAudios');
    const dropMediaVideoTable = () => queryInterface.dropTable('CmpMediaVideos');
    const dropMediaFileTable = () => queryInterface.dropTable('CmpMediaFiles');
    const dropMediaLocationTable = () => queryInterface.dropTable('CmpMediaLocations');
    const dropMediaViberTemplateTable = () => queryInterface.dropTable('CmpMediaViberTemplates');

    return Promise.resolve()
      .then(dropMediaTable)
      .then(dropMediaTextTable)
      .then(dropMediaImageTable)
      .then(dropMediaAudioTable)
      .then(dropMediaVideoTable)
      .then(dropMediaFileTable)
      .then(dropMediaLocationTable)
      .then(dropMediaViberTemplateTable);
  },
};
