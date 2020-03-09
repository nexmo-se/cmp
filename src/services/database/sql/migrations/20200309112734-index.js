module.exports = {
  up: (queryInterface) => {
    const addCmpRecordsIdDeleted = () => queryInterface.addIndex(
      'CmpRecords',
      [
        'id',
        'deleted',
      ],
    );
    const addCmpRecordMessagesCmpRecordIdDeleted = () => queryInterface.addIndex(
      'CmpRecordMessages',
      [
        'cmpRecordId',
        'deleted',
      ],
    );
    const addCmpRecordMessageStatusAuditsCmpRecordMessageIdDeleted = () => queryInterface.addIndex(
      'CmpRecordMessageStatusAudits',
      [
        'cmpRecordMessageId',
        'deleted',
      ],
    );
    const addCmpRecordMessagesMessageIdDeleted = () => queryInterface.addIndex(
      'CmpRecordMessages',
      [
        'messageId',
        'deleted',
      ],
    );

    return Promise.resolve()
      .then(addCmpRecordsIdDeleted)
      .then(addCmpRecordMessagesCmpRecordIdDeleted)
      .then(addCmpRecordMessageStatusAuditsCmpRecordMessageIdDeleted)
      .then(addCmpRecordMessagesMessageIdDeleted);
  },
  down: (queryInterface) => {
    const removeCmpRecordsIdDeleted = () => queryInterface.removeIndex(
      'CmpRecords',
      [
        'id',
        'deleted',
      ],
    );
    const removeCmpRecordMessagesCmpRecordIdDeleted = () => queryInterface.removeIndex(
      'CmpRecordMessages',
      [
        'cmpRecordId',
        'deleted',
      ],
    );
    const removeCmpRecordMessageStatusAuditsCmpRecordMessageIdDeleted = () => queryInterface
      .removeIndex(
        'CmpRecordMessageStatusAudits',
        [
          'cmpRecordMessageId',
          'deleted',
        ],
      );
    const removeCmpRecordMessagesMessageIdDeleted = () => queryInterface.removeIndex(
      'CmpRecordMessages',
      [
        'messageId',
        'deleted',
      ],
    );
    return Promise.resolve()
      .then(removeCmpRecordsIdDeleted)
      .then(removeCmpRecordMessagesCmpRecordIdDeleted)
      .then(removeCmpRecordMessageStatusAuditsCmpRecordMessageIdDeleted)
      .then(removeCmpRecordMessagesMessageIdDeleted);
  },
};
