module.exports = (sequelize, DataTypes) => {
  const CmpCampaignStatusAudit = sequelize.define('CmpCampaignStatusAudit', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    cmpCampaignId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    statusTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    timestamps: true,
  });

  CmpCampaignStatusAudit.associate = (models) => {
    // associations can be defined here
    CmpCampaignStatusAudit.belongsTo(models.CmpCampaign, { foreignKey: 'cmpCampaignId', as: 'cmpCampaign' });
  };

  return CmpCampaignStatusAudit;
};
