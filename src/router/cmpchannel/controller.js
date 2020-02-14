export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Controller');

  const findAllChannels = async (req, res, next) => {
    try {
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        name, channel, senderId, tps,
        cmpApiKeyId, cmpApplicationId, smsUseSignature,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (channel) {
        criteria.channel = channel;
      }
      if (senderId) {
        if (typeof senderId === 'string') {
          criteria.senderId = {
            [Op.like]: `%${senderId}%`,
          };
        } else {
          criteria.senderId = senderId;
        }
      }
      if (tps) {
        criteria.tps = tps;
      }
      if (cmpApiKeyId) {
        criteria.cmpApiKeyId = cmpApiKeyId;
      }
      if (cmpApplicationId) {
        criteria.cmpApplicationId = cmpApplicationId;
      }
      if (smsUseSignature != null) {
        criteria.smsUseSignature = smsUseSignature;
      }
      const options = { limit, offset };
      const { CmpChannel } = container.persistenceService;
      const cmpChannels = await CmpChannel.findChannels(null, criteria, true, options);
      res.status(200).json(cmpChannels);
    } catch (error) {
      next(error);
    }
  };

  const findMyChannels = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Channels');
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        name, channel, senderId, tps,
        cmpApiKeyId, cmpApplicationId, smsUseSignature,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (channel) {
        criteria.channel = channel;
      }
      if (senderId) {
        if (typeof senderId === 'string') {
          criteria.senderId = {
            [Op.like]: `%${senderId}%`,
          };
        } else {
          criteria.senderId = senderId;
        }
      }
      if (tps) {
        criteria.tps = tps;
      }
      if (cmpApiKeyId) {
        criteria.cmpApiKeyId = cmpApiKeyId;
      }
      if (cmpApplicationId) {
        criteria.cmpApplicationId = cmpApplicationId;
      }
      if (smsUseSignature != null) {
        criteria.smsUseSignature = smsUseSignature;
      }
      const options = { limit, offset };
      const { user } = req;
      const userId = user.id;
      const { CmpChannel } = container.persistenceService;
      const cmpChannels = await CmpChannel.findChannels(userId, criteria, true, options);
      res.status(200).json(cmpChannels);
    } catch (error) {
      next(error);
    }
  };

  const listAllChannels = async (req, res, next) => {
    try {
      const {
        limit, offset,
        name, channel, senderId, tps,
        cmpApiKeyId, cmpApplicationId, smsUseSignature,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (channel) {
        criteria.channel = channel;
      }
      if (senderId) {
        criteria.senderId = senderId;
      }
      if (tps) {
        criteria.tps = tps;
      }
      if (cmpApiKeyId) {
        criteria.cmpApiKeyId = cmpApiKeyId;
      }
      if (cmpApplicationId) {
        criteria.cmpApplicationId = cmpApplicationId;
      }
      if (smsUseSignature != null) {
        criteria.smsUseSignature = smsUseSignature;
      }
      const options = { limit, offset };
      const { CmpChannel } = container.persistenceService;
      const cmpChannels = await CmpChannel.findChannels(null, criteria, true, options);
      res.status(200).json(cmpChannels);
    } catch (error) {
      next(error);
    }
  };

  const listMyChannels = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Channels');
      const {
        limit, offset,
        name, channel, senderId, tps,
        cmpApiKeyId, cmpApplicationId, smsUseSignature,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (channel) {
        criteria.channel = channel;
      }
      if (senderId) {
        criteria.senderId = senderId;
      }
      if (tps) {
        criteria.tps = tps;
      }
      if (cmpApiKeyId) {
        criteria.cmpApiKeyId = cmpApiKeyId;
      }
      if (cmpApplicationId) {
        criteria.cmpApplicationId = cmpApplicationId;
      }
      if (smsUseSignature != null) {
        criteria.smsUseSignature = smsUseSignature;
      }
      const options = { limit, offset };
      const { user } = req;
      const userId = user.id;
      const { CmpChannel } = container.persistenceService;
      const cmpChannels = await CmpChannel.findChannels(userId, criteria, true, options);
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
        tps,
        smsUseSignature,
        cmpApplicationId,
        cmpApiKeyId,
      } = req.body;
      const { CmpChannel } = container.persistenceService;

      const cmpApiKey = await CmpChannel.createChannel(
        name, channel, senderId, tps, cmpApplicationId, cmpApiKeyId, smsUseSignature,
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
      const { user } = req;
      const userId = user.id;
      const { cmpChannelId } = req.params;
      const { CmpChannel } = container.persistenceService;

      const cmpChannel = await CmpChannel.readChannel(cmpChannelId, userId);
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
        tps,
        cmpApplicationId,
        cmpApiKeyId,
        smsUseSignature,
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

      if (tps && tps > 0) {
        changes.tps = tps;
      }

      if (cmpApplicationId && cmpApplicationId !== '') {
        changes.cmpApplicationId = cmpApplicationId;
      }

      if (cmpApiKeyId && cmpApiKeyId !== '') {
        changes.cmpApiKeyId = cmpApiKeyId;
      }

      if (smsUseSignature != null) {
        changes.smsUseSignature = smsUseSignature;
      }

      const { CmpChannel } = container.persistenceService;
      const cmpChannel = await CmpChannel.updateChannel(
        cmpChannelId, null, changes,
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
    findAllChannels,
    findMyChannels,

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
