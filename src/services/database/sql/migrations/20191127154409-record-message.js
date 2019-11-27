module.exports = {
  up: (queryInterface, Sequelize) => {
    const removeMessageId = () => queryInterface.removeColumn('CmpRecords', 'messageId');
    const createRecordMessage = () => queryInterface.createTable('CmpRecordMessages', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      cmpRecordId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      messageId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      statusTime: {
        type: Sequelize.DATE,
        allowNull: false,
        default: Sequelize.NOW,
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
      .then(removeMessageId)
      .then(createRecordMessage);
  },
  down: (queryInterface, Sequelize) => {
    const addMessageId = () => queryInterface.addColumn('CmpRecords', 'messageId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
    const removeRecordMessage = () => queryInterface
      .dropTable('CmpRecordMessages');

    return Promise.resolve()
      .then(removeRecordMessage)
      .then(addMessageId);
  },
};
