module.exports = (sequelize, DataTypes) => {
  const UserChannel = sequelize.define('UserChannel', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cmpChannelId: {
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

  UserChannel.associate = (models) => {
    // associations can be defined here
    UserChannel.belongsTo(models.CmpChannel, { foreignKey: 'cmpChannelId', as: 'cmpChannel' });
    UserChannel.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return UserChannel;
};
