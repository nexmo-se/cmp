/**
 * Persistence Service for CMP Record Messages
 * Create, Read, Update, Delete and List Record Messages
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp RecordMessage Persistence Accessor');

  const listRecordMessages = async (options = {}) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessages = await CmpRecordMessage.listRecordMessages(options);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessageBulk = async (records) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessages = await CmpRecordMessage.createRecordMessageBulk(records);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordMessage = async (
    cmpRecordId,
    messageId,
    price,
  ) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.createRecordMessage(
        cmpRecordId,
        messageId,
        price,
      );
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readRecordMessage = async (cmpRecordMessageId) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.readRecordMessage(cmpRecordMessageId);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessage = async (cmpRecordMessageId, changes, options = {}) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.updateRecordMessage(
        cmpRecordMessageId, changes, options,
      );
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessages = async (criteria, changes, options = {}) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessages = await CmpRecordMessage.updateRecordMessages(
        criteria, changes, options,
      );
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessage = async (cmpRecordMessageId, options = { noGet: true }) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.deleteRecordMessage(
        cmpRecordMessageId, options,
      );
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessages = async (criteria, options = { noGet: true }) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessages = await CmpRecordMessage.deleteRecordMessages(
        criteria, options,
      );
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessage = async (criteria) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.findRecordMessage(criteria, true);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecordMessages = async (criteria, options = {}) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.findRecordMessages(criteria, true, options);
      return Promise.resolve(cmpRecordMessage);
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
