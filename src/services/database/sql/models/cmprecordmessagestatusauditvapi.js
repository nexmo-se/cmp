module.exports = (sequelize, DataTypes) => {
  const CmpRecordMessageStatusAuditVapi = sequelize.define('CmpRecordMessageStatusAuditVapi', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    from: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    to: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    uuid: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    conversationUuid: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    direction: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    timestamp: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    startTime: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    endTime: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rate: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    network: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    detail: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    dtmfDigits: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    dtmfTimedOut: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    speechText: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    speechConfidence: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    speechTimeoutReason: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    speechErrorReason: {
      type: DataTypes.STRING(1000),
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

  CmpRecordMessageStatusAuditVapi.associate = (models) => {
    // associations can be defined here
  };

  return CmpRecordMessageStatusAuditVapi;
};
