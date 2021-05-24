/**
 * Accessor Service for CMP Record Message Status Audits (Number Insights)
 * Create, Read, Update, Delete and List Record Message Status Audits (Number Insights)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Number Insight Model Accessor');

  const getById = async (cmpRecordMessageStatusAuditNiId, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAuditNi,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditNiId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAuditNi = await CmpRecordMessageStatusAuditNi
        .findOne(query);
      if (rawCmpRecordMessageStatusAuditNi == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditNi = mapCmpRecordMessageStatusAuditNi(
        rawCmpRecordMessageStatusAuditNi,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNi);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpRecordMessageStatusAuditNiId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpRecordMessageStatusAuditNi,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['createdAt', 'DESC'],
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpRecordMessageStatusAuditNis = await CmpRecordMessageStatusAuditNi
        .findAll(query);
      const cmpRecordMessageStatusAuditNis = rawCmpRecordMessageStatusAuditNis
        .map(cmpRecordMessageStatusAuditNi => mapCmpRecordMessageStatusAuditNi(
          cmpRecordMessageStatusAuditNi,
        ));
      return Promise.resolve(cmpRecordMessageStatusAuditNis);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpRecordMessageStatusAuditNis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      if (cmpRecordMessageStatusAuditNis == null
        || cmpRecordMessageStatusAuditNis.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditNi = cmpRecordMessageStatusAuditNis[0];
      return Promise.resolve(cmpRecordMessageStatusAuditNi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordMessageStatusAuditNiId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditNi } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditNiId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditNi.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditNi Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpRecordMessageStatusAuditNiId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpRecordMessageStatusAuditNiId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditNi } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditNi.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditNi Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessageStatusAuditNis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNis);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpRecordMessageStatusAuditNi = (cmpRecordMessageStatusAuditNi) => {
    const mappedCmpRecordMessageStatusAuditNi = cmpRecordMessageStatusAuditNi.dataValues;

    delete mappedCmpRecordMessageStatusAuditNi.deleted;
    delete mappedCmpRecordMessageStatusAuditNi.createdAt;
    delete mappedCmpRecordMessageStatusAuditNi.updatedAt;

    return mappedCmpRecordMessageStatusAuditNi;
  };

  const listRecordMessageStatusAuditNis = async (options = {}) => {
    try {
      const cmpRecordMessageStatusAuditNis = await getByCriteria({}, true, options);
      return Promise.resolve(cmpRecordMessageStatusAuditNis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditNiBatch = async (audits) => {
    try {
      const { CmpRecordMessageStatusAuditNi } = container.databaseService.models;
      const createableAudits = audits.map(audit => ({
        id: audit.id || container.uuid(),
        status: audit.status,
        statusMessage: audit.statusMessage,
        requestId: audit.requestId,
        internationalFormatNumber: audit.internationalFormatNumber,
        nationalFormatNumber: audit.nationalFormatNumber,
        countryCode: audit.countryCode,
        countryCodeIso3: audit.countryCodeIso3,
        countryName: audit.countryName,
        countryPrefix: audit.countryPrefix,
        requestPrice: audit.requestPrice,
        refundPrice: audit.refundPrice,
        remainingBalance: audit.remainingBalance,
        currentCarrierNetworkCode: audit.currentCarrierNetworkCode,
        currentCarrierName: audit.currentCarrierName,
        currentCarrierCountry: audit.currentCarrierCountry,
        currentCarrierNetworkType: audit.currentCarrierNetworkType,
        originalCarrierNetworkCode: audit.originalCarrierNetworkCode,
        originalCarrierName: audit.originalCarrierName,
        originalCarrierCountry: audit.originalCarrierCountry,
        originalCarrierNetworkType: audit.originalCarrierNetworkType,
        ported: audit.ported,
        roamingStatus: audit.roamingStatus,
        roamingCountryCode: audit.roamingCountryCode,
        roamingNetworkCode: audit.roamingNetworkCode,
        roamingNetworkName: audit.roamingNetworkName,
        callerType: audit.callerType,
        callerName: audit.callerName,
        callerFirstName: audit.callerFirstName,
        callerLastName: audit.callerLastName,
        lookupOutcome: audit.lookupOutcome,
        lookupOutcomeMessage: audit.lookupOutcomeMessage,
        validNumber: audit.validNumber,
        reachable: audit.reachable,
        deleted: false,
      }));

      const rawAuditNis = await CmpRecordMessageStatusAuditNi.bulkCreate(createableAudits);
      const auditNis = rawAuditNis.map(mapCmpRecordMessageStatusAuditNi);
      return Promise.resolve(auditNis);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditNiBatch(audits);
      }
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditNi = async (
    id,
    status,
    statusMessage,
    requestId,
    internationalFormatNumber,
    nationalFormatNumber,
    countryCode,
    countryCodeIso3,
    countryName,
    countryPrefix,
    requestPrice,
    refundPrice,
    remainingBalance,
    currentCarrierNetworkCode,
    currentCarrierName,
    currentCarrierCountry,
    currentCarrierNetworkType,
    originalCarrierNetworkCode,
    originalCarrierName,
    originalCarrierCountry,
    originalCarrierNetworkType,
    ported,
    roamingStatus,
    roamingCountryCode,
    roamingNetworkCode,
    roamingNetworkName,
    callerType,
    callerName,
    callerFirstName,
    callerLastName,
    lookupOutcome,
    lookupOutcomeMessage,
    validNumber,
    reachable,
  ) => {
    try {
      const { CmpRecordMessageStatusAuditNi } = container.databaseService.models;
      const rawCmpRecordMessageStatusAuditNi = await CmpRecordMessageStatusAuditNi.create({
        id: id || container.uuid(),
        status,
        statusMessage,
        requestId,
        internationalFormatNumber,
        nationalFormatNumber,
        countryCode,
        countryCodeIso3,
        countryName,
        countryPrefix,
        requestPrice,
        refundPrice,
        remainingBalance,
        currentCarrierNetworkCode,
        currentCarrierName,
        currentCarrierCountry,
        currentCarrierNetworkType,
        originalCarrierNetworkCode,
        originalCarrierName,
        originalCarrierCountry,
        originalCarrierNetworkType,
        ported,
        roamingStatus,
        roamingCountryCode,
        roamingNetworkCode,
        roamingNetworkName,
        callerType,
        callerName,
        callerFirstName,
        callerLastName,
        lookupOutcome,
        lookupOutcomeMessage,
        validNumber,
        reachable,
        deleted: false,
      });

      const cmpRecordMessageStatusAuditNi = mapCmpRecordMessageStatusAuditNi(
        rawCmpRecordMessageStatusAuditNi,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNi);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditNi(
          id,
          status,
          statusMessage,
          requestId,
          internationalFormatNumber,
          nationalFormatNumber,
          countryCode,
          countryCodeIso3,
          countryName,
          countryPrefix,
          requestPrice,
          refundPrice,
          remainingBalance,
          currentCarrierNetworkCode,
          currentCarrierName,
          currentCarrierCountry,
          currentCarrierNetworkType,
          originalCarrierNetworkCode,
          originalCarrierName,
          originalCarrierCountry,
          originalCarrierNetworkType,
          ported,
          roamingStatus,
          roamingCountryCode,
          roamingNetworkCode,
          roamingNetworkName,
          callerType,
          callerName,
          callerFirstName,
          callerLastName,
          lookupOutcome,
          lookupOutcomeMessage,
          validNumber,
          reachable,
        );
      }
      return Promise.reject(error);
    }
  };

  const readRecordMessageStatusAuditNi = async (cmpRecordMessageStatusAuditNiId) => {
    try {
      const cmpRecordMessageStatusAuditNi = await getById(
        cmpRecordMessageStatusAuditNiId, false,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessageStatusAuditNi = async (
    cmpRecordMessageStatusAuditNiId, changes, options = {},
  ) => {
    try {
      const cmpRecordMessageStatusAuditNi = await updateById(
        cmpRecordMessageStatusAuditNiId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessageStatusAuditNis = async (criteria, changes, options = {}) => {
    try {
      const cmpRecordMessageStatusAuditNis = await updateByCriteria(
        criteria, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditNi = async (
    cmpRecordMessageStatusAuditNiId,
    options = { noGet: true },
  ) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditNi = await updateById(
        cmpRecordMessageStatusAuditNiId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditNis = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditNis = await updateByCriteria(
        criteria, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditNi = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAuditNi = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAuditNi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditNis = async (
    criteria = {}, excludeDeleted = true,
    options = {}) => {
    try {
      const cmpRecordMessageStatusAuditNis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditNis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessageStatusAuditNis,

    createRecordMessageStatusAuditNi,
    createRecordMessageStatusAuditNiBatch,

    readRecordMessageStatusAuditNi,

    updateRecordMessageStatusAuditNi,
    updateRecordMessageStatusAuditNis,

    deleteRecordMessageStatusAuditNi,
    deleteRecordMessageStatusAuditNis,

    findRecordMessageStatusAuditNi,
    findRecordMessageStatusAuditNis,
  };
};
