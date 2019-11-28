export default (container) => {
  const { L } = container.defaultLogger('Cmp RMS Audit Model Accessor');

  const getById = async (cmpRecordMessageStatusAuditId, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAudit,
        CmpRecordMessageStatusAuditMapi,
        CmpRecordMessageStatusAuditSms,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageStatusAuditId,
        },
        include: [
          {
            model: CmpRecordMessageStatusAuditMapi,
            as: 'cmpRecordMessageStatusAuditMapi',
            foreignKey: 'cmpRecordMessageStatusAudit<apiId',
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
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit.findOne(query);
      if (rawCmpRecordMessageStatusAudit == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAudit = mapCmpRecordMessageStatusAudit(
        rawCmpRecordMessageStatusAudit,
      );
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAudit,
        CmpRecordMessageStatusAuditMapi,
        CmpRecordMessageStatusAuditSms,
      } = container.databaseService.models;
      const query = {
        where: criteria,
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
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAudits = await CmpRecordMessageStatusAudit.findAll(query);
      const cmpRecordMessageStatusAudits = rawCmpRecordMessageStatusAudits
        .map(cmpRecordMessageStatusAudit => mapCmpRecordMessageStatusAudit(
          cmpRecordMessageStatusAudit,
        ));
      return Promise.resolve(cmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAudits = await getByCriteria(criteria, excludeDeleted);
      if (cmpRecordMessageStatusAudits == null || cmpRecordMessageStatusAudits.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
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
      L.debug('CmpRecordMessageStatusAudit Update Result', result);

      const cmpRecordMessageStatusAudit = await getById(
        cmpRecordMessageStatusAuditId, excludeDeleted,
      );
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAudit.update(changes, query);
      L.debug('CmpRecordMessageStatusAudit Update Result', result);

      const cmpRecordMessageStatusAudits = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAudits);
    } catch (error) {
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
    delete mappedCmpRMSAudit.deleted;
    delete mappedCmpRMSAudit.createdAt;
    delete mappedCmpRMSAudit.updatedAt;

    return mappedCmpRMSAudit;
  };

  const listRecordMessageStatusAudits = async () => {
    try {
      const cmpRecordMessageStatusAudits = await getByCriteria({}, true);
      return Promise.resolve(cmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAudit = async (
    messageType,
    cmpRecordMessageStatusAuditSmsId,
    cmpRecordMessageStatusAuditMapiId,
  ) => {
    try {
      const { CmpRecordMessageStatusAudit } = container.databaseService.models;
      const createdCmpRecordMessageStatusAudit = await CmpRecordMessageStatusAudit.create({
        id: container.uuid(),
        messageType,
        cmpRecordMessageStatusAuditSmsId,
        cmpRecordMessageStatusAuditMapiId,
        deleted: false,
      });

      const { id } = createdCmpRecordMessageStatusAudit;
      const cmpRecordMessageStatusAudit = await getById(id, true);
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
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

  const deleteRecordMessageStatusAudit = async (cmpRecordMessageStatusAuditId) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAudit = await updateById(
        cmpRecordMessageStatusAuditId, changes, true,
      );
      return Promise.resolve(cmpRecordMessageStatusAudit);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAudits = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAudits = await updateByCriteria(criteria, changes, true);
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

  const findRecordMessageStatusAudits = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAudits = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAudits);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessageStatusAudits,

    createRecordMessageStatusAudit,
    readRecordMessageStatusAudit,

    deleteRecordMessageStatusAudit,
    deleteRecordMessageStatusAudits,

    findRecordMessageStatusAudit,
    findRecordMessageStatusAudits,
  };
};
