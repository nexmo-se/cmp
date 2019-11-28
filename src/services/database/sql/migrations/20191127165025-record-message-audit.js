module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuditMapi = () => queryInterface.createTable('CmpRecordMessageStatusAuditMapis', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      messageUuid: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      toType: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      toId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      toNumber: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      fromType: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      fromId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      fromNumber: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      timestamp: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      errorCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      errorReason: {
        type: Sequelize.STRING(5000),
        allowNull: true,
      },
      usageCurrency: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      usagePrice: {
        type: Sequelize.DECIMAL(10, 6),
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

    const createAuditSms = () => queryInterface.createTable('CmpRecordMessageStatusAuditSms', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      messageId: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      msisdn: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      to: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      networkCode: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      price: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      scts: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      errCode: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      messageTimestamp: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(45),
        allowNull: false,
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

    const createAudit = () => queryInterface.createTable('CmpRecordMessageStatusAudits', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      messageType: {
        type: Sequelize.STRING(45),
        allowNull: false,
        default: 'mapi',
      },
      cmpRecordMessageStatusAuditMapiId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      cmpRecordMessageStatusAuditSmsId: {
        type: Sequelize.STRING(45),
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

    return Promise.resolve()
      .then(createAuditMapi)
      .then(createAuditSms)
      .then(createAudit);
  },
  down: (queryInterface) => {
    const dropAuditMapi = () => queryInterface
      .dropTable('CmpRecordMessageStatusAuditMapis');

    const dropAuditSms = () => queryInterface
      .dropTable('CmpRecordMessageStatusAuditSms');

    const dropAudit = () => queryInterface
      .dropTable('CmpRecordMessageStatusAudits');

    return Promise.resolve()
      .then(dropAudit)
      .then(dropAuditMapi)
      .then(dropAuditSms);
  },
};
