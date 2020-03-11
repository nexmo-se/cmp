module.exports = {
  up: (queryInterface) => {
    const addCmpRecordsIdStatusDeleted = () => queryInterface.addIndex(
      'CmpRecords',
      [
        'id',
        'status',
        'deleted',
      ],
    );
    return Promise.resolve()
      .then(addCmpRecordsIdStatusDeleted);
  },
  down: (queryInterface) => {
    const removeCmpRecordsIdStatusDeleted = () => queryInterface.removeIndex(
      'CmpRecords',
      [
        'id',
        'status',
        'deleted',
      ],
    );

    return Promise.resolve()
      .then(removeCmpRecordsIdStatusDeleted);
  },
};
