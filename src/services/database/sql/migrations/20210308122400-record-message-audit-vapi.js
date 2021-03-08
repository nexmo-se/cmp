module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuditVapi = () => queryInterface.createTable('CmpRecordMessageStatusAuditVapis', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      from: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      to: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      uuid: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      conversationUuid: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      direction: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      startTime: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      endTime: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      rate: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: true,
      },
      network: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      detail: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      dtmfDigits: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      dtmfTimedOut: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      speechText: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      speechConfidence: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: true,
      },
      speechTimeoutReason: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      speechErrorReason: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      clientRef: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    const addAuditVapiId = () => queryInterface.addColumn('CmpRecordMessageStatusAudits', 'cmpRecordMessageStatusAuditVapiId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    return Promise.resolve()
      .then(createAuditVapi)
      .then(addAuditVapiId);
  },
  down: (queryInterface) => {
    const dropAuditVapi = () => queryInterface
      .dropTable('CmpRecordMessageStatusAuditVapis');

    const removeAuditVapiId = () => queryInterface.removeColumn('CmpRecordMessageStatusAudits', 'cmpRecordMessageStatusAuditVapiId');
    return Promise.resolve()
      .then(removeAuditVapiId)
      .then(dropAuditVapi);
  },
};
