module.exports = (sequelize, DataTypes) => {
  const CmpRecordMessageStatusAuditSms = sequelize.define('CmpRecordMessageStatusAuditSms', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    messageId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    msisdn: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    networkCode: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    scts: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    errCode: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    messageTimestamp: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
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

  CmpRecordMessageStatusAuditSms.associate = (models) => {
    // associations can be defined here
  };

  return CmpRecordMessageStatusAuditSms;
};
