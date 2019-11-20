module.exports = (sequelize, DataTypes) => {
  const CmpTemplate = sequelize.define('CmpTemplate', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      default: 'No Name',
    },
    cmpChannelId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    whatsappTemplateNamespace: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    whatsappTemplateName: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    mediaType: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    timestamps: true,
  });

  CmpTemplate.associate = (models) => {
    // associations can be defined here
    CmpTemplate.belongsTo(models.CmpChannel, { foreignKey: 'cmpChannelId', as: 'cmpChannel' });
  };

  return CmpTemplate;
};
