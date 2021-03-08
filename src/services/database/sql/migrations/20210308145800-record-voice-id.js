module.exports = {
  up: (queryInterface, Sequelize) => {
    const addVoiceId = () => queryInterface.addColumn('CmpRecords', 'cmpVoiceId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    return Promise.resolve()
      .then(addVoiceId);
  },
  down: (queryInterface) => {
    const removeVoiceId = () => queryInterface.removeColumn('CmpRecords', 'cmpVoiceId');
    return Promise.resolve()
      .then(removeVoiceId);
  },
};
