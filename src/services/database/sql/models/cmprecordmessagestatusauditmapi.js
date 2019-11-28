module.exports = (sequelize, DataTypes) => {
  const CmpRecordMessageStatusAuditMapi = sequelize.define('CmpRecordMessageStatusAuditMapi', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    messageUuid: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    toType: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    toId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    toNumber: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    fromType: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    fromId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    fromNumber: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    errorCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    errorReason: {
      type: DataTypes.STRING(5000),
      allowNull: true,
    },
    usageCurrency: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    usagePrice: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    clientRef: {
      type: DataTypes.STRING(1000),
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

  CmpRecordMessageStatusAuditMapi.associate = (models) => {
    // associations can be defined here
  };

  return CmpRecordMessageStatusAuditMapi;
};
