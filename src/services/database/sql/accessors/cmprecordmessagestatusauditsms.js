/**
 * Accessor Service for CMP Record Message Status Audits (SMS)
 * Create, Read, Update, Delete and List Record Message Status Audits (SMS)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit SMS Model Accessor');

  const getById = async (cmpRecordMessageStatusAuditSmsId, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAuditSms,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditSmsId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAuditSms = await CmpRecordMessageStatusAuditSms
        .findOne(query);
      if (rawCmpRecordMessageStatusAuditSms == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditSms = mapCmpRecordMessageStatusAuditSms(
        rawCmpRecordMessageStatusAuditSms,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpRecordMessageStatusAuditSmsId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpRecordMessageStatusAuditSms,
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

      const rawCmpRecordMessageStatusAuditSmses = await CmpRecordMessageStatusAuditSms
        .findAll(query);
      const cmpRecordMessageStatusAuditSmses = rawCmpRecordMessageStatusAuditSmses
        .map(cmpRecordMessageStatusAuditSms => mapCmpRecordMessageStatusAuditSms(
          cmpRecordMessageStatusAuditSms,
        ));
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
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
      const cmpRecordMessageStatusAuditSmses = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      if (cmpRecordMessageStatusAuditSmses == null
        || cmpRecordMessageStatusAuditSmses.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditSms = cmpRecordMessageStatusAuditSmses[0];
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordMessageStatusAuditSmsId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditSms } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditSmsId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditSms.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditSms Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpRecordMessageStatusAuditSmsId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpRecordMessageStatusAuditSmsId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAuditSms } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditSms.update(changes, query);
      L.trace('CmpRecordMessageStatusAuditSms Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessageStatusAuditSmses = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpRecordMessageStatusAuditSms = (cmpRecordMessageStatusAuditSms) => {
    const mappedCmpRecordMessageStatusAuditSms = cmpRecordMessageStatusAuditSms.dataValues;

    delete mappedCmpRecordMessageStatusAuditSms.deleted;
    delete mappedCmpRecordMessageStatusAuditSms.createdAt;
    delete mappedCmpRecordMessageStatusAuditSms.updatedAt;

    return mappedCmpRecordMessageStatusAuditSms;
  };

  const listRecordMessageStatusAuditSmses = async (options = {}) => {
    try {
      const cmpRecordMessageStatusAuditSmses = await getByCriteria({}, true, options);
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditSmsBatch = async (audits) => {
    try {
      const { CmpRecordMessageStatusAuditSms } = container.databaseService.models;
      const createableAudits = audits.map(audit => ({
        id: audit.id || container.uuid(),
        msisdn: audit.msisdn,
        to: audit.to,
        networkCode: audit.networkCode,
        messageId: audit.messageId,
        price: audit.price,
        status: audit.status,
        scts: audit.scts,
        errCode: audit.errCode,
        messageTimestamp: audit.messageTimestamp,
        deleted: false,
      }));

      const rawAuditSmses = await CmpRecordMessageStatusAuditSms.bulkCreate(createableAudits);
      const auditSmses = rawAuditSmses.map(mapCmpRecordMessageStatusAuditSms);
      return Promise.resolve(auditSmses);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditSmsBatch(audits);
      }
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditSms = async (
    id,
    msisdn,
    to,
    networkCode,
    messageId,
    price,
    status,
    scts,
    errCode,
    messageTimestamp,
  ) => {
    try {
      const { CmpRecordMessageStatusAuditSms } = container.databaseService.models;
      const rawCmpRecordMessageStatusAuditSms = await CmpRecordMessageStatusAuditSms.create({
        id: id || container.uuid(),
        msisdn,
        to,
        networkCode,
        messageId,
        price,
        status,
        scts,
        errCode,
        messageTimestamp,
        deleted: false,
      });

      const cmpRecordMessageStatusAuditSms = mapCmpRecordMessageStatusAuditSms(
        rawCmpRecordMessageStatusAuditSms,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditSms(
          id,
          msisdn,
          to,
          networkCode,
          messageId,
          price,
          status,
          scts,
          errCode,
          messageTimestamp,
        );
      }
      return Promise.reject(error);
    }
  };

  const readRecordMessageStatusAuditSms = async (cmpRecordMessageStatusAuditSmsId) => {
    try {
      const cmpRecordMessageStatusAuditSms = await getById(
        cmpRecordMessageStatusAuditSmsId, false,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditSms = async (
    cmpRecordMessageStatusAuditSmsId, options = { noGet: true },
  ) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditSms = await updateById(
        cmpRecordMessageStatusAuditSmsId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditSmses = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditSmses = await updateByCriteria(
        criteria, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditSms = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAuditSms = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAuditSmses = async (
    criteria = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const cmpRecordMessageStatusAuditSmses = await getByCriteria(
        criteria, excludeDeleted, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessageStatusAuditSmses,

    createRecordMessageStatusAuditSms,
    createRecordMessageStatusAuditSmsBatch,

    readRecordMessageStatusAuditSms,

    deleteRecordMessageStatusAuditSms,
    deleteRecordMessageStatusAuditSmses,

    findRecordMessageStatusAuditSms,
    findRecordMessageStatusAuditSmses,
  };
};
