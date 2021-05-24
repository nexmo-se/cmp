/**
 * Accessor Service for CMP Record Message Status Audits
 * Create, Read, Update, Delete and List Record Message Status Audits
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Model Accessor');

  const getById = async (cmpRecordMessageStatusAuditId, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAudit,
        CmpRecordMessageStatusAuditMapi,
        CmpRecordMessageStatusAuditSms,
        CmpRecordMessageStatusAuditVapi,
        CmpRecordMessageStatusAuditNi,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditId,
        },
        include: [
          {
            model: CmpRecordMessageStatusAuditMapi,
            as: 'cmpRecordMessageStatusAuditMapi',
            foreignKey: 'cmpRecordMessageStatusAuditMapiId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessageStatusAuditSms,
            as: 'cmpRecordMessageStatusAuditSms',
            foreignKey: 'cmpRecordMessageStatusAuditSmsId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessageStatusAuditVapi,
            as: 'cmpRecordMessageStatusAuditVapi',
            foreignKey: 'cmpRecordMessageStatusAuditVapiId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessageStatusAuditNi,
            as: 'cmpRecordMessageStatusAuditNi',
            foreignKey: 'cmpRecordMessageStatusAuditNiId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit.findOne(query);
      if (rawCmpRecordMessageStatusAudit == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAudit = mapCmpRecordMessageStatusAudit(
        rawCmpRecordMessageStatusAudit,
      );
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpRecordMessageStatusAuditId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpRecordMessageStatusAudit,
        CmpRecordMessageStatusAuditMapi,
        CmpRecordMessageStatusAuditSms,
        CmpRecordMessageStatusAuditVapi,
        CmpRecordMessageStatusAuditNi,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [
          {
            model: CmpRecordMessageStatusAuditMapi,
            as: 'cmpRecordMessageStatusAuditMapi',
            foreignKey: 'cmpRecordMessageStatusAuditMapiId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessageStatusAuditSms,
            as: 'cmpRecordMessageStatusAuditSms',
            foreignKey: 'cmpRecordMessageStatusAuditSmsId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessageStatusAuditVapi,
            as: 'cmpRecordMessageStatusAuditVapi',
            foreignKey: 'cmpRecordMessageStatusAuditVapiId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessageStatusAuditNi,
            as: 'cmpRecordMessageStatusAuditNi',
            foreignKey: 'cmpRecordMessageStatusAuditNiId',
            where: {
              deleted: false,
            },
            required: false,
          },
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
        query.options = options.offset;
      }

      const rawCmpRecordMessageStatusAudits = await CmpRecordMessageStatusAudit.findAll(query);
      const cmpRecordMessageStatusAudits = rawCmpRecordMessageStatusAudits
        .map(cmpRecordMessageStatusAudit => mapCmpRecordMessageStatusAudit(
          cmpRecordMessageStatusAudit,
        ));
      return Promise.resolve(cmpRecordMessageStatusAudits);
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
      const cmpRecordMessageStatusAudits = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpRecordMessageStatusAudits == null || cmpRecordMessageStatusAudits.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAudit = cmpRecordMessageStatusAudits[0];
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordMessageStatusAuditId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAudit.update(changes, query);
      L.trace('CmpRecordMessageStatusAudit Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessageStatusAudit = await getById(
        cmpRecordMessageStatusAuditId, excludeDeleted,
      );
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpRecordMessageStatusAuditId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAudit.update(changes, query);
      L.trace('CmpRecordMessageStatusAudit Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessageStatusAudits = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpRecordMessageStatusAudits);
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

  const mapCmpRecordMessageStatusAuditMapi = (cmpRecordMessageStatusAuditMapi) => {
    const mappedCmpRecordMessageStatusAuditMapi = cmpRecordMessageStatusAuditMapi.dataValues;

    delete mappedCmpRecordMessageStatusAuditMapi.deleted;
    delete mappedCmpRecordMessageStatusAuditMapi.createdAt;
    delete mappedCmpRecordMessageStatusAuditMapi.updatedAt;

    return mappedCmpRecordMessageStatusAuditMapi;
  };

  const mapCmpRecordMessageStatusAuditVapi = (cmpRecordMessageStatusAuditVapi) => {
    const mappedCmpRecordMessageStatusAuditVapi = cmpRecordMessageStatusAuditVapi.dataValues;

    delete mappedCmpRecordMessageStatusAuditVapi.deleted;
    delete mappedCmpRecordMessageStatusAuditVapi.createdAt;
    delete mappedCmpRecordMessageStatusAuditVapi.updatedAt;

    return mappedCmpRecordMessageStatusAuditVapi;
  };

  const mapCmpRecordMessageStatusAuditNi = (cmpRecordMessageStatusAuditNi) => {
    const mappedCmpRecordMessageStatusAuditNi = cmpRecordMessageStatusAuditNi.dataValues;

    delete mappedCmpRecordMessageStatusAuditNi.deleted;
    delete mappedCmpRecordMessageStatusAuditNi.createdAt;
    delete mappedCmpRecordMessageStatusAuditNi.updatedAt;

    return mappedCmpRecordMessageStatusAuditNi;
  };

  const mapCmpRecordMessageStatusAudit = (cmpRMSAudit) => {
    const mappedCmpRMSAudit = cmpRMSAudit.dataValues;

    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditSms) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditSms = mapCmpRecordMessageStatusAuditSms(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditSms,
      );
    }
    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditMapi) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditMapi = mapCmpRecordMessageStatusAuditMapi(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditMapi,
      );
    }
    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditVapi) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditVapi = mapCmpRecordMessageStatusAuditVapi(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditVapi,
      );
    }
    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditNi) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditNi = mapCmpRecordMessageStatusAuditNi(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditNi,
      );
    }
    delete mappedCmpRMSAudit.deleted;
    delete mappedCmpRMSAudit.createdAt;
    delete mappedCmpRMSAudit.updatedAt;

    return mappedCmpRMSAudit;
  };

  const listRecordMessageStatusAudits = async (options = {}) => {
    try {
      const cmpRecordMessageStatusAudits = await getByCriteria({}, true, options);
      return Promise.resolve(cmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditBatch = async (audits) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.models;
      const createableAudits = audits.map(audit => ({
        id: audit.id || container.uuid(),
        cmpRecordMessageId: audit.cmpRecordMessageId,
        messageType: audit.messageType,
        cmpRecordMessageStatusAuditSmsId: audit.cmpRecordMessageStatusAuditSmsId,
        cmpRecordMessageStatusAuditMapiId: audit.cmpRecordMessageStatusAuditMapiId,
        cmpRecordMessageStatusAuditVapiId: audit.cmpRecordMessageStatusAuditVapiId,
        cmpRecordMessageStatusAuditNiId: audit.cmpRecordMessageStatusAuditNiId,
        deleted: false,
      }));

      await CmpRecordMessageStatusAudit.bulkCreate(createableAudits);
      return Promise.resolve();
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAuditBatch(audits);
      }
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAudit = async (
    id,
    cmpRecordMessageId,
    messageType,
    cmpRecordMessageStatusAuditSmsId,
    cmpRecordMessageStatusAuditMapiId,
    cmpRecordMessageStatusAuditVapiId,
    cmpRecordMessageStatusAuditNiId,
  ) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.models;
      await CmpRecordMessageStatusAudit.create({
        id: id || container.uuid(),
        cmpRecordMessageId,
        messageType,
        cmpRecordMessageStatusAuditSmsId,
        cmpRecordMessageStatusAuditMapiId,
        cmpRecordMessageStatusAuditVapiId,
        cmpRecordMessageStatusAuditNiId,
        deleted: false,
      });

      return Promise.resolve();
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordMessageStatusAudit(
          id,
          cmpRecordMessageId,
          messageType,
          cmpRecordMessageStatusAuditSmsId,
          cmpRecordMessageStatusAuditMapiId,
          cmpRecordMessageStatusAuditVapiId,
          cmpRecordMessageStatusAuditNiId,
        );
      }
      return Promise.reject(error);
    }
  };

  const readRecordMessageStatusAudit = async (cmpRecordMessageStatusAuditId) => {
    try {
      const cmpRecordMessageStatusAudit = await getById(cmpRecordMessageStatusAuditId, false);
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAudit = async (
    cmpRecordMessageStatusAuditId, options = { noGet: true },
  ) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAudit = await updateById(
        cmpRecordMessageStatusAuditId, changes, true, options,
      );
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAudits = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAudits = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAudit = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAudit = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessageStatusAudits = async (
    criteria = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const cmpRecordMessageStatusAudits = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessageStatusAudits,

    createRecordMessageStatusAudit,
    createRecordMessageStatusAuditBatch,

    readRecordMessageStatusAudit,

    deleteRecordMessageStatusAudit,
    deleteRecordMessageStatusAudits,

    findRecordMessageStatusAudit,
    findRecordMessageStatusAudits,
  };
};
