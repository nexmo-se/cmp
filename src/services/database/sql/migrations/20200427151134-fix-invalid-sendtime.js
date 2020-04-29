module.exports = {
  up: (queryInterface) => {
    const fixInvalidSendTime = () => queryInterface.sequelize.query(
      'update CmpRecords set sendTime = NULL where CAST(sendTime as char(20))=\'0000-00-00 00:00:00\'',
    );
    return Promise.resolve()
      .then(fixInvalidSendTime);
  },
  down: () => Promise.resolve(),
};
