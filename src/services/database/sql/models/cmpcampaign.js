module.exports = (sequelize, DataTypes) => {
  const CmpCampaign = sequelize.define('CmpCampaign', {
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
    campaignType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    campaignStartDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    campaignEndDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    activeStartHour: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    activeStartMinute: {
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
    niCnam: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    actualStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualDuration: {
      type: DataTypes.INTEGER,
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

  CmpCampaign.associate = (models) => {
    // associations can be defined here
    CmpCampaign.hasMany(models.CmpRecord, { foreignKey: 'cmpCampaignId', as: 'cmpRecords' });
    CmpCampaign.hasMany(models.CmpCampaignStatusAudit, { foreignKey: 'cmpCampaignId', as: 'cmpCampaignStatusAudits' });
  };

  return CmpCampaign;
};
