module.exports = (sequelize, DataTypes) => {
  const CmpMediaImage = sequelize.define('CmpMediaImage', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING(2000),
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

  CmpMediaImage.associate = (models) => {
    // associations can be defined here
  };

  return CmpMediaImage;
};
