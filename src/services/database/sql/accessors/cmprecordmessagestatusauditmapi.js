/**
 * Accessor Service for CMP Record Message Status Audits (Messages API)
 * Create, Read, Update, Delete and List Record Message Status Audits (Messages API)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Mapi Model Accessor');

  const getById = async (cmpRecordMessageStatusAuditMapiId, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAuditMapi,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditMapiId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAuditMapi = await CmpRecordMessageStatusAuditMapi
        .findOne(query);
      if (rawCmpRecordMessageStatusAuditMapi == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditMapi = mapCmpRecordMessageStatusAuditMapi(
        rawCmpRecordMessageStatusAuditMapi,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapi);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpRecordMessageStatusAuditMapiId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpRecordMessageStatusAuditMapi,
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

      const rawCmpRecordMessageStatusAuditMapis = await CmpRecordMessageStatusAuditMapi
        .findAll(query);
      const cmpRecordMessageStatusAuditMapis = rawCmpRecordMessageStatusAuditMapis
        .map(cmpRecordMessageStatusAuditMapi => mapCmpRecordMessageStatusAuditMapi(
          cmpRecordMessageStatusAuditMapi,
        ));
      return Promise.resolve(cmpRecordMessageStatusAuditMapis);
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
      const cmpRecordMessageStatusAuditMapis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      if (cmpRecordMessageStatusAuditMapis == null
        || cmpRecordMessageStatusAuditMapis.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditMapi = cmpRecordMessageStatusAuditMapis[0];
      return Promise.resolve(cmpRecordMessageStatusAuditMapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordMessageStatusAuditMapiId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditMapi } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditMapiId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditMapi.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditMapi Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpRecordMessageStatusAuditMapiId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpRecordMessageStatusAuditMapiId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditMapi } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditMapi.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditMapi Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessageStatusAuditMapis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapis);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpRecordMessageStatusAuditMapi = (cmpRecordMessageStatusAuditMapi) => {
    const mappedCmpRecordMessageStatusAuditMapi = cmpRecordMessageStatusAuditMapi.dataValues;

    delete mappedCmpRecordMessageStatusAuditMapi.deleted;
    delete mappedCmpRecordMessageStatusAuditMapi.createdAt;
    delete mappedCmpRecordMessageStatusAuditMapi.updatedAt;

    return mappedCmpRecordMessageStatusAuditMapi;
  };

  const listRecordMessageStatusAuditMapis = async (options = {}) => {
    try {
      const cmpRecordMessageStatusAuditMapis = await getByCriteria({}, true, options);
      return Promise.resolve(cmpRecordMessageStatusAuditMapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditMapiBatch = async (audits) => {
    try {
      const { CmpRecordMessageStatusAuditMapi } = container.databaseService.models;
      const createableAudits = audits.map(audit => ({
        id: audit.id || container.uuid(),
        messageUuid: audit.messageUuid,
        toType: audit.toType,
        toId: audit.toId,
        toNumber: audit.toNumber,
        fromType: audit.fromType,
        fromId: audit.fromId,
        fromNumber: audit.fromNumber,
        timestamp: audit.timestamp,
        status: audit.status,
        errorCode: audit.errorCode,
        errorReason: audit.errorReason,
        usageCurrency: audit.usageCurrency,
        usagePrice: audit.usagePrice,
        clientRef: audit.clientRef,
        deleted: false,
      }));

      const rawAuditMapis = await CmpRecordMessageStatusAuditMapi.bulkCreate(createableAudits);
      const auditMapis = rawAuditMapis.map(mapCmpRecordMessageStatusAuditMapi);
      return Promise.resolve(auditMapis);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditMapiBatch(audits);
      }
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditMapi = async (
    id,
    messageUuid,
    toType,
    toId,
    toNumber,
    fromType,
    fromId,
    fromNumber,
    timestamp,
    status,
    errorCode,
    errorReason,
    usageCurrency,
    usagePrice,
    clientRef,
  ) => {
    try {
      const { CmpRecordMessageStatusAuditMapi } = container.databaseService.models;
      const rawCmpRecordMessageStatusAuditMapi = await CmpRecordMessageStatusAuditMapi.create({
        id: id || container.uuid(),
        messageUuid,
        toType,
        toId,
        toNumber,
        fromType,
        fromId,
        fromNumber,
        timestamp,
        status,
        errorCode,
        errorReason,
        usageCurrency,
        usagePrice,
        clientRef,
        deleted: false,
      });

      const cmpRecordMessageStatusAuditMapi = mapCmpRecordMessageStatusAuditMapi(
        rawCmpRecordMessageStatusAuditMapi,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapi);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditMapi(
          id,
          messageUuid,
          toType,
          toId,
          toNumber,
          fromType,
          fromId,
          fromNumber,
          timestamp,
          status,
          errorCode,
          errorReason,
          usageCurrency,
          usagePrice,
          clientRef,
        );
      }
      return Promise.reject(error);
    }
  };

  const readRecordMessageStatusAuditMapi = async (cmpRecordMessageStatusAuditMapiId) => {
    try {
      const cmpRecordMessageStatusAuditMapi = await getById(
        cmpRecordMessageStatusAuditMapiId, false,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessageStatusAuditMapi = async (
    cmpRecordMessageStatusAuditMapiId, changes, options = {},
  ) => {
    try {
      const cmpRecordMessageStatusAuditMapi = await updateById(
        cmpRecordMessageStatusAuditMapiId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessageStatusAuditMapis = async (criteria, changes, options = {}) => {
    try {
      const cmpRecordMessageStatusAuditMapis = await updateByCriteria(
        criteria, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditMapi = async (
    cmpRecordMessageStatusAuditMapiId,
    options = { noGet: true },
  ) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditMapi = await updateById(
        cmpRecordMessageStatusAuditMapiId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditMapis = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditMapis = await updateByCriteria(
        criteria, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditMapi = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAuditMapi = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAuditMapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditMapis = async (
    criteria = {}, excludeDeleted = true,
    options = {}) => {
    try {
      const cmpRecordMessageStatusAuditMapis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditMapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessageStatusAuditMapis,

    createRecordMessageStatusAuditMapi,
    createRecordMessageStatusAuditMapiBatch,

    readRecordMessageStatusAuditMapi,

    updateRecordMessageStatusAuditMapi,
    updateRecordMessageStatusAuditMapis,

    deleteRecordMessageStatusAuditMapi,
    deleteRecordMessageStatusAuditMapis,

    findRecordMessageStatusAuditMapi,
    findRecordMessageStatusAuditMapis,
  };
};
