export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Persistence Accessor');

  const filterChannels = (userId, cmpChannels) => cmpChannels
    .filter((cmpChannel) => {
      if (userId == null) {
        return true;
      }

      let found = false;
      L.debug(userId);

      // Check Application Users
      L.debug('Check Channel Users');
      if (cmpChannel.users) {
        L.debug(cmpChannel.users);
        for (let i = 0; i < cmpChannel.users.length; i += 1) {
          const user = cmpChannel.users[i];
          L.debug(user.id);
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      // Check Application Users
      L.debug('Check Application Users');
      if (cmpChannel.cmpApplication && cmpChannel.cmpApplication.users) {
        L.debug(cmpChannel.cmpApplication.users);
        for (let i = 0; i < cmpChannel.cmpApplication.users.length; i += 1) {
          const user = cmpChannel.cmpApplication.users[i];
          L.debug(user.id);
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      // Check Api Key Users
      L.debug('Check Api Key Users');
      if (cmpChannel.cmpApiKey && cmpChannel.cmpApiKey.users) {
        L.debug(cmpChannel.cmpApiKey.users);
        for (let i = 0; i < cmpChannel.cmpApiKey.users.length; i += 1) {
          const user = cmpChannel.cmpApiKey.users[i];
          L.debug(user.id);
          if (user.id === userId) {
            found = true;
            break;
          }
        }
      }

      return found;
    });

  const listChannels = async (userId, excludeSecret = true) => {
    try {
      const { CmpChannel } = container.databaseService.accessors;
      const cmpChannels = await CmpChannel.listChannels(userId, excludeSecret);
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
      const filteredChannels = filterChannels(userId, cmpChannels);
      return Promise.resolve(filteredChannels);
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
  };
};
