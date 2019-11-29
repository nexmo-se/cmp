module.exports = (sequelize, DataTypes) => {
  const CmpApiKey = sequelize.define('CmpApiKey', {
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
    apiKey: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    apiSecret: {
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

  CmpApiKey.associate = (models) => {
    // associations can be defined here
    CmpApiKey.hasMany(models.CmpApplication, { foreignKey: 'cmpApiKeyId', as: 'cmpApplications' });
    CmpApiKey.hasMany(models.CmpChannel, { foreignKey: 'cmpApiKeyId', as: 'cmpChannels' });
    console.log(CmpApiKey);
    console.log(models);
    CmpApiKey.belongsToMany(models.User, {
      through: models.UserApiKey, foreignKey: 'cmpApiKeyId', as: 'users',
    });
  };

  return CmpApiKey;
};
