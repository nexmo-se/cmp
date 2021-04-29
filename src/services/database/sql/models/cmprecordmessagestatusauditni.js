module.exports = (sequelize, DataTypes) => {
  const CmpRecordMessageStatusAuditNi = sequelize.define('CmpRecordMessageStatusAuditNi', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusMessage: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    requestId: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    internationalFormatNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nationalFormatNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    countryCodeIso3: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    countryName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    countryPrefix: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    requestPrice: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    refundPrice: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    remainingBalance: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    currentCarrierNetworkCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    currentCarrierName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    currentCarrierCountry: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    currentCarrierNetworkType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    originalCarrierNetworkCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    originalCarrierName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    originalCarrierCountry: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    originalCarrierNetworkType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ported: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    roamingStatus: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    roamingCountryCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    roamingNetworkCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    roamingNetworkName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    callerType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    callerName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    callerFirstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    callerLastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lookupOutcome: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lookupOutcomeMessage: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    validNumber: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    reachable: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  }, {
    timestamps: true,
  });

  CmpRecordMessageStatusAuditNi.associate = (models) => {
    // associations can be defined here
  };

  return CmpRecordMessageStatusAuditNi;
};
