module.exports = {
  up: (queryInterface) => {
    const addCmpRecordsCmpCampaignIdStatusDeleted = () => queryInterface.addIndex(
      'CmpRecords',
      [
        'cmpCampaignId',
        'status',
        'deleted',
      ],
    );
    const addCmpCampaignsIdDeleted = () => queryInterface.addIndex(
      'CmpCampaigns',
      [
        'id',
        'deleted',
      ],
    );
    // create index cmpCampaignId_status_deleted on CmpRecords (cmpCampaignId, status, deleted);

    // create index id_deleted on CmpCampaigns (id, deleted);
    return Promise.resolve()
      .then(addCmpRecordsCmpCampaignIdStatusDeleted)
      .then(addCmpCampaignsIdDeleted);
  },
  down: (queryInterface) => {
    const removeCmpRecordsCmpCampaignIdStatusDeleted = () => queryInterface.removeIndex(
      'CmpRecords',
      [
        'cmpCampaignId',
        'status',
        'deleted',
      ],
    );
    const removeCmpCampaignsIdDeleted = () => queryInterface.removeIndex(
      'CmpCampaigns',
      [
        'id',
        'deleted',
      ],
    );

    return Promise.resolve()
      .then(removeCmpRecordsCmpCampaignIdStatusDeleted)
      .then(removeCmpCampaignsIdDeleted);
  },
};
