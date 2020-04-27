module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToRecordMessageStatusAudits1 = () => queryInterface.addConstraint('CmpRecordMessageStatusAudits', ['cmpRecordMessageId'], {
      type: 'foreign key',
      name: 'fk_cmprecordmessagestatusaudit_recordmessage',
      references: {
        table: 'CmpRecordMessages',
        field: 'id',
      },
    });

    const addForeignKeyToRecordMessageStatusAudits2 = () => queryInterface.addConstraint('CmpRecordMessageStatusAudits', ['cmpRecordMessageStatusAuditMapiId'], {
      type: 'foreign key',
      name: 'fk_cmprecordmessagestatusaudit_recordmessagestatusauditmapi',
      references: {
        table: 'CmpRecordMessageStatusAuditMapis',
        field: 'id',
      },
    });

    const addForeignKeyToRecordMessageStatusAudits3 = () => queryInterface.addConstraint('CmpRecordMessageStatusAudits', ['cmpRecordMessageStatusAuditSmsId'], {
      type: 'foreign key',
      name: 'fk_cmprecordmessagestatusaudit_recordmessagestatusauditsms',
      references: {
        table: 'CmpRecordMessageStatusAuditSms',
        field: 'id',
      },
    });

    const addForeignKeyToRecordMessages = () => queryInterface.addConstraint('CmpRecordMessages', ['cmpRecordId'], {
      type: 'foreign key',
      name: 'fk_cmprecordmessage_record',
      references: {
        table: 'CmpRecords',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToRecordMessageStatusAudits1)
      .then(addForeignKeyToRecordMessageStatusAudits2)
      .then(addForeignKeyToRecordMessageStatusAudits3)
      .then(addForeignKeyToRecordMessages);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromRecordMessageStatusAudits1 = () => queryInterface.removeConstraint('CmpRecordMessageStatusAudits', 'fk_cmprecordmessagestatusaudit_recordmessage');
    const removeForeignKeyFromRecordMessageStatusAudits2 = () => queryInterface.removeConstraint('CmpRecordMessageStatusAudits', 'fk_cmprecordmessagestatusaudit_recordmessagestatusauditmapi');
    const removeForeignKeyFromRecordMessageStatusAudits3 = () => queryInterface.removeConstraint('CmpRecordMessageStatusAudits', 'fk_cmprecordmessagestatusaudit_recordmessagestatusauditsms');
    const removeForeignKeyFromRecordMessages = () => queryInterface.removeConstraint('CmpRecordMessages', 'fk_cmprecordmessage_record');

    return Promise.resolve()
      .then(removeForeignKeyFromRecordMessages)
      .then(removeForeignKeyFromRecordMessageStatusAudits3)
      .then(removeForeignKeyFromRecordMessageStatusAudits2)
      .then(removeForeignKeyFromRecordMessageStatusAudits1);
  },
};
