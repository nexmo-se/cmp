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
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessageStatusAuditSms = mapCmpRecordMessageStatusAuditSms(
        rawCmpRecordMessageStatusAuditSms,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessageStatusAuditSms,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessageStatusAuditSmses = await CmpRecordMessageStatusAuditSms
        .findAll(query);
      const cmpRecordMessageStatusAuditSmses = rawCmpRecordMessageStatusAuditSmses
        .map(cmpRecordMessageStatusAuditSms => mapCmpRecordMessageStatusAuditSms(
          cmpRecordMessageStatusAuditSms,
        ));
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAuditSmses = await getByCriteria(criteria, excludeDeleted);
      if (cmpRecordMessageStatusAuditSmses == null
        || cmpRecordMessageStatusAuditSmses.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
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
      L.debug('CmpRecordMessageStatusAuditSms Update Result', result);

      const cmpMedia = await getById(cmpRecordMessageStatusAuditSmsId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpRecordMessageStatusAuditSms } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessageStatusAuditSms.update(changes, query);
      L.debug('CmpRecordMessageStatusAuditSms Update Result', result);

      const cmpRecordMessageStatusAuditSmses = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
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

  const listRecordMessageStatusAuditSmses = async () => {
    try {
      const cmpRecordMessageStatusAuditSmses = await getByCriteria({}, true);
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageStatusAuditSms = async (
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
        id: container.uuid(),
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

  const deleteRecordMessageStatusAuditSms = async (cmpRecordMessageStatusAuditSmsId) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditSms = await updateById(
        cmpRecordMessageStatusAuditSmsId, changes, true,
      );
      return Promise.resolve(cmpRecordMessageStatusAuditSms);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessageStatusAuditSmses = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessageStatusAuditSmses = await updateByCriteria(criteria, changes, true);
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

  const findRecordMessageStatusAuditSmses = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessageStatusAuditSmses = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessageStatusAuditSmses);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessageStatusAuditSmses,

    createRecordMessageStatusAuditSms,
    readRecordMessageStatusAuditSms,

    deleteRecordMessageStatusAuditSms,
    deleteRecordMessageStatusAuditSmses,

    findRecordMessageStatusAuditSms,
    findRecordMessageStatusAuditSmses,
  };
};
