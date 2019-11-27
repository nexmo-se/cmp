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
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecordMessage = mapCmpRecordMessage(rawCmpRecordMessage);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpRecordMessage,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpRecordMessages = await CmpRecordMessage.findAll(query);
      const cmpRecordMessages = rawCmpRecordMessages
        .map(cmpRecordMessage => mapCmpRecordMessage(cmpRecordMessage));
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessages = await getByCriteria(criteria, excludeDeleted);
      if (cmpRecordMessages == null || cmpRecordMessages.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
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
      L.debug('CmpRecordMessage Update Result', result);

      const cmpRecordMessage = await getById(cmpRecordMessageId, excludeDeleted);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpRecordMessage } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecordMessage.update(changes, query);
      L.debug('CmpRecordMessage Update Result', result);

      const cmpRecordMessages = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
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

  const listRecordMessages = async () => {
    try {
      const cmpRecordMessages = await getByCriteria({}, true);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessage = async (
    cmpRecordId,
    messageId,
  ) => {
    try {
      const { CmpRecordMessage } = container.databaseService.models;
      const rawCmpRecordMessage = await CmpRecordMessage.create({
        id: container.uuid(),
        cmpRecordId,
        messageId,
        status: 'requested',
        statusTime: new Date(),
        deleted: false,
      });

      const cmpRecordMessage = mapCmpRecordMessage(rawCmpRecordMessage);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
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

  const updateRecordMessage = async (cmpRecordMessageId, changes) => {
    try {
      const cmpRecordMessage = await updateById(cmpRecordMessageId, changes, true);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessages = async (criteria, changes) => {
    try {
      const cmpRecordMessages = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessage = async (cmpRecordMessageId) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessage = await updateById(cmpRecordMessageId, changes, true);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessages = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpRecordMessages = await updateByCriteria(criteria, changes, true);
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

  const findRecordMessages = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecordMessages = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecordMessages,

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
