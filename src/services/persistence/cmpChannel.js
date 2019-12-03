export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Persistence Accessor');

  const listChannels = async (userId, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.listChannels(userId, excludeSecret);
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
    excludeSecret = true,
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
        excludeSecret,
      );
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readChannel = async (cmpChannelId, userId, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.readChannel(cmpChannelId, userId, excludeSecret);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannel = async (cmpChannelId, userId, changes, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.updateChannel(
        cmpChannelId, userId, changes, excludeSecret,
      );
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannels = async (criteria, userId, changes, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.updateChannels(criteria, userId, changes, excludeSecret);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannel = async (cmpChannelId, userId, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.deleteChannel(cmpChannelId, userId, excludeSecret);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannels = async (criteria, userId, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.deleteChannels(criteria, userId, excludeSecret);
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
