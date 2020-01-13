module.exports = {
  up: (queryInterface, Sequelize) => {
    const addUseSignature = () => queryInterface.addColumn('CmpChannels', 'smsUseSignature', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    });
    return Promise.resolve()
      .then(addUseSignature);
  },
  down: (queryInterface) => {
    const removeUseSignature = () => queryInterface.removeColumn('CmpChannels', 'smsUseSignature');
    return Promise.resolve()
      .then(removeUseSignature);
  },
};
