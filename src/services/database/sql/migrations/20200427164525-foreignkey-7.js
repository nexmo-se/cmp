module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToUserApiKey1 = () => queryInterface.addConstraint('UserApiKeys', ['userId'], {
      type: 'foreign key',
      name: 'fk_userapikey_user',
      references: {
        table: 'Users',
        field: 'id',
      },
    });

    const addForeignKeyToUserApiKey2 = () => queryInterface.addConstraint('UserApiKeys', ['cmpApiKeyId'], {
      type: 'foreign key',
      name: 'fk_userapikey_apikey',
      references: {
        table: 'CmpApiKeys',
        field: 'id',
      },
    });

    const addForeignKeyToUserApplication1 = () => queryInterface.addConstraint('UserApplications', ['userId'], {
      type: 'foreign key',
      name: 'fk_userapplication_user',
      references: {
        table: 'Users',
        field: 'id',
      },
    });

    const addForeignKeyToUserApplication2 = () => queryInterface.addConstraint('UserApplications', ['cmpApplicationId'], {
      type: 'foreign key',
      name: 'fk_userapplication_application',
      references: {
        table: 'CmpApplications',
        field: 'id',
      },
    });

    const addForeignKeyToUserChannel1 = () => queryInterface.addConstraint('UserChannels', ['userId'], {
      type: 'foreign key',
      name: 'fk_userchannel_user',
      references: {
        table: 'Users',
        field: 'id',
      },
    });

    const addForeignKeyToUserChannel2 = () => queryInterface.addConstraint('UserChannels', ['cmpChannelId'], {
      type: 'foreign key',
      name: 'fk_userchannel_channel',
      references: {
        table: 'CmpChannels',
        field: 'id',
      },
    });

    const addForeignKeyToUserRole = () => queryInterface.addConstraint('UserRoles', ['user'], {
      type: 'foreign key',
      name: 'fk_userrole_user',
      references: {
        table: 'Users',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToUserApiKey1)
      .then(addForeignKeyToUserApiKey2)
      .then(addForeignKeyToUserApplication1)
      .then(addForeignKeyToUserApplication2)
      .then(addForeignKeyToUserChannel1)
      .then(addForeignKeyToUserChannel2)
      .then(addForeignKeyToUserRole);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromUserApiKey1 = () => queryInterface.removeConstraint('UserApiKeys', 'fk_userapikey_user');
    const removeForeignKeyFromUserApiKey2 = () => queryInterface.removeConstraint('UserApiKeys', 'fk_userapikey_apikey');
    const removeForeignKeyFromUserApplication1 = () => queryInterface.removeConstraint('UserApplications', 'fk_userapplication_user');
    const removeForeignKeyFromUserApplication2 = () => queryInterface.removeConstraint('UserApplications', 'fk_userapplication_application');
    const removeForeignKeyFromUserChannel1 = () => queryInterface.removeConstraint('UserChannels', 'fk_userchannel_user');
    const removeForeignKeyFromUserChannel2 = () => queryInterface.removeConstraint('UserChannels', 'fk_userchannel_channel');
    const removeForeignKeyFromUserRole = () => queryInterface.removeConstraint('UserRoles', 'fk_userrole_user');

    return Promise.resolve()
      .then(removeForeignKeyFromUserRole)
      .then(removeForeignKeyFromUserChannel2)
      .then(removeForeignKeyFromUserChannel1)
      .then(removeForeignKeyFromUserApplication2)
      .then(removeForeignKeyFromUserApplication1)
      .then(removeForeignKeyFromUserApiKey2)
      .then(removeForeignKeyFromUserApiKey1);
  },
};
