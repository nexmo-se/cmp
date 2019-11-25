module.exports = (sequelize, DataTypes) => {
  const CmpMedia = sequelize.define('CmpMedia', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    mediaType: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: 'text',
    },
    cmpMediaTextId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpMediaImageId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpMediaAudioId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpMediaVideoId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpMediaFileId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpMediaLocationId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpMediaViberTemplateId: {
      type: DataTypes.STRING(45),
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

  CmpMedia.associate = (models) => {
    // associations can be defined here
    CmpMedia.belongsTo(models.CmpMediaText, { foreignKey: 'cmpMediaTextId', as: 'cmpMediaText' });
    CmpMedia.belongsTo(models.CmpMediaImage, { foreignKey: 'cmpMediaImageId', as: 'cmpMediaImage' });
    CmpMedia.belongsTo(models.CmpMediaAudio, { foreignKey: 'cmpMediaAudioId', as: 'cmpMediaAudio' });
    CmpMedia.belongsTo(models.CmpMediaVideo, { foreignKey: 'cmpMediaVideoId', as: 'cmpMediaVideo' });
    CmpMedia.belongsTo(models.CmpMediaFile, { foreignKey: 'cmpMediaFileId', as: 'cmpMediaFile' });
    CmpMedia.belongsTo(models.CmpMediaLocation, { foreignKey: 'cmpMediaLocationId', as: 'cmpMediaLocation' });
    CmpMedia.belongsTo(models.CmpMediaViberTemplate, { foreignKey: 'cmpMediaViberTemplateId', as: 'cmpMediaViberTemplate' });
  };

  return CmpMedia;
};
