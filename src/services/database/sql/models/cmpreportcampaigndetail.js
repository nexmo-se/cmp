module.exports = (sequelize, DataTypes) => {
  const CmpReportCampaignDetail = sequelize.define('CmpReportCampaignDetail', {
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

  CmpReportCampaignDetail.associate = (models) => {
    // associations can be defined here
  };

  return CmpReportCampaignDetail;
};
