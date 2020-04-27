module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToMedia1 = () => queryInterface.addConstraint('CmpMedia', ['cmpMediaTextId'], {
      type: 'foreign key',
      name: 'fk_cmpmedia_text',
      references: {
        table: 'CmpMediaTexts',
        field: 'id',
      },
    });

    const addForeignKeyToMedia2 = () => queryInterface.addConstraint('CmpMedia', ['cmpMediaImageId'], {
      type: 'foreign key',
      name: 'fk_cmpmedia_image',
      references: {
        table: 'CmpMediaImages',
        field: 'id',
      },
    });

    const addForeignKeyToMedia3 = () => queryInterface.addConstraint('CmpMedia', ['cmpMediaAudioId'], {
      type: 'foreign key',
      name: 'fk_cmpmedia_audio',
      references: {
        table: 'CmpMediaAudios',
        field: 'id',
      },
    });

    const addForeignKeyToMedia4 = () => queryInterface.addConstraint('CmpMedia', ['cmpMediaVideoId'], {
      type: 'foreign key',
      name: 'fk_cmpmedia_video',
      references: {
        table: 'CmpMediaVideos',
        field: 'id',
      },
    });

    const addForeignKeyToMedia5 = () => queryInterface.addConstraint('CmpMedia', ['cmpMediaFileId'], {
      type: 'foreign key',
      name: 'fk_cmpmedia_file',
      references: {
        table: 'CmpMediaFiles',
        field: 'id',
      },
    });

    const addForeignKeyToMedia6 = () => queryInterface.addConstraint('CmpMedia', ['cmpMediaLocationId'], {
      type: 'foreign key',
      name: 'fk_cmpmedia_location',
      references: {
        table: 'CmpMediaLocations',
        field: 'id',
      },
    });

    const addForeignKeyToMedia7 = () => queryInterface.addConstraint('CmpMedia', ['cmpMediaViberTemplateId'], {
      type: 'foreign key',
      name: 'fk_cmpmedia_viber_template',
      references: {
        table: 'CmpMediaViberTemplates',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToMedia1)
      .then(addForeignKeyToMedia2)
      .then(addForeignKeyToMedia3)
      .then(addForeignKeyToMedia4)
      .then(addForeignKeyToMedia5)
      .then(addForeignKeyToMedia6)
      .then(addForeignKeyToMedia7);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromMedia1 = () => queryInterface.removeConstraint('CmpMedia', 'fk_cmpmedia_text');
    const removeForeignKeyFromMedia2 = () => queryInterface.removeConstraint('CmpMedia', 'fk_cmpmedia_image');
    const removeForeignKeyFromMedia3 = () => queryInterface.removeConstraint('CmpMedia', 'fk_cmpmedia_audio');
    const removeForeignKeyFromMedia4 = () => queryInterface.removeConstraint('CmpMedia', 'fk_cmpmedia_video');
    const removeForeignKeyFromMedia5 = () => queryInterface.removeConstraint('CmpMedia', 'fk_cmpmedia_file');
    const removeForeignKeyFromMedia6 = () => queryInterface.removeConstraint('CmpMedia', 'fk_cmpmedia_location');
    const removeForeignKeyFromMedia7 = () => queryInterface.removeConstraint('CmpMedia', 'fk_cmpmedia_viber_template');

    return Promise.resolve()
      .then(removeForeignKeyFromMedia7)
      .then(removeForeignKeyFromMedia6)
      .then(removeForeignKeyFromMedia5)
      .then(removeForeignKeyFromMedia4)
      .then(removeForeignKeyFromMedia3)
      .then(removeForeignKeyFromMedia2)
      .then(removeForeignKeyFromMedia1);
  },
};
