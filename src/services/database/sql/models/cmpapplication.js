module.exports = (sequelize, DataTypes) => {
  const CmpApplication = sequelize.define('CmpApplication', {
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
    cmpApiKeyId: {
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

  CmpApplication.associate = (models) => {
    // associations can be defined here
    CmpApplication.belongsTo(models.CmpApiKey, { foreignKey: 'cmpApiKeyId' });
    CmpApplication.hasMany(models.CmpChannel, { foreignKey: 'cmpApplicationId', as: 'channels' });
  };

  return CmpApplication;
};
