module.exports = {
  up: (queryInterface) => {
    const addForeignKeyToCampaignStatusAudit = () => queryInterface.addConstraint('CmpCampaignStatusAudits', ['cmpCampaignId'], {
      type: 'foreign key',
      name: 'fk_cmpcampaignstatusaudit_campaign',
      references: {
        table: 'CmpCampaigns',
        field: 'id',
      },
    });

    return Promise.resolve()
      .then(addForeignKeyToCampaignStatusAudit);
  },
  down: (queryInterface) => {
    const removeForeignKeyFromCampaignStatusAudit = () => queryInterface.removeConstraint('CmpCampaignStatusAudits', 'fk_cmpcampaignstatusaudit_campaign');

    return Promise.resolve()
      .then(removeForeignKeyFromCampaignStatusAudit);
  },
};
