/**
 * Accessor Service for CMP Record Messages
 * Create, Read, Update, Delete and List Record Messages
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RecordMessage Model Accessor');

  const getById = async (cmpRecordMessageId, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessage,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessage = await CmpRecordMessage.findOne(query);
      if (rawCmpRecordMessage == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessage = mapCmpRecordMessage(rawCmpRecordMessage);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError' || error.name === 'SequelizeDatabaseError') {
        return getById(cmpRecordMessageId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (
    criteria = {}, excludeDeleted = true,
    options = { limit: 30, offset: 0 },
  ) => {
    try {
      const {
        CmpRecordMessage,
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

      // Check Limit
      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      // Check Offset
      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpRecordMessages = await CmpRecordMessage.findAll(query);
      const cmpRecordMessages = rawCmpRecordMessages
        .map(cmpRecordMessage => mapCmpRecordMessage(cmpRecordMessage));
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError' || error.name === 'SequelizeDatabaseError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpRecordMessages = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpRecordMessages == null || cmpRecordMessages.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessage = cmpRecordMessages[0];
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordMessageId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessage } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordMessageId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessage.update(changes, query);
      L.trace('CmpRecordMessage Update Result', result);

      if (options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessage = await getById(cmpRecordMessageId, excludeDeleted);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError' || error.name === 'SequelizeDatabaseError') {
        return updateById(cmpRecordMessageId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpRecordMessage } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessage.update(changes, query);
      L.trace('CmpRecordMessage Update Result', result);

      if (options.noGet) {
        return Promise.resolve();
      }

      const cmpRecordMessages = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError' || error.name === 'SequelizeDatabaseError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpRecordMessage = (cmpRecordMessage) => {
    const mappedCmpRecordMessage = cmpRecordMessage.dataValues;

    delete mappedCmpRecordMessage.deleted;
    delete mappedCmpRecordMessage.createdAt;
    delete mappedCmpRecordMessage.updatedAt;

    return mappedCmpRecordMessage;
  };

  const listRecordMessages = async (options = {}) => {
    try {
      const cmpRecordMessages = await getByCriteria({}, true, options);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageBulk = async (records) => {
    try {
      const { CmpRecordMessage } = container.databaseService.models;
      const creatableRecordMessages = [];
      for (let i = 0; i < records.length; i += 1) {
        const record = records[i];
        const { cmpRecordId, messageIds = [], prices = [] } = record;
        for (let j = 0; j < messageIds.length; j += 1) {
          const messageId = messageIds[j];
          const price = prices.length > j ? prices[j] : 0;
          if (messageId != null) {
            creatableRecordMessages.push({
              id: container.uuid(),
              cmpRecordId,
              messageId,
              status: 'requested',
              statusTime: new Date(),
              price,
              deleted: false,
            });
          }
        }
      }

      const rawCreatedRecordMessages = await CmpRecordMessage.bulkCreate(creatableRecordMessages);
      const cmpRecordMessages = rawCreatedRecordMessages.map(mapCmpRecordMessage);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError' || error.name === 'SequelizeDatabaseError') {
        return createRecordMessageBulk(records);
      }
      return Promise.reject(error);
    }
  };

  const createRecordMessage = async (
    cmpRecordId,
    messageId,
    price = 0,
  ) => {
    try {
      const { CmpRecordMessage } = container.databaseService.models;
      const rawCmpRecordMessage = await CmpRecordMessage.create({
        id: container.uuid(),
        cmpRecordId,
        messageId,
        status: 'requested',
        statusTime: new Date(),
        price,
        deleted: false,
      });

      const cmpRecordMessage = mapCmpRecordMessage(rawCmpRecordMessage);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError' || error.name === 'SequelizeDatabaseError') {
        return createRecordMessage(cmpRecordId, messageId);
      }
      return Promise.reject(error);
    }
  };

  const readRecordMessage = async (cmpRecordMessageId) => {
    try {
      const cmpRecordMessage = await getById(cmpRecordMessageId, false);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessage = async (cmpRecordMessageId, changes, options = {}) => {
    try {
      const cmpRecordMessage = await updateById(cmpRecordMessageId, changes, true, options);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessages = async (criteria, changes, options = {}) => {
    try {
      const cmpRecordMessages = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessage = async (cmpRecordMessageId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessage = await updateById(cmpRecordMessageId, changes, true, options);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessages = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessages = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessage = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessage = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessages = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpRecordMessages = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessages,

    createRecordMessageBulk,
    createRecordMessage,
    readRecordMessage,

    updateRecordMessage,
    updateRecordMessages,

    deleteRecordMessage,
    deleteRecordMessages,

    findRecordMessage,
    findRecordMessages,
  };
};
