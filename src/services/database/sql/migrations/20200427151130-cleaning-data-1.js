module.exports = {
  up: (queryInterface) => {
    const deleteInvalidApplicationApiKey = () => queryInterface.sequelize.query(
      'delete from CmpApplications where cmpApiKeyId not in (select id from CmpApiKeys)',
    );
    const nullifyInvalidChannelApiKey = () => queryInterface.sequelize.query(
      'update CmpChannels set cmpApiKeyId = null where cmpApiKeyId not in (select id from CmpApiKeys)',
    );
    const nullifyInvalidChannelApplication = () => queryInterface.sequelize.query(
      'update CmpChannels set cmpApplicationId = null where cmpApplicationId not in (select id from CmpApplications)',
    );
    const deleteInvalidTemplateChannel = () => queryInterface.sequelize.query(
      'delete from CmpTemplates where cmpChannelId not in (select id from CmpChannels)',
    );

    return Promise.resolve()
      .then(deleteInvalidApplicationApiKey)
      .then(nullifyInvalidChannelApiKey)
      .then(nullifyInvalidChannelApplication)
      .then(deleteInvalidTemplateChannel);
  },

  // This is a one way migration, undo is not possible and not necessary at this stage
  // Reason: no live customer yet
  down: () => Promise.resolve(),
};
