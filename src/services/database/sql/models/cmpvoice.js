module.exports = (sequelize, DataTypes) => {
  const CmpVoice = sequelize.define('CmpVoice', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    voiceType: {
      type: DataTypes.STRING(45),
      allowNull: false,
      default: 'tts', // tts, stream, answer
    },
    language: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    style: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    streamUrl: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    answerUrl: {
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

  CmpVoice.associate = (models) => {
    // associations can be defined here
  };

  return CmpVoice;
};
