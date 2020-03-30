module.exports = (sequelize, DataTypes) => {
  const CmpReport = sequelize.define('CmpReport', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: 'pending',
    },
    submitTime: {
      type: DataTypes.DATE,
      allowNull: false,
      default: DataTypes.NOW,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cmpReportOverallSummaryId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpReportCampaignSummaryId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpReportCampaignDetailId: {
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

  CmpReport.associate = (models) => {
    // associations can be defined here
    CmpReport.belongsTo(models.CmpReportOverallSummary, { foreignKey: 'cmpReportOverallSummaryId', as: 'cmpReportOverallSummary' });
    CmpReport.belongsTo(models.CmpReportCampaignSummary, { foreignKey: 'cmpReportCampaignSummaryId', as: 'cmpReportCampaignSummary' });
    CmpReport.belongsTo(models.CmpReportCampaignDetail, { foreignKey: 'cmpReportCampaignDetailId', as: 'cmpReportCampaignDetail' });
  };

  return CmpReport;
};
