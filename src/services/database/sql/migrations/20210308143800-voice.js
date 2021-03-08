module.exports = {
  up: (queryInterface, Sequelize) => {
    const createCmpVoice = () => queryInterface.createTable('CmpVoices', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      voiceType: {
        type: Sequelize.STRING(45),
        allowNull: false,
        default: 'tts', // tts, stream, answer
      },
      language: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      style: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      streamUrl: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      answerUrl: {
        type: Sequelize.STRING(2000),
        allowNull: true,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return Promise.resolve()
      .then(createCmpVoice);
  },
  down: (queryInterface) => {
    const dropCmpVoice = () => queryInterface.dropTable('CmpVoices');

    return Promise.resolve()
      .then(dropCmpVoice);
  },
};
