module.exports = (sequelize, DataTypes) => {
  const CmpMediaText = sequelize.define('CmpMediaText', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      default: 'No Media',
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    timestamps: true,
  });

  CmpMediaText.associate = (models) => {
    // associations can be defined here
  };

  return CmpMediaText;
};
