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
      allowNull: false,
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
  };

  return CmpReport;
};
