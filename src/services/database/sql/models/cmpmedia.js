module.exports = (sequelize, DataTypes) => {
  const CmpMedia = sequelize.define('CmpMedia', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    mediaType: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: 'text',
    },
    text: {
      type: DataTypes.STRING(5000),
      allowNull: true,
      default: 'No Media',
    },
    url: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    caption: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    fileName: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(9, 5),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(9, 5),
      allowNull: true,
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

  CmpMedia.associate = (models) => {
    // associations can be defined here
  };

  return CmpMedia;
};
