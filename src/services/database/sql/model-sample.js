module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define('Example', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Example.associate = (models) => {
    // associations can be defined here
  };

  return Example;
};
