module.exports = {
  up: (queryInterface, Sequelize) => {
    const fixInvalidSendTime = () => queryInterface.sequelize.query('update CmpRecords set sendTime = NULL where CAST(sendTime as char(20))=\'0000-00-00 00:00:00\'');
    const dropCmpRecordsPrimaryKey = () => queryInterface.removeConstraint('CmpRecords', 'PRIMARY');
    const createCmpRecordsPrimaryIdColumn = () => queryInterface.addColumn('CmpRecords', 'primaryId', {
      type: Sequelize.BIGINT(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    });

    const fixInvalidCreatedTime = () => queryInterface.sequelize.query('update CmpParameters set createdAt = \'2020-03-09 00:00:00\' where CAST(createdAt as char(20))=\'0000-00-00 00:00:00\'');
    const dropCmpParametersPrimaryKey = () => queryInterface.removeConstraint('CmpParameters', 'PRIMARY');
    const createCmpParametersPrimaryIdColumn = () => queryInterface.addColumn('CmpParameters', 'primaryId', {
      type: Sequelize.BIGINT(),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    });

    return Promise.resolve()
      .then(fixInvalidSendTime)
      .then(dropCmpRecordsPrimaryKey)
      .then(createCmpRecordsPrimaryIdColumn)
      .then(fixInvalidCreatedTime)
      .then(dropCmpParametersPrimaryKey)
      .then(createCmpParametersPrimaryIdColumn);
  },
  down: (queryInterface) => {
    const dropCmpRecordsPrimaryKey = () => queryInterface.removeConstraint('CmpRecords', 'PRIMARY');
    const removeCmpRecordsPrimaryIdColumn = () => queryInterface.removeColumn('CmpRecords', 'primaryId');
    const createCmpRecordsPrimaryKey = () => queryInterface.addConstraint('CmpRecords', ['id'], { type: 'primary key', name: 'PRIMARY' });

    const dropCmpParametersPrimaryKey = () => queryInterface.removeConstraint('CmpParameters', 'PRIMARY');
    const removeCmpParametersPrimaryIdColumn = () => queryInterface.removeColumn('CmpParameters', 'primaryId');
    const createCmpParametersPrimaryKey = () => queryInterface.addConstraint('CmpParameters', ['id'], { type: 'primary key', name: 'PRIMARY' });

    return Promise.resolve()
      .then(dropCmpRecordsPrimaryKey)
      .then(removeCmpRecordsPrimaryIdColumn)
      .then(createCmpRecordsPrimaryKey)
      .then(dropCmpParametersPrimaryKey)
      .then(removeCmpParametersPrimaryIdColumn)
      .then(createCmpParametersPrimaryKey);
  },
};
