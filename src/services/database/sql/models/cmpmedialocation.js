module.exports = (sequelize, DataTypes) => {
  const CmpMediaLocation = sequelize.define('CmpMediaLocation', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 5),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 5),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    timestamps: true,
  });

  CmpMediaLocation.associate = (models) => {
    // associations can be defined here
  };

  return CmpMediaLocation;
};
