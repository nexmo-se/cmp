/**
 * Persistence Service for CMP Channels
 * Create, Read, Update, Delete and List Channels
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Persistence Accessor');

  const filterChannels = (userId, cmpChannels) => cmpChannels
    .filter((cmpChannel) => {
      if (userId == null) {
        return true;
      }

      let found = false;

      // Check Application Users
      L.trace('Check Channel Users');
      if (cmpChannel.users) {
        for (let i = 0; i < cmpChannel.users.length; i += 1) {
          const user = cmpChannel.users[i];
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      // Check Application Users
      L.trace('Check Application Users');
      if (cmpChannel.cmpApplication && cmpChannel.cmpApplication.users) {
        for (let i = 0; i < cmpChannel.cmpApplication.users.length; i += 1) {
          const user = cmpChannel.cmpApplication.users[i];
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      // Check Api Key Users
      L.trace('Check Api Key Users');
      if (cmpChannel.cmpApiKey && cmpChannel.cmpApiKey.users) {
        for (let i = 0; i < cmpChannel.cmpApiKey.users.length; i += 1) {
          const user = cmpChannel.cmpApiKey.users[i];
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      return found;
    });

  const listChannels = async (userId, excludeSecret = true, options = {}) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.listChannels(userId, excludeSecret, options);
      const filteredChannels = filterChannels(userId, cmpChannels);
      return Promise.resolve(filteredChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findChannel = async (userId, criteria = {}, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.findChannel(
        criteria, userId, excludeSecret, true,
      );
      const filteredChannels = filterChannels(userId, [cmpChannels]);
      if (filteredChannels.length > 0) {
        return Promise.resolve(filteredChannels[0]);
      }
      return Promise.resolve(null);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findChannels = async (userId, criteria = {}, excludeSecret = true, options = {}) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.findChannels(
        criteria, userId, excludeSecret, true, options,
      );
      const filteredChannels = filterChannels(userId, cmpChannels);
      return Promise.resolve(filteredChannels);
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
    smsUseSignature,
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
        smsUseSignature,
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

  const updateChannel = async (
    cmpChannelId, userId, changes, excludeSecret = true, options = {},
  ) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.updateChannel(
        cmpChannelId, userId, changes, excludeSecret, options,
      );
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannels = async (
    criteria, userId, changes, excludeSecret = true, options = {},
  ) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.updateChannels(
        criteria, userId, changes, excludeSecret, options,
      );
      const filteredChannels = filterChannels(userId, cmpChannels);
      return Promise.resolve(filteredChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannel = async (
    cmpChannelId, userId, excludeSecret = true, options = { noGet: true },
  ) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannel = await CmpChannel.deleteChannel(
        cmpChannelId, userId, excludeSecret, options,
      );
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannels = async (
    criteria, userId, excludeSecret = true, options = { noGet: true },
  ) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.deleteChannels(
        criteria, userId, excludeSecret, options,
      );
      const filteredChannels = filterChannels(userId, cmpChannels);
      return Promise.resolve(filteredChannels);
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

    findChannel,
    findChannels,
  };
};
