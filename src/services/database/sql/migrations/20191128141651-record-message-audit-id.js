module.exports = {
  up: (queryInterface, Sequelize) => {
    const addRecordMessageId = () => queryInterface.addColumn('CmpRecordMessageStatusAudits', 'cmpRecordMessageId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
    return Promise.resolve()
      .then(addRecordMessageId);
  },
  down: (queryInterface) => {
    const removeRecordMessageId = () => queryInterface.removeColumn('CmpRecordMessageStatusAudits', 'cmpRecordMessageId');
    return Promise.resolve()
      .then(removeRecordMessageId);
  },
};
