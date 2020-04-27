module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToParameter = () => queryInterface.addConstraint('CmpParameters', ['cmpRecordId'], {
      type: 'foreign key',
      name: 'fk_cmpparameter_record',
      references: {
        table: 'CmpRecords',
        field: 'id',
      },
    });

    const addForeignKeyToRecord1 = () => queryInterface.addConstraint('CmpRecords', ['cmpCampaignId'], {
      type: 'foreign key',
      name: 'fk_cmprecord_campaign',
      references: {
        table: 'CmpCampaigns',
        field: 'id',
      },
    });

    const addForeignKeyToRecord2 = () => queryInterface.addConstraint('CmpRecords', ['cmpTemplateId'], {
      type: 'foreign key',
      name: 'fk_cmprecord_template',
      references: {
        table: 'CmpTemplates',
        field: 'id',
      },
    });

    const addForeignKeyToRecord3 = () => queryInterface.addConstraint('CmpRecords', ['cmpMediaId'], {
      type: 'foreign key',
      name: 'fk_cmprecord_media',
      references: {
        table: 'CmpMedia',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToParameter)
      .then(addForeignKeyToRecord1)
      .then(addForeignKeyToRecord2)
      .then(addForeignKeyToRecord3);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromParameter = () => queryInterface.removeConstraint('CmpParameters', 'fk_cmpparameter_record');
    const removeForeignKeyFromRecord1 = () => queryInterface.removeConstraint('CmpRecords', 'fk_cmprecord_campaign');
    const removeForeignKeyFromRecord2 = () => queryInterface.removeConstraint('CmpRecords', 'fk_cmprecord_template');
    const removeForeignKeyFromRecord3 = () => queryInterface.removeConstraint('CmpRecords', 'fk_cmprecord_media');

    return Promise.resolve()
      .then(removeForeignKeyFromRecord3)
      .then(removeForeignKeyFromRecord2)
      .then(removeForeignKeyFromRecord1)
      .then(removeForeignKeyFromParameter);
  },
};
