module.exports = {
  up: (queryInterface) => {
    const addCmpRecordsCmpCampaignIdDeleted = () => queryInterface.addIndex(
      'CmpRecords',
      [
        'cmpCampaignId',
        'deleted',
      ],
    );
    // create index cmp_records_cmp_campaign_id_deleted on CmpRecords (cmpCampaignId, deleted);
    return Promise.resolve()
      .then(addCmpRecordsCmpCampaignIdDeleted);
  },
  down: (queryInterface) => {
    const removeCmpRecordsCmpCampaignIdDeleted = () => queryInterface.removeIndex(
      'CmpRecords',
      [
        'cmpCampaignId',
        'deleted',
      ],
    );

    return Promise.resolve()
      .then(removeCmpRecordsCmpCampaignIdDeleted);
  },
};
