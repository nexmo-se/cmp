module.exports = {
  up: (queryInterface) => {
    const addIndex = () => queryInterface.addIndex('CmpParameters', ['cmpRecordId']);
    return Promise.resolve()
      .then(addIndex);
  },
  down: (queryInterface) => {
    const removeIndex = () => queryInterface.removeIndex('CmpParameters', ['cmpRecordId']);
    return Promise.resolve()
      .then(removeIndex);
  },
};
