module.exports = (sequelize, DataTypes) => {
  const CmpReportCampaignSummary = sequelize.define('CmpReportCampaignSummary', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    cmpCampaignId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    from: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    to: {
      type: DataTypes.DATE,
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

  CmpReportCampaignSummary.associate = (models) => {
    // associations can be defined here
  };

  return CmpReportCampaignSummary;
};
