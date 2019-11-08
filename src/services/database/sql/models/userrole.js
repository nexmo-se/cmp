module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(100),
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

  UserRole.associate = (models) => {
    // associations can be defined here
    UserRole.belongsTo(models.User, { foreignKey: 'user' });
  };

  return UserRole;
};
