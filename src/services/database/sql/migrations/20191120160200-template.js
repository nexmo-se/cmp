module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CmpTemplates', {
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
    cmpChannelId: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    whatsappTemplateNamespace: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    whatsappTemplateName: {
      type: Sequelize.STRING(500),
      allowNull: true,
    },
    mediaType: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING(5000),
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
    .dropTable('CmpTemplates'),
};
