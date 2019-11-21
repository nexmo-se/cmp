export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Persistence Accessor');

  const listChannels = async (excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.listChannels(excludeSecret);
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

  const readChannel = async (cmpChannelId, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.readChannel(cmpChannelId, excludeSecret);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannel = async (cmpChannelId, changes, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.updateChannel(
        cmpChannelId, changes, excludeSecret,
      );
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannels = async (criteria, changes, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.updateChannels(criteria, changes, excludeSecret);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannel = async (cmpChannelId, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.deleteChannel(cmpChannelId, excludeSecret);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannels = async (criteria, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.deleteChannels(criteria, excludeSecret);
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
