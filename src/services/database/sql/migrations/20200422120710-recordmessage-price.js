module.exports = {
  up: (queryInterface, Sequelize) => {
    const createPriceColumn = () => queryInterface.addColumn('CmpRecordMessages', 'price', {
      type: Sequelize.DECIMAL(12, 8),
      allowNull: false,
      default: 0,
    });
    return Promise.resolve()
      .then(createPriceColumn);
  },
  down: (queryInterface) => {
    const removePriceColumn = () => queryInterface.removeColumn('CmpRecordMessages', 'price');
    return Promise.resolve()
      .then(removePriceColumn);
  },
};
