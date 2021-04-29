module.exports = (sequelize, DataTypes) => {
  const CmpRecordMessageStatusAudit = sequelize.define('CmpRecordMessageStatusAudit', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    cmpRecordMessageId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    messageType: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: 'mapi',
    },
    cmpRecordMessageStatusAuditMapiId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpRecordMessageStatusAuditSmsId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpRecordMessageStatusAuditVapiId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpRecordMessageStatusAuditNiId: {
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

  CmpRecordMessageStatusAudit.associate = (models) => {
    // associations can be defined here
    CmpRecordMessageStatusAudit.belongsTo(models.CmpRecordMessageStatusAuditSms, { foreignKey: 'cmpRecordMessageStatusAuditSmsId', as: 'cmpRecordMessageStatusAuditSms' });
    CmpRecordMessageStatusAudit.belongsTo(models.CmpRecordMessageStatusAuditMapi, { foreignKey: 'cmpRecordMessageStatusAuditMapiId', as: 'cmpRecordMessageStatusAuditMapi' });
    CmpRecordMessageStatusAudit.belongsTo(models.CmpRecordMessageStatusAuditVapi, { foreignKey: 'cmpRecordMessageStatusAuditVapiId', as: 'cmpRecordMessageStatusAuditVapi' });
    CmpRecordMessageStatusAudit.belongsTo(models.CmpRecordMessageStatusAuditNi, { foreignKey: 'cmpRecordMessageStatusAuditNiId', as: 'cmpRecordMessageStatusAuditNi' });
    CmpRecordMessageStatusAudit.belongsTo(models.CmpRecordMessage, { foreignKey: 'cmpRecordMessageId', as: 'cmpRecordMessage' });
  };

  return CmpRecordMessageStatusAudit;
};
