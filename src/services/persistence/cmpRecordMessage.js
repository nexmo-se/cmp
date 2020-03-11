export default (container) => {
  const { L } = container.defaultLogger('Cmp RecordMessage Persistence Accessor');

  const listRecordMessages = async () => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessages = await CmpRecordMessage.listRecordMessages();
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
  ) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.createRecordMessage(
        cmpRecordId,
        messageId,
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

  const updateRecordMessage = async (cmpRecordMessageId, changes) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.updateRecordMessage(
        cmpRecordMessageId, changes,
      );
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecordMessages = async (criteria, changes) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessages = await CmpRecordMessage.updateRecordMessages(criteria, changes);
      return Promise.resolve(cmpRecordMessages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessage = async (cmpRecordMessageId) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessage = await CmpRecordMessage.deleteRecordMessage(cmpRecordMessageId);
      return Promise.resolve(cmpRecordMessage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecordMessages = async (criteria) => {
    try {
      const { CmpRecordMessage } = container.databaseService.accessors;
      const cmpRecordMessages = await CmpRecordMessage.deleteRecordMessages(criteria);
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
  };
};
