module.exports = (sequelize, DataTypes) => {
  const CmpMediaViberTemplate = sequelize.define('CmpMediaViberTemplate', {
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
    actionUrl: {
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

  CmpMediaViberTemplate.associate = (models) => {
    // associations can be defined here
  };

  return CmpMediaViberTemplate;
};
