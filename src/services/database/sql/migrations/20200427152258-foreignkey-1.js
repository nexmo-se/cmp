module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToApplication = () => queryInterface.addConstraint('CmpApplications', ['cmpApiKeyId'], {
      type: 'foreign key',
      name: 'fk_cmpapplication_apikey',
      references: {
        table: 'CmpApiKeys',
        field: 'id',
      },
    });

    const addForeignKeyToChannel1 = () => queryInterface.addConstraint('CmpChannels', ['cmpApplicationId'], {
      type: 'foreign key',
      name: 'fk_cmpchannel_application',
      references: {
        table: 'CmpApplications',
        field: 'id',
      },
    });

    const addForeignKeyToChannel2 = () => queryInterface.addConstraint('CmpChannels', ['cmpApiKeyId'], {
      type: 'foreign key',
      name: 'fk_cmpchannel_apikey',
      references: {
        table: 'CmpApiKeys',
        field: 'id',
      },
    });

    const addForeignKeyToTemplate = () => queryInterface.addConstraint('CmpTemplates', ['cmpChannelId'], {
      type: 'foreign key',
      name: 'fk_cmptemplate_channel',
      references: {
        table: 'CmpChannels',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToApplication)
      .then(addForeignKeyToChannel1)
      .then(addForeignKeyToChannel2)
      .then(addForeignKeyToTemplate);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromApplication = () => queryInterface.removeConstraint('CmpApplications', 'fk_cmpapplication_apikey');
    const removeForeignKeyFromChannel1 = () => queryInterface.removeConstraint('CmpChannels', 'fk_cmpchannel_application');
    const removeForeignKeyFromChannel2 = () => queryInterface.removeConstraint('CmpChannels', 'fk_cmpchannel_apikey');
    const removeForeignKeyFromTemplate = () => queryInterface.removeConstraint('CmpTemplates', 'fk_cmptemplate_channel');

    return Promise.resolve()
      .then(removeForeignKeyFromTemplate)
      .then(removeForeignKeyFromChannel2)
      .then(removeForeignKeyFromChannel1)
      .then(removeForeignKeyFromApplication);
  },
};
