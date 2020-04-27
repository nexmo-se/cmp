module.exports = (sequelize, DataTypes) => {
  const CmpRecordMessage = sequelize.define('CmpRecordMessage', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    cmpRecordId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    messageId: {
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
      default: DataTypes.NOW,
    },
    price: {
      type: DataTypes.DECIMAL(12, 8),
      allowNull: false,
      default: 0,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    timestamps: true,
  });

  CmpRecordMessage.associate = (models) => {
    // associations can be defined here
    CmpRecordMessage.belongsTo(models.CmpRecord, { foreignKey: 'cmpRecordId', as: 'cmpRecord' });
    CmpRecordMessage.hasMany(models.CmpRecordMessageStatusAudit, { foreignKey: 'cmpRecordMessageId', as: 'cmpRecordMessageStatusAudits' });
  };

  return CmpRecordMessage;
};
