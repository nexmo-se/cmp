module.exports = (sequelize, DataTypes) => {
  const CmpReportOverallSummary = sequelize.define('CmpReportOverallSummary', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    to: {
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

  CmpReportOverallSummary.associate = (models) => {
    // associations can be defined here
  };

  return CmpReportOverallSummary;
};
