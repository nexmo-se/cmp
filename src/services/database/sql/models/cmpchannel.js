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
      allowNull: true,
    },
    tps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 5,
    },
    smsUseSignature: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
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
    CmpChannel.hasMany(models.CmpTemplate, { foreignKey: 'cmpChannelId', as: 'cmpChannels' });
    CmpChannel.belongsToMany(models.User, {
      through: models.UserChannel, foreignKey: 'cmpChannelId', as: 'users',
    });
  };

  return CmpChannel;
};
