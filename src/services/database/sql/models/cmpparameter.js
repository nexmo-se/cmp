module.exports = (sequelize, DataTypes) => {
  const CmpParameter = sequelize.define('CmpParameter', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    parameter: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
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

  CmpParameter.associate = (models) => {
    // associations can be defined here
  };

  return CmpParameter;
};
