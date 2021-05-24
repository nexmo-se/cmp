/**
 * Accessor Service for CMP Record Message Status Audits (Voice API)
 * Create, Read, Update, Delete and List Record Message Status Audits (Voice API)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Vapi Model Accessor');

  const getById = async (cmpRecordMessageStatusAuditVapiId, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAuditVapi,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditVapiId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAuditVapi = await CmpRecordMessageStatusAuditVapi
        .findOne(query);
      if (rawCmpRecordMessageStatusAuditVapi == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditVapi = mapCmpRecordMessageStatusAuditVapi(
        rawCmpRecordMessageStatusAuditVapi,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapi);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpRecordMessageStatusAuditVapiId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpRecordMessageStatusAuditVapi,
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

      const rawCmpRecordMessageStatusAuditVapis = await CmpRecordMessageStatusAuditVapi
        .findAll(query);
      const cmpRecordMessageStatusAuditVapis = rawCmpRecordMessageStatusAuditVapis
        .map(cmpRecordMessageStatusAuditVapi => mapCmpRecordMessageStatusAuditVapi(
          cmpRecordMessageStatusAuditVapi,
        ));
      return Promise.resolve(cmpRecordMessageStatusAuditVapis);
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
      const cmpRecordMessageStatusAuditVapis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      if (cmpRecordMessageStatusAuditVapis == null
        || cmpRecordMessageStatusAuditVapis.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditVapi = cmpRecordMessageStatusAuditVapis[0];
      return Promise.resolve(cmpRecordMessageStatusAuditVapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordMessageStatusAuditVapiId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditVapi } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditVapiId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditVapi.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditVapi Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpRecordMessageStatusAuditVapiId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpRecordMessageStatusAuditVapiId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditVapi } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditVapi.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditVapi Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessageStatusAuditVapis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapis);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpRecordMessageStatusAuditVapi = (cmpRecordMessageStatusAuditVapi) => {
    const mappedCmpRecordMessageStatusAuditVapi = cmpRecordMessageStatusAuditVapi.dataValues;

    delete mappedCmpRecordMessageStatusAuditVapi.deleted;
    delete mappedCmpRecordMessageStatusAuditVapi.createdAt;
    delete mappedCmpRecordMessageStatusAuditVapi.updatedAt;

    return mappedCmpRecordMessageStatusAuditVapi;
  };

  const listRecordMessageStatusAuditVapis = async (options = {}) => {
    try {
      const cmpRecordMessageStatusAuditVapis = await getByCriteria({}, true, options);
      return Promise.resolve(cmpRecordMessageStatusAuditVapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditVapiBatch = async (audits) => {
    try {
      const { CmpRecordMessageStatusAuditVapi } = container.databaseService.models;
      const createableAudits = audits.map(audit => ({
        id: audit.id || container.uuid(),
        from: audit.from,
        to: audit.to,
        uuid: audit.uuid,
        conversationUuid: audit.conversationUuid,
        status: audit.status,
        direction: audit.direction,
        timestamp: audit.timestamp,
        startTime: audit.startTime,
        endTime: audit.endTime,
        duration: audit.duration,
        rate: audit.rate,
        price: audit.price,
        network: audit.network,
        detail: audit.detail,
        dtmfDigits: audit.dtmfDigits,
        dtmfTimedOut: audit.dtmfTimedOut,
        speechText: audit.speechText,
        speechConfidence: audit.speechConfidence,
        speechTimeoutReason: audit.speechTimeoutReason,
        speechErrorReason: audit.speechErrorReason,
        clientRef: audit.clientRef,
        deleted: false,
      }));

      const rawAuditVapis = await CmpRecordMessageStatusAuditVapi.bulkCreate(createableAudits);
      const auditVapis = rawAuditVapis.map(mapCmpRecordMessageStatusAuditVapi);
      return Promise.resolve(auditVapis);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditVapiBatch(audits);
      }
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditVapi = async (
    id,
    from,
    to,
    uuid,
    conversationUuid,
    status,
    direction,
    timestamp,
    startTime,
    endTime,
    duration,
    rate,
    price,
    network,
    detail,
    dtmfDigits,
    dtmfTimedOut,
    speechText,
    speechConfidence,
    speechTimeoutReason,
    speechErrorReason,
    clientRef,
  ) => {
    try {
      const { CmpRecordMessageStatusAuditVapi } = container.databaseService.models;
      const rawCmpRecordMessageStatusAuditVapi = await CmpRecordMessageStatusAuditVapi.create({
        id: id || container.uuid(),
        from,
        to,
        uuid,
        conversationUuid,
        status,
        direction,
        timestamp,
        startTime,
        endTime,
        duration,
        rate,
        price,
        network,
        detail,
        dtmfDigits,
        dtmfTimedOut,
        speechText,
        speechConfidence,
        speechTimeoutReason,
        speechErrorReason,
        clientRef,
        deleted: false,
      });

      const cmpRecordMessageStatusAuditVapi = mapCmpRecordMessageStatusAuditVapi(
        rawCmpRecordMessageStatusAuditVapi,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapi);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditVapi(
          id,
          from,
          to,
          uuid,
          conversationUuid,
          status,
          direction,
          timestamp,
          startTime,
          endTime,
          duration,
          rate,
          price,
          network,
          detail,
          dtmfDigits,
          dtmfTimedOut,
          speechText,
          speechConfidence,
          speechTimeoutReason,
          speechErrorReason,
          clientRef,
        );
      }
      return Promise.reject(error);
    }
  };

  const readRecordMessageStatusAuditVapi = async (cmpRecordMessageStatusAuditVapiId) => {
    try {
      const cmpRecordMessageStatusAuditVapi = await getById(
        cmpRecordMessageStatusAuditVapiId, false,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessageStatusAuditVapi = async (
    cmpRecordMessageStatusAuditVapiId, changes, options = {},
  ) => {
    try {
      const cmpRecordMessageStatusAuditVapi = await updateById(
        cmpRecordMessageStatusAuditVapiId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessageStatusAuditVapis = async (criteria, changes, options = {}) => {
    try {
      const cmpRecordMessageStatusAuditVapis = await updateByCriteria(
        criteria, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditVapi = async (
    cmpRecordMessageStatusAuditVapiId,
    options = { noGet: true },
  ) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditVapi = await updateById(
        cmpRecordMessageStatusAuditVapiId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditVapis = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditVapis = await updateByCriteria(
        criteria, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditVapi = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAuditVapi = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAuditVapi);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditVapis = async (
    criteria = {}, excludeDeleted = true,
    options = {}) => {
    try {
      const cmpRecordMessageStatusAuditVapis = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditVapis);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessageStatusAuditVapis,

    createRecordMessageStatusAuditVapi,
    createRecordMessageStatusAuditVapiBatch,

    readRecordMessageStatusAuditVapi,

    updateRecordMessageStatusAuditVapi,
    updateRecordMessageStatusAuditVapis,

    deleteRecordMessageStatusAuditVapi,
    deleteRecordMessageStatusAuditVapis,

    findRecordMessageStatusAuditVapi,
    findRecordMessageStatusAuditVapis,
  };
};
