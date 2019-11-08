module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    passwordSalt: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
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

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.UserRole, { foreignKey: 'user', as: 'roles' });
  };

  return User;
};
