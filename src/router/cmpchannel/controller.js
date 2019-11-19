export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Controller');

  const listAllChannels = async (req, res, next) => {
    try {
      const { CmpChannel } = container.persistenceService;
      const cmpChannels = await CmpChannel.listChannels();
      res.status(200).json(cmpChannels);
    } catch (error) {
      next(error);
    }
  };

  const listMyChannels = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Channels');
      const { CmpChannel } = container.persistenceService;
      const cmpChannels = await CmpChannel.listChannels();
      res.status(200).json(cmpChannels);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllChannels = async (req, res, next) => {
    try {
      const { CmpChannel } = container.persistenceService;
      const cmpChannels = await CmpChannel.deleteChannels({});
      res.status(200).json(cmpChannels);
    } catch (error) {
      next(error);
    }
  };

  const createChannel = async (req, res, next) => {
    try {
      const {
        name,
        channel,
        senderId,
        cmpApplicationId,
        cmpApiKeyId,
      } = req.body;
      const { CmpChannel } = container.persistenceService;

      const cmpApiKey = await CmpChannel.createChannel(
        name, channel, senderId, cmpApplicationId, cmpApiKeyId,
      );
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readChannel = async (req, res, next) => {
    try {
      const { cmpChannelId } = req.params;
      const { CmpChannel } = container.persistenceService;

      const cmpChannel = await CmpChannel.readChannel(cmpChannelId);
      res.status(200).json(cmpChannel);
    } catch (error) {
      next(error);
    }
  };

  const readMyChannel = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Channels');
      const { cmpChannelId } = req.params;
      const { CmpChannel } = container.persistenceService;

      const cmpChannel = await CmpChannel.readChannel(cmpChannelId);
      res.status(200).json(cmpChannel);
    } catch (error) {
      next(error);
    }
  };

  const updateChannel = async (req, res, next) => {
    try {
      const { cmpChannelId } = req.params;
      const {
        name,
        channel,
        senderId,
        cmpApplicationId,
        cmpApiKeyId,
      } = req.body;

      const changes = {};

      if (name && name !== '') {
        changes.name = name;
      }

      if (channel && channel !== '') {
        changes.channel = channel;
      }

      if (senderId && senderId !== '') {
        changes.senderId = senderId;
      }

      if (cmpApplicationId && cmpApplicationId !== '') {
        changes.cmpApplicationId = cmpApplicationId;
      }

      if (cmpApiKeyId && cmpApiKeyId !== '') {
        changes.cmpApiKeyId = cmpApiKeyId;
      }

      const { CmpChannel } = container.persistenceService;
      const cmpChannel = await CmpChannel.updateChannel(
        cmpChannelId, changes,
      );
      res.status(200).json(cmpChannel);
    } catch (error) {
      next(error);
    }
  };

  const deleteChannel = async (req, res, next) => {
    try {
      const { cmpChannelId } = req.params;
      const { CmpChannel } = container.persistenceService;
      const cmpChannel = await CmpChannel.deleteChannel(cmpChannelId);
      res.status(200).json(cmpChannel);
    } catch (error) {
      next(error);
    }
  };

  return {
    listAllChannels,
    listMyChannels,
    deleteAllChannels,

    createChannel,
    readChannel,
    readMyChannel,
    updateChannel,
    deleteChannel,
  };
};