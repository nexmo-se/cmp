module.exports = {
  up: (queryInterface) => {
    const deleteInvalidRecordCampaign = () => queryInterface.sequelize.query(
      'delete from CmpRecords where cmpCampaignId not in (select id from CmpCampaigns)',
    );
    const deleteInvalidRecordTemplate = () => queryInterface.sequelize.query(
      'delete from CmpRecords where cmpTemplateId not in (select id from CmpTemplates)',
    );
    const nullifyInvalidRecordMedia = () => queryInterface.sequelize.query(
      'update CmpRecords set cmpMediaId = null where cmpMediaId not in (select id from CmpMedia)',
    );
    const deleteInvalidParameterRecord = () => queryInterface.sequelize.query(
      'delete from CmpParameters where cmpRecordId not in (select id from CmpRecords)',
    );
    const deleteInvalidRecordMessageRecord = () => queryInterface.sequelize.query(
      'delete from CmpRecordMessages where cmpRecordId not in (select id from CmpRecords)',
    );
    const deleteInvalidCampaignStatusAuditCampaign = () => queryInterface.sequelize.query(
      'delete from CmpCampaignStatusAudits where cmpCampaignId not in (select id from CmpCampaigns)',
    );
    const deleteInvalidRecordMessageStatusAuditRecordMessage = () => queryInterface.sequelize.query(
      'delete from CmpRecordMessageStatusAudits where cmpRecordMessageId not in (select id from CmpRecordMessages)',
    );
    const nullifyInvalidRecordMessageStatusAuditRMSAuditSms = () => queryInterface.sequelize.query(
      'update CmpRecordMessageStatusAudits set cmpRecordMessageStatusAuditSmsId = null where cmpRecordMessageStatusAuditSmsId not in (select id from CmpRecordMessageStatusAuditSms)',
    );
    const nullifyInvalidRecordMessageStatusAuditRMSAuditMapi = () => queryInterface.sequelize.query(
      'update CmpRecordMessageStatusAudits set cmpRecordMessageStatusAuditMapiId = null where cmpRecordMessageStatusAuditMapiId not in (select id from CmpRecordMessageStatusAuditMapis)',
    );

    return Promise.resolve()
      .then(deleteInvalidRecordCampaign)
      .then(deleteInvalidRecordTemplate)
      .then(nullifyInvalidRecordMedia)
      .then(deleteInvalidParameterRecord)
      .then(deleteInvalidRecordMessageRecord)
      .then(deleteInvalidCampaignStatusAuditCampaign)
      .then(deleteInvalidRecordMessageStatusAuditRecordMessage)
      .then(nullifyInvalidRecordMessageStatusAuditRMSAuditSms)
      .then(nullifyInvalidRecordMessageStatusAuditRMSAuditMapi);
  },

  // This is a one way migration, undo is not possible and not necessary at this stage
  // Reason: no live customer yet
  down: () => Promise.resolve(),
};
