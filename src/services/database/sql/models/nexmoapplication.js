module.exports = (sequelize, DataTypes) => {
  const NexmoApplication = sequelize.define('NexmoApplication', {
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

  NexmoApplication.associate = (models) => {
    // associations can be defined here
    NexmoApplication.belongsTo(models.NexmoApiKey, { foreignKey: 'apiKey' });
  };

  return NexmoApplication;
};
