module.exports = (sequelize, DataTypes) => {
  const CmpRecord = sequelize.define('CmpRecord', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    recipient: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cmpCampaignId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cmpTemplateId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cmpMediaId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpVoiceId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    activeStart: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeStartHour: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeStartMinute: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeEnd: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeEndHour: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeEndMinute: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeOnWeekends: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    sendTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: 'draft',
    },
    statusTime: {
      type: DataTypes.DATE,
      allowNull: false,
      default: DataTypes.NOW,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    timestamps: true,
  });

  CmpRecord.associate = (models) => {
    // associations can be defined here
    CmpRecord.belongsTo(models.CmpMedia, { foreignKey: 'cmpMediaId', as: 'cmpMedia' });
    CmpRecord.belongsTo(models.CmpVoice, { foreignKey: 'cmpVoiceId', as: 'cmpVoice' });
    CmpRecord.belongsTo(models.CmpTemplate, { foreignKey: 'cmpTemplateId', as: 'cmpTemplate' });
    CmpRecord.hasMany(models.CmpParameter, { foreignKey: 'cmpRecordId', as: 'cmpParameters' });
    CmpRecord.belongsTo(models.CmpCampaign, { foreignKey: 'cmpCampaignId', as: 'cmpCampaign' });
    CmpRecord.hasMany(models.CmpRecordMessage, { foreignKey: 'cmpRecordId', as: 'cmpRecordMessages' });
  };

  return CmpRecord;
};
