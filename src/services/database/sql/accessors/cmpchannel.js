export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Model Accessor');

  const getById = async (cmpChannelId, excludeDeleted = true) => {
    try {
      const { CmpApplication, CmpApiKey, CmpChannel } = container.databaseService.models;
      const query = {
        where: {
          id: cmpChannelId,
        },
        include: [
          {
            model: CmpApplication,
            as: 'cmpApplication',
            foreignKey: 'cmpApplicationId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpApiKey,
            as: 'cmpApiKey',
            foreignKey: 'cmpApiKeyId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpChannel = await CmpChannel.findOne(query);
      if (rawCmpChannel == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpChannel = mapCmpChannel(rawCmpChannel);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const { CmpApiKey, CmpApplication, CmpChannel } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpApplication,
            as: 'cmpApplication',
            foreignKey: 'cmpApplicationId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpApiKey,
            as: 'cmpApiKey',
            foreignKey: 'cmpApiKeyId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpChannels = await CmpChannel.findAll(query);
      const cmpChannels = rawCmpChannels.map(mapCmpChannel);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpChannels = await getByCriteria(criteria, excludeDeleted);
      if (cmpChannels == null || cmpChannels.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpChannel = cmpChannels[0];
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (cmpChannelId, changes = {}, excludeDeleted = true) => {
    try {
      const { CmpChannel } = container.databaseService.models;
      const query = {
        where: {
          id: cmpChannelId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpChannel.update(changes, query);
      L.debug('CmpChannel Update Result', result);

      const cmpChannel = await getById(cmpChannelId, excludeDeleted);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (criteria = {}, changes = {}, excludeDeleted = true) => {
    try {
      const { CmpChannel } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpChannel.update(changes, query);
      L.debug('CmpChannel Update Result', result);

      const cmpChannels = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpChannel = (cmpChannel) => {
    const mappedCmpChannel = cmpChannel.dataValues;

    delete mappedCmpChannel.deleted;
    delete mappedCmpChannel.createdAt;
    delete mappedCmpChannel.updatedAt;

    return mappedCmpChannel;
  };

  const listChannels = async () => {
    try {
      const cmpChannels = await getByCriteria({}, true);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createChannel = async (
    name,
    channel,
    senderId,
    cmpApplicationId,
    cmpApiKeyId,
  ) => {
    try {
      const { CmpChannel } = container.databaseService.models;
      const rawCmpChannel = await CmpChannel.create({
        id: container.uuid(),
        name,
        channel,
        senderId,
        cmpApplicationId,
        cmpApiKeyId,
        deleted: false,
      });

      const cmpChannel = mapCmpChannel(rawCmpChannel);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readChannel = async (cmpChannelId) => {
    try {
      const cmpChannel = await getById(cmpChannelId, false);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannel = async (cmpChannelId, changes) => {
    try {
      const cmpChannel = await updateById(cmpChannelId, changes, true);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannels = async (criteria, changes) => {
    try {
      const cmpChannels = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannel = async (cmpChannelId) => {
    try {
      const changes = { deleted: true };
      const cmpChannel = await updateById(cmpChannelId, changes, true);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannels = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpChannels = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findChannel = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpChannel = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findChannels = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpChannels = await getByCriteria(criteria, excludeDeleted);
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

    findChannel,
    findChannels,
  };
};
