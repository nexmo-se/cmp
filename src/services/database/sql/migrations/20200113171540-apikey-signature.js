module.exports = {
  up: (queryInterface, Sequelize) => {
    const addSignatureSecret = () => queryInterface.addColumn('CmpApiKeys', 'signatureSecret', {
      type: Sequelize.STRING(150),
      allowNull: true,
    });
    const addSignatureMethod = () => queryInterface.addColumn('CmpApiKeys', 'signatureMethod', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });
    return Promise.resolve()
      .then(addSignatureSecret)
      .then(addSignatureMethod);
  },
  down: (queryInterface) => {
    const removeSignatureSecret = () => queryInterface.removeColumn('CmpApiKeys', 'signatureSecret');
    const removeSignatureMethod = () => queryInterface.removeColumn('CmpApiKeys', 'signatureMethod');
    return Promise.resolve()
      .then(removeSignatureSecret)
      .then(removeSignatureMethod);
  },
};
