module.exports = {
  up: (queryInterface, Sequelize) => {
    const addMessageId = () => queryInterface.addColumn('CmpRecords', 'messageId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    return Promise.resolve()
      .then(addMessageId);
  },
  down: (queryInterface) => {
    const removeMessageId = () => queryInterface.removeColumn('CmpRecords', 'messageId');

    return Promise.resolve()
      .then(removeMessageId);
  },
};
