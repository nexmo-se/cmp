export default (container) => {
  const { L } = container.defaultLogger('Cmp Channel Model Accessor');

  const getById = async (cmpChannelId, excludeSecret = true, excludeDeleted = true) => {
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

      const cmpChannel = mapCmpChannel(rawCmpChannel, excludeSecret);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
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
      const cmpChannels = rawCmpChannels
        .map(cmpChannel => mapCmpChannel(cmpChannel, excludeSecret));
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpChannels = await getByCriteria(criteria, excludeSecret, excludeDeleted);
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

  const updateById = async (
    cmpChannelId, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
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

      const cmpChannel = await getById(cmpChannelId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpChannel } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpChannel.update(changes, query);
      L.debug('CmpChannel Update Result', result);

      const cmpChannels = await getByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpApplication = (cmpApplication, excludeSecret = true) => {
    const mappedCmpApplication = cmpApplication.dataValues;

    if (excludeSecret) {
      delete mappedCmpApplication.privateKey;
    }

    delete mappedCmpApplication.deleted;
    delete mappedCmpApplication.createdAt;
    delete mappedCmpApplication.updatedAt;

    return mappedCmpApplication;
  };

  const mapCmpApiKey = (cmpApiKey, excludeSecret = true) => {
    const mappedCmpApiKey = cmpApiKey.dataValues;

    if (excludeSecret) {
      delete mappedCmpApiKey.apiSecret;
    }

    delete mappedCmpApiKey.deleted;
    delete mappedCmpApiKey.createdAt;
    delete mappedCmpApiKey.updatedAt;

    return mappedCmpApiKey;
  };

  const mapCmpChannel = (cmpChannel, excludeSecret = true) => {
    const mappedCmpChannel = cmpChannel.dataValues;

    if (mappedCmpChannel.cmpApiKey) {
      mappedCmpChannel.cmpApiKey = mapCmpApiKey(
        mappedCmpChannel.cmpApiKey, excludeSecret,
      );
    }

    if (mappedCmpChannel.cmpApplication) {
      mappedCmpChannel.cmpApplication = mapCmpApplication(
        mappedCmpChannel.cmpApplication, excludeSecret,
      );
    }

    delete mappedCmpChannel.deleted;
    delete mappedCmpChannel.createdAt;
    delete mappedCmpChannel.updatedAt;

    return mappedCmpChannel;
  };

  const listChannels = async (excludeSecret = true) => {
    try {
      const cmpChannels = await getByCriteria({}, excludeSecret, true);
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
    excludeSecret = true,
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

      const cmpChannel = mapCmpChannel(rawCmpChannel, excludeSecret);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readChannel = async (cmpChannelId, excludeSecret = true) => {
    try {
      const cmpChannel = await getById(cmpChannelId, excludeSecret, false);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannel = async (cmpChannelId, changes, excludeSecret = true) => {
    try {
      const cmpChannel = await updateById(cmpChannelId, changes, excludeSecret, true);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateChannels = async (criteria, changes, excludeSecret = true) => {
    try {
      const cmpChannels = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannel = async (cmpChannelId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpChannel = await updateById(cmpChannelId, changes, excludeSecret, true);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteChannels = async (criteria = {}, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpChannels = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpChannels);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findChannel = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpChannel = await getOneByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpChannel);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findChannels = async (criteria = {}, excludeSecret, excludeDeleted = true) => {
    try {
      const cmpChannels = await getByCriteria(criteria, excludeSecret, excludeDeleted);
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
