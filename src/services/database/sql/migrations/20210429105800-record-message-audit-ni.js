module.exports = {
  up: (queryInterface, Sequelize) => {
    const createAuditNi = () => queryInterface.createTable('CmpRecordMessageStatusAuditNis', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      statusMessage: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      requestId: {
        type: Sequelize.STRING(45),
        allowNull: true,
      },
      internationalFormatNumber: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nationalFormatNumber: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      countryCode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      countryCodeIso3: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      countryName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      countryPrefix: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      requestPrice: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      refundPrice: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      remainingBalance: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      currentCarrierNetworkCode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      currentCarrierName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      currentCarrierCountry: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      currentCarrierNetworkType: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      originalCarrierNetworkCode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      originalCarrierName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      originalCarrierCountry: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      originalCarrierNetworkType: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      ported: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      roamingStatus: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      roamingCountryCode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      roamingNetworkCode: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      roamingNetworkName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      callerType: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      callerName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      callerFirstName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      callerLastName: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      lookupOutcome: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lookupOutcomeMessage: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      validNumber: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      reachable: {
        type: Sequelize.STRING(100),
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
    const addAuditNiId = () => queryInterface.addColumn('CmpRecordMessageStatusAudits', 'cmpRecordMessageStatusAuditNiId', {
      type: Sequelize.STRING(45),
      allowNull: true,
    });

    return Promise.resolve()
      .then(createAuditNi)
      .then(addAuditNiId);
  },
  down: (queryInterface) => {
    const dropAuditNi = () => queryInterface
      .dropTable('CmpRecordMessageStatusAuditNis');

    const removeAuditNiId = () => queryInterface.removeColumn('CmpRecordMessageStatusAudits', 'cmpRecordMessageStatusAuditNiId');
    return Promise.resolve()
      .then(removeAuditNiId)
      .then(dropAuditNi);
  },
};
