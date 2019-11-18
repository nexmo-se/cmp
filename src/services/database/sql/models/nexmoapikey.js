module.exports = (sequelize, DataTypes) => {
  const NexmoApiKey = sequelize.define('NexmoApiKey', {
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

  NexmoApiKey.associate = (models) => {
    // associations can be defined here
    NexmoApiKey.hasMany(models.NexmoApplication, { foreignKey: 'apiKey', as: 'applications' });
  };

  return NexmoApiKey;
};
