module.exports = {
  up: (queryInterface, Sequelize) => {
    const addActiveStart = () => queryInterface.addColumn('CmpRecords', 'activeStart', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    const addActiveEnd = () => queryInterface.addColumn('CmpRecords', 'activeEnd', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    return Promise.resolve()
      .then(addActiveStart)
      .then(addActiveEnd);
  },
  down: (queryInterface) => {
    const removeActiveStart = () => queryInterface.removeColumn('CmpRecords', 'activeStart');
    const removeActiveEnd = () => queryInterface.removeColumn('CmpRecords', 'activeEnd');

    return Promise.resolve()
      .then(removeActiveStart)
      .then(removeActiveEnd);
  },
};
