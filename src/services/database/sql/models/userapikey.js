module.exports = (sequelize, DataTypes) => {
  const UserApiKey = sequelize.define('UserApiKey', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cmpApiKeyId: {
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

  UserApiKey.associate = (models) => {
    // associations can be defined here
    UserApiKey.belongsTo(models.CmpApiKey, { foreignKey: 'cmpApiKeyId', as: 'cmpApiKey' });
    UserApiKey.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return UserApiKey;
};
