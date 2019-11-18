module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
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
    applicationId: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    privateKey: {
      type: DataTypes.STRING(10000),
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

  Application.associate = (models) => {
    // associations can be defined here
    Application.belongsTo(models.ApiKey, { foreignKey: 'apiKey' });
  };

  return Application;
};
