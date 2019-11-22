module.exports = (sequelize, DataTypes) => {
  const CmpMediaAudio = sequelize.define('CmpMediaAudio', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(1000),
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

  CmpMediaAudio.associate = (models) => {
    // associations can be defined here
  };

  return CmpMediaAudio;
};
