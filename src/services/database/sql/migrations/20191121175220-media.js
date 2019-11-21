module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CmpMedias', {
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
    text: {
      type: Sequelize.STRING(5000),
      allowNull: true,
      default: 'No Media',
    },
    url: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
    caption: {
      type: Sequelize.STRING(2000),
      allowNull: true,
    },
    fileName: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
    latitude: {
      type: Sequelize.DECIMAL(9, 5),
      allowNull: true,
    },
    longitude: {
      type: Sequelize.DECIMAL(9, 5),
      allowNull: true,
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
  }),
  down: queryInterface => queryInterface
    .dropTable('CmpMedias'),
};
