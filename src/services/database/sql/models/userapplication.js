module.exports = (sequelize, DataTypes) => {
  const UserApplication = sequelize.define('UserApplication', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    cmpApplicationId: {
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

  UserApplication.associate = (models) => {
    // associations can be defined here
    UserApplication.belongsTo(models.CmpApplication, { foreignKey: 'cmpApplicationId', as: 'cmpApplication' });
    UserApplication.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return UserApplication;
};
