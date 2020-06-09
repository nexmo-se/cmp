module.exports = {
  up: (queryInterface) => {
    const nullifyMediaMediaText = () => queryInterface.sequelize.query(
      'update CmpMedia set cmpMediaTextId = null where cmpMediaTextId not in (select id from CmpMediaTexts)',
    );
    const nullifyMediaMediaImage = () => queryInterface.sequelize.query(
      'update CmpMedia set cmpMediaImageId = null where cmpMediaImageId not in (select id from CmpMediaImages)',
    );
    const nullifyMediaMediaAudio = () => queryInterface.sequelize.query(
      'update CmpMedia set cmpMediaAudioId = null where cmpMediaAudioId not in (select id from CmpMediaAudios)',
    );
    const nullifyMediaMediaVideo = () => queryInterface.sequelize.query(
      'update CmpMedia set cmpMediaVideoId = null where cmpMediaVideoId not in (select id from CmpMediaVideos)',
    );
    const nullifyMediaMediaFile = () => queryInterface.sequelize.query(
      'update CmpMedia set cmpMediaFileId = null where cmpMediaFileId not in (select id from CmpMediaFiles)',
    );
    const nullifyMediaMediaLocation = () => queryInterface.sequelize.query(
      'update CmpMedia set cmpMediaLocationId = null where cmpMediaLocationId not in (select id from CmpMediaLocations)',
    );
    const nullifyMediaMediaViberTemplate = () => queryInterface.sequelize.query(
      'update CmpMedia set cmpMediaViberTemplateId = null where cmpMediaViberTemplateId not in (select id from CmpMediaViberTemplates)',
    );

    return Promise.resolve()
      .then(nullifyMediaMediaText)
      .then(nullifyMediaMediaImage)
      .then(nullifyMediaMediaAudio)
      .then(nullifyMediaMediaVideo)
      .then(nullifyMediaMediaFile)
      .then(nullifyMediaMediaLocation)
      .then(nullifyMediaMediaViberTemplate);
  },

  // This is a one way migration, undo is not possible and not necessary at this stage
  // Reason: no live customer yet
  down: () => Promise.resolve(),
};
