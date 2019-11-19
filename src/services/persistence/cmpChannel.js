export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Persistence Accessor');

  const listChannels = async () => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.listChannels();
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createChannel = async (
    name,
    channel,
    senderId,
    tps,
    cmpApplicationId,
    cmpApiKeyId,
  ) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.createChannel(
        name,
        channel,
        senderId,
        tps,
        cmpApplicationId,
        cmpApiKeyId,
      );
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readChannel = async (cmpChannelId) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.readChannel(cmpChannelId);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannel = async (cmpChannelId, changes) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.updateChannel(
        cmpChannelId, changes,
      );
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannels = async (criteria, changes) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.updateChannels(criteria, changes);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannel = async (cmpChannelId) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.deleteChannel(cmpChannelId);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannels = async (criteria) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.deleteChannels(criteria);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listChannels,

    createChannel,
    readChannel,

    updateChannel,
    updateChannels,

    deleteChannel,
    deleteChannels,
  };
};
