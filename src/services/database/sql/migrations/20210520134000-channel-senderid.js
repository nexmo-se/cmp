
module.exports = {
  up: (queryInterface, Sequelize) => {
    const changeSenderIdToNullable = () => queryInterface.changeColumn('CmpChannels', 'senderId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    return Promise.resolve()
      .then(changeSenderIdToNullable);
  },
  down: (queryInterface) => {
    const updateSenderIdToDefault = () => queryInterface.bulkUpdate('CmpChannels', {
      senderId: 'Vonage'
    },  {
      senderId: null
    });
    const changeSenderIdToNonNullable = () => queryInterface.changeColumn('CmpChannels', 'senderId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0,
    });

    return Promise.resolve()
      .then(updateSenderIdToDefault)
      .then(changeSenderIdToNonNullable);
  }
}