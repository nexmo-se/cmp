export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Model Accessor');

  const getById = async (
    cmpRecordId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const {
        CmpRecord, CmpCampaign, CmpTemplate, CmpMedia, CmpRecordMessage,
        CmpParameter, CmpChannel, CmpApplication, CmpApiKey,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordId,
        },
        include: [
          {
            model: CmpCampaign,
            as: 'cmpCampaign',
            foreignKey: 'cmpCampaignId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpTemplate,
            as: 'cmpTemplate',
            foreignKey: 'cmpTemplateId',
            where: {
              deleted: false,
            },
            required: false,
            include: [
              {
                model: CmpChannel,
                as: 'cmpChannel',
                foreignKey: 'cmpChannelId',
                where: {
                  deleted: false,
                },
                required: false,
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
              },
            ],
          },
          {
            model: CmpMedia,
            as: 'cmpMedia',
            foreignKey: 'cmpMediaId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpParameter,
            as: 'cmpParameters',
            foreignKey: 'cmpParameterId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessage,
            as: 'cmpRecordMessages',
            foreignKey: 'cmpRecordId',
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

      const rawCmpRecord = await CmpRecord.findOne(query);
      if (rawCmpRecord == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecord = mapCmpRecord(rawCmpRecord, excludeSecret);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (
    criteria = {},
    limit,
    offset,
    excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const {
        CmpRecord, CmpCampaign, CmpTemplate, CmpMedia, CmpRecordMessage,
        CmpParameter, CmpChannel, CmpApplication, CmpApiKey,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        limit,
        offset,
        include: [
          {
            model: CmpCampaign,
            as: 'cmpCampaign',
            foreignKey: 'cmpCampaignId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpTemplate,
            as: 'cmpTemplate',
            foreignKey: 'cmpTemplateId',
            where: {
              deleted: false,
            },
            required: false,
            include: [
              {
                model: CmpChannel,
                as: 'cmpChannel',
                foreignKey: 'cmpChannelId',
                where: {
                  deleted: false,
                },
                required: false,
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
              },
            ],
          },
          {
            model: CmpMedia,
            as: 'cmpMedia',
            foreignKey: 'cmpMediaId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpParameter,
            as: 'cmpParameters',
            foreignKey: 'cmpParameterId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessage,
            as: 'cmpRecordMessages',
            foreignKey: 'cmpRecordId',
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

      const rawCmpRecords = await CmpRecord.findAll(query);
      const cmpRecords = rawCmpRecords
        .map(cmpRecord => mapCmpRecord(cmpRecord, excludeSecret));
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (
    criteria = {}, offset,
    excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const cmpRecords = await getByCriteria(criteria, null, offset, excludeSecret, excludeDeleted);
      if (cmpRecords == null || cmpRecords.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecord = cmpRecords[0];
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordId, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecord.update(changes, query);
      L.debug('CmpRecord Update Result', result);

      const cmpRecord = await getById(cmpRecordId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecord.update(changes, query);
      L.debug('CmpRecord Update Result', result);

      const cmpRecords = await getByCriteria(criteria, null, null, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpRecords);
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

  const mapCmpTemplate = (cmpTemplate, excludeSecret = true) => {
    const mappedCmpTemplate = cmpTemplate.dataValues;

    if (mappedCmpTemplate.cmpChannel) {
      mappedCmpTemplate.cmpChannel = mapCmpChannel(
        mappedCmpTemplate.cmpChannel, excludeSecret,
      );
    }

    delete mappedCmpTemplate.deleted;
    delete mappedCmpTemplate.createdAt;
    delete mappedCmpTemplate.updatedAt;

    return mappedCmpTemplate;
  };

  const mapCmpCampaign = (cmpCampaign) => {
    const mappedCmpCampaign = cmpCampaign.dataValues;

    delete mappedCmpCampaign.deleted;
    delete mappedCmpCampaign.createdAt;
    delete mappedCmpCampaign.updatedAt;

    return mappedCmpCampaign;
  };

  const mapCmpMedia = (cmpMedia) => {
    const mappedCmpMedia = cmpMedia.dataValues;

    delete mappedCmpMedia.deleted;
    delete mappedCmpMedia.createdAt;
    delete mappedCmpMedia.updatedAt;

    return mappedCmpMedia;
  };

  const mapCmpParameter = (cmpParameter) => {
    const mappedCmpParameter = cmpParameter.dataValues;

    delete mappedCmpParameter.deleted;
    delete mappedCmpParameter.createdAt;
    delete mappedCmpParameter.updatedAt;

    return mappedCmpParameter;
  };

  const mapCmpRecord = (cmpRecord, excludeSecret = true) => {
    const mappedCmpRecord = cmpRecord.dataValues;

    if (mappedCmpRecord.cmpCampaign) {
      mappedCmpRecord.cmpCampaign = mapCmpCampaign(mappedCmpRecord.cmpCampaign);
    }
    if (mappedCmpRecord.cmpMedia) {
      mappedCmpRecord.cmpMedia = mapCmpMedia(mappedCmpRecord.cmpMedia);
    }
    if (mappedCmpRecord.cmpTemplate) {
      mappedCmpRecord.cmpTemplate = mapCmpTemplate(mappedCmpRecord.cmpTemplate, excludeSecret);
    }
    if (mappedCmpRecord.cmpParameters) {
      mappedCmpRecord.cmpParameters = mappedCmpRecord.cmpParameters.map(mapCmpParameter);
    }

    delete mappedCmpRecord.deleted;
    delete mappedCmpRecord.createdAt;
    delete mappedCmpRecord.updatedAt;

    return mappedCmpRecord;
  };

  const listRecords = async (limit, offset, excludeSecret = true) => {
    try {
      const cmpRecords = await getByCriteria({}, limit, offset, excludeSecret, true);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecord = async (
    recipient,
    cmpCampaignId,
    cmpTemplateId,
    cmpMediaId,
    activeStartHour,
    activeStartMinute,
    activeEndHour,
    activeEndMinute,
    activeOnWeekends,
    timezone,
    excludeSecret = true,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const rawCmpRecord = await CmpRecord.create({
        id: container.uuid(),
        recipient,
        cmpCampaignId,
        cmpTemplateId,
        cmpMediaId,
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
        status: 'draft',
        statusTime: new Date(),
        deleted: false,
      });

      const cmpRecord = mapCmpRecord(rawCmpRecord, excludeSecret);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readRecord = async (cmpRecordId, excludeSecret = true) => {
    try {
      const cmpRecord = await getById(cmpRecordId, excludeSecret, false);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecord = async (cmpRecordId, changes, excludeSecret = true) => {
    try {
      const cmpRecord = await updateById(cmpRecordId, changes, excludeSecret, true);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecords = async (criteria, changes, excludeSecret = true) => {
    try {
      const cmpRecords = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecord = async (cmpRecordId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpRecord = await updateById(cmpRecordId, changes, excludeSecret, true);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecords = async (criteria = {}, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpRecords = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecord = async (criteria = {}, offset, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpRecord = await getOneByCriteria(criteria, offset, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecords = async (
    criteria = {},
    limit, offset,
    excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const cmpRecords = await getByCriteria(
        criteria, limit, offset, excludeSecret, excludeDeleted,
      );
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getActiveRecords = async (
    limit, currentTime,
    excludeSecret = true,
  ) => {
    try {
      const {
        CmpRecord, CmpCampaign, CmpTemplate, CmpMedia, CmpRecordMessage,
        CmpParameter, CmpChannel, CmpApplication, CmpApiKey,
      } = container.databaseService.models;

      const { Op } = container.Sequelize;
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const currentDay = currentTime.getDay();

      const query = {
        where: {
          [Op.or]: [
            {
              activeStartHour: {
                [Op.lt]: currentHour,
              },
              activeEndHour: {
                [Op.gt]: currentHour,
              },
            },
            {
              activeStartHour: currentHour,
              activeStartMinute: {
                [Op.lte]: currentMinute,
              },
            },
            {
              activeEndHour: currentHour,
              activeEndMinute: {
                [Op.gt]: currentMinute,
              },
            },
          ],
          status: 'pending',
          deleted: false,
        },
        limit,
        include: [
          {
            model: CmpCampaign,
            as: 'cmpCampaign',
            foreignKey: 'cmpCampaignId',
            where: {
              campaignStartDate: {
                [Op.lte]: currentTime,
              },
              campaignEndDate: {
                [Op.gt]: currentTime,
              },
              status: 'pending',
              deleted: false,
            },
            required: true,
          },
          {
            model: CmpTemplate,
            as: 'cmpTemplate',
            foreignKey: 'cmpTemplateId',
            where: {
              deleted: false,
            },
            required: false,
            include: [
              {
                model: CmpChannel,
                as: 'cmpChannel',
                foreignKey: 'cmpChannelId',
                where: {
                  deleted: false,
                },
                required: false,
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
              },
            ],
          },
          {
            model: CmpMedia,
            as: 'cmpMedia',
            foreignKey: 'cmpMediaId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpParameter,
            as: 'cmpParameters',
            foreignKey: 'cmpParameterId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpRecordMessage,
            as: 'cmpRecordMessages',
            foreignKey: 'cmpRecordId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };

      if (currentDay === 0 || currentDay === 6) {
        // Check Weekend
        query.where.activeOnWeekends = true;
      }

      const rawCmpRecords = await CmpRecord.findAll(query);
      const cmpRecords = rawCmpRecords
        .map(cmpRecord => mapCmpRecord(cmpRecord, excludeSecret));
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const countPendingRecordsByCampaignId = async (campaignId) => {
    try {
      const { CmpRecord } = container.databaseService.models;

      const query = {
        where: {
          cmpCampaignId: campaignId,
          status: 'pending',
          deleted: false,
        },
      };

      const count = await CmpRecord.count(query);
      return Promise.resolve(count);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecords,
    getActiveRecords,
    countPendingRecordsByCampaignId,

    createRecord,
    readRecord,

    updateRecord,
    updateRecords,

    deleteRecord,
    deleteRecords,

    findRecord,
    findRecords,
  };
};
