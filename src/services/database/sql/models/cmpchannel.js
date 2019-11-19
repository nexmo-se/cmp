module.exports = (sequelize, DataTypes) => {
  const CmpChannel = sequelize.define('CmpChannel', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      default: 'No Name',
    },
    channel: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    senderId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    tps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 5,
    },
    cmpApplicationId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    cmpApiKeyId: {
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

  CmpChannel.associate = (models) => {
    // associations can be defined here
    CmpChannel.belongsTo(models.CmpApiKey, { foreignKey: 'cmpApiKeyId', as: 'cmpApiKey' });
    CmpChannel.belongsTo(models.CmpApplication, { foreignKey: 'cmpApplicationId', as: 'cmpApplication' });
  };

  return CmpChannel;
};
