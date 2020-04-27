module.exports = {
  up: (queryInterface) => {
    const updateMedia1 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaTextId: null }, { cmpMediaTextId: '' });
    const updateMedia2 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaImageId: null }, { cmpMediaImageId: '' });
    const updateMedia3 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaAudioId: null }, { cmpMediaAudioId: '' });
    const updateMedia4 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaVideoId: null }, { cmpMediaVideoId: '' });
    const updateMedia5 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaFileId: null }, { cmpMediaFileId: '' });
    const updateMedia6 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaLocationId: null }, { cmpMediaLocationId: '' });
    const updateMedia7 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaViberTemplateId: null }, { cmpMediaViberTemplateId: '' });
    const updateRecord = () => queryInterface.bulkUpdate('CmpRecords', { cmpMediaId: null }, { cmpMediaId: '' });

    return Promise.resolve()
      .then(updateMedia1)
      .then(updateMedia2)
      .then(updateMedia3)
      .then(updateMedia4)
      .then(updateMedia5)
      .then(updateMedia6)
      .then(updateMedia7)
      .then(updateRecord);
  },
  down: (queryInterface) => {
    const deupdateMedia1 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaTextId: '' }, { cmpMediaTextId: null });
    const deupdateMedia2 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaImageId: '' }, { cmpMediaImageId: null });
    const deupdateMedia3 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaAudioId: '' }, { cmpMediaAudioId: null });
    const deupdateMedia4 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaVideoId: '' }, { cmpMediaVideoId: null });
    const deupdateMedia5 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaFileId: '' }, { cmpMediaFileId: null });
    const deupdateMedia6 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaLocationId: '' }, { cmpMediaLocationId: null });
    const deupdateMedia7 = () => queryInterface.bulkUpdate('CmpMedia', { cmpMediaViberTemplateId: '' }, { cmpMediaViberTemplateId: null });
    const deupdateRecord = () => queryInterface.bulkUpdate('CmpRecords', { cmpMediaId: '' }, { cmpMediaId: null });

    return Promise.resolve()
      .then(deupdateRecord)
      .then(deupdateMedia7)
      .then(deupdateMedia6)
      .then(deupdateMedia5)
      .then(deupdateMedia4)
      .then(deupdateMedia3)
      .then(deupdateMedia2)
      .then(deupdateMedia1);
  },
};
