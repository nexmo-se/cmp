/**
 * Accessor Service for CMP Records
 * Create, Read, Update, Delete and List Records
 * Get Active Records (waiting to be sent)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Model Accessor');

  const getById = async (
    cmpRecordId, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const {
        CmpRecord, CmpCampaign, CmpTemplate, CmpMedia, CmpVoice, CmpRecordMessage,
        CmpParameter, CmpChannel, CmpApplication, CmpApiKey,
        CmpMediaText, CmpMediaImage, CmpMediaAudio, CmpMediaVideo,
        CmpMediaFile, CmpMediaLocation, CmpMediaViberTemplate,
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditSms,
        CmpRecordMessageStatusAuditMapi, CmpRecordMessageStatusAuditVapi, CmpRecordMessageStatusAuditNi,
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
            include: [
              {
                model: CmpMediaText,
                as: 'cmpMediaText',
                foreignKey: 'cmpMediaTextId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaImage,
                as: 'cmpMediaImage',
                foreignKey: 'cmpMediaImageId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaAudio,
                as: 'cmpMediaAudio',
                foreignKey: 'cmpMediaAudioId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaVideo,
                as: 'cmpMediaVideo',
                foreignKey: 'cmpMediaVideoId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaFile,
                as: 'cmpMediaFile',
                foreignKey: 'cmpMediaFileId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaLocation,
                as: 'cmpMediaLocation',
                foreignKey: 'cmpMediaLocationId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaViberTemplate,
                as: 'cmpMediaViberTemplate',
                foreignKey: 'cmpMediaViberTemplateId',
                where: {
                  deleted: false,
                },
                required: false,
              },
            ],
            required: false,
          },
          {
            model: CmpVoice,
            as: 'cmpVoice',
            foreignKey: 'cmpVoiceId',
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
            include: [
              {
                model: CmpRecordMessageStatusAudit,
                as: 'cmpRecordMessageStatusAudits',
                foreignKey: 'cmpRecordMessageId',
                where: {
                  deleted: false,
                },
                include: [
                  {
                    model: CmpRecordMessageStatusAuditMapi,
                    as: 'cmpRecordMessageStatusAuditMapi',
                    foreignKey: 'cmpRecordMessageStatusAuditMapiId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                  {
                    model: CmpRecordMessageStatusAuditSms,
                    as: 'cmpRecordMessageStatusAuditSms',
                    foreignKey: 'cmpRecordMessageStatusAuditSmsId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                  {
                    model: CmpRecordMessageStatusAuditVapi,
                    as: 'cmpRecordMessageStatusAuditVapi',
                    foreignKey: 'cmpRecordMessageStatusAuditVapiId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                  {
                    model: CmpRecordMessageStatusAuditNi,
                    as: 'cmpRecordMessageStatusAuditNi',
                    foreignKey: 'cmpRecordMessageStatusAuditNiId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                ],
                required: false,
              },
            ],
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
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecord = mapCmpRecord(rawCmpRecord, excludeSecret);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpRecordId, excludeSecret, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (
    criteria = {},
    excludeSecret = true, excludeDeleted = true,
    options = { limit: 30, offset: 0 },
  ) => {
    try {
      const {
        CmpRecord, CmpCampaign, CmpTemplate, CmpMedia, CmpVoice, CmpRecordMessage,
        CmpParameter, CmpChannel, CmpApplication, CmpApiKey,
        CmpMediaText, CmpMediaImage, CmpMediaAudio, CmpMediaVideo,
        CmpMediaFile, CmpMediaLocation, CmpMediaViberTemplate,
        CmpRecordMessageStatusAudit, CmpRecordMessageStatusAuditSms,
        CmpRecordMessageStatusAuditMapi, CmpRecordMessageStatusAuditVapi, CmpRecordMessageStatusAuditNi,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['recipient', 'ASC'],
          ['createdAt', 'DESC'],
        ],
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
            include: [
              {
                model: CmpMediaText,
                as: 'cmpMediaText',
                foreignKey: 'cmpMediaTextId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaImage,
                as: 'cmpMediaImage',
                foreignKey: 'cmpMediaImageId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaAudio,
                as: 'cmpMediaAudio',
                foreignKey: 'cmpMediaAudioId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaVideo,
                as: 'cmpMediaVideo',
                foreignKey: 'cmpMediaVideoId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaFile,
                as: 'cmpMediaFile',
                foreignKey: 'cmpMediaFileId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaLocation,
                as: 'cmpMediaLocation',
                foreignKey: 'cmpMediaLocationId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaViberTemplate,
                as: 'cmpMediaViberTemplate',
                foreignKey: 'cmpMediaViberTemplateId',
                where: {
                  deleted: false,
                },
                required: false,
              },
            ],
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
            model: CmpVoice,
            as: 'cmpVoice',
            foreignKey: 'cmpVoiceId',
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
            include: [
              {
                model: CmpRecordMessageStatusAudit,
                as: 'cmpRecordMessageStatusAudits',
                foreignKey: 'cmpRecordMessageId',
                where: {
                  deleted: false,
                },
                include: [
                  {
                    model: CmpRecordMessageStatusAuditMapi,
                    as: 'cmpRecordMessageStatusAuditMapi',
                    foreignKey: 'cmpRecordMessageStatusAuditMapiId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                  {
                    model: CmpRecordMessageStatusAuditSms,
                    as: 'cmpRecordMessageStatusAuditSms',
                    foreignKey: 'cmpRecordMessageStatusAuditSmsId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                  {
                    model: CmpRecordMessageStatusAuditVapi,
                    as: 'cmpRecordMessageStatusAuditVapi',
                    foreignKey: 'cmpRecordMessageStatusAuditVapiId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                  {
                    model: CmpRecordMessageStatusAuditNi,
                    as: 'cmpRecordMessageStatusAuditNi',
                    foreignKey: 'cmpRecordMessageStatusAuditNiId',
                    where: {
                      deleted: false,
                    },
                    required: false,
                  },
                ],
                required: false,
              },
            ],
            required: false,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      // Check Limit
      if (options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      // Check Offset
      if (options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpRecords = await CmpRecord.findAll(query);
      const cmpRecords = rawCmpRecords
        .map(cmpRecord => mapCmpRecord(cmpRecord, excludeSecret));
      return Promise.resolve(cmpRecords);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeSecret, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (
    criteria = {},
    excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpRecords = await getByCriteria(
        criteria, excludeSecret, excludeDeleted, options,
      );
      if (cmpRecords == null || cmpRecords.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
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
    options = {},
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
      L.trace('CmpRecord Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpRecord = await getById(cmpRecordId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpRecordId, changes, excludeSecret, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {},
    excludeSecret = true, excludeDeleted = true, includeGet = false,
    options = {},
  ) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecord.update(changes, query);
      L.trace('CmpRecord Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      if (includeGet) {
        L.trace('Getting Updated CmpRecords');
        const cmpRecords = await getByCriteria(
          criteria, excludeSecret, excludeDeleted, options,
        );
        L.trace('Updated CmpRecords Retrieved');
        return Promise.resolve(cmpRecords);
      }
      return Promise.resolve([]);
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

  const mapCmpVoice = (cmpVoice, excludeSecret = true) => {
    const mappedCmpVoice = cmpVoice.dataValues;

    delete mappedCmpVoice.deleted;
    delete mappedCmpVoice.createdAt;
    delete mappedCmpVoice.updatedAt;

    return mappedCmpVoice;
  };

  const mapCmpCampaign = (cmpCampaign) => {
    const mappedCmpCampaign = cmpCampaign.dataValues;

    delete mappedCmpCampaign.deleted;
    delete mappedCmpCampaign.createdAt;
    delete mappedCmpCampaign.updatedAt;

    return mappedCmpCampaign;
  };

  const mapCmpMediaText = (cmpMediaText) => {
    const mappedCmpMediaText = cmpMediaText.dataValues;

    delete mappedCmpMediaText.deleted;
    delete mappedCmpMediaText.createdAt;
    delete mappedCmpMediaText.updatedAt;

    return mappedCmpMediaText;
  };

  const mapCmpMediaImage = (cmpMediaImage) => {
    const mappedCmpMediaImage = cmpMediaImage.dataValues;

    delete mappedCmpMediaImage.deleted;
    delete mappedCmpMediaImage.createdAt;
    delete mappedCmpMediaImage.updatedAt;

    return mappedCmpMediaImage;
  };

  const mapCmpMediaAudio = (cmpMediaAudio) => {
    const mappedCmpMediaAudio = cmpMediaAudio.dataValues;

    delete mappedCmpMediaAudio.deleted;
    delete mappedCmpMediaAudio.createdAt;
    delete mappedCmpMediaAudio.updatedAt;

    return mappedCmpMediaAudio;
  };

  const mapCmpMediaVideo = (cmpMediaVideo) => {
    const mappedCmpMediaVideo = cmpMediaVideo.dataValues;

    delete mappedCmpMediaVideo.deleted;
    delete mappedCmpMediaVideo.createdAt;
    delete mappedCmpMediaVideo.updatedAt;

    return mappedCmpMediaVideo;
  };

  const mapCmpMediaFile = (cmpMediaFile) => {
    const mappedCmpMediaFile = cmpMediaFile.dataValues;

    delete mappedCmpMediaFile.deleted;
    delete mappedCmpMediaFile.createdAt;
    delete mappedCmpMediaFile.updatedAt;

    return mappedCmpMediaFile;
  };

  const mapCmpMediaLocation = (cmpMediaLocation) => {
    const mappedCmpMediaLocation = cmpMediaLocation.dataValues;

    delete mappedCmpMediaLocation.deleted;
    delete mappedCmpMediaLocation.createdAt;
    delete mappedCmpMediaLocation.updatedAt;

    return mappedCmpMediaLocation;
  };

  const mapCmpMediaViberTemplate = (cmpMediaViberTemplate) => {
    const mappedCmpMediaViberTemplate = cmpMediaViberTemplate.dataValues;

    delete mappedCmpMediaViberTemplate.deleted;
    delete mappedCmpMediaViberTemplate.createdAt;
    delete mappedCmpMediaViberTemplate.updatedAt;

    return mappedCmpMediaViberTemplate;
  };

  const mapCmpMedia = (cmpMedia) => {
    const mappedCmpMedia = cmpMedia.dataValues;

    if (mappedCmpMedia.cmpMediaText) {
      mappedCmpMedia.cmpMediaText = mapCmpMediaText(mappedCmpMedia.cmpMediaText);
    }
    if (mappedCmpMedia.cmpMediaImage) {
      mappedCmpMedia.cmpMediaImage = mapCmpMediaImage(mappedCmpMedia.cmpMediaImage);
    }
    if (mappedCmpMedia.cmpMediaAudio) {
      mappedCmpMedia.cmpMediaAudio = mapCmpMediaAudio(mappedCmpMedia.cmpMediaAudio);
    }
    if (mappedCmpMedia.cmpMediaVideo) {
      mappedCmpMedia.cmpMediaVideo = mapCmpMediaVideo(mappedCmpMedia.cmpMediaVideo);
    }
    if (mappedCmpMedia.cmpMediaFile) {
      mappedCmpMedia.cmpMediaFile = mapCmpMediaFile(mappedCmpMedia.cmpMediaFile);
    }
    if (mappedCmpMedia.cmpMediaLocation) {
      mappedCmpMedia.cmpMediaLocation = mapCmpMediaLocation(mappedCmpMedia.cmpMediaLocation);
    }
    if (mappedCmpMedia.cmpMediaViberTemplate) {
      mappedCmpMedia.cmpMediaViberTemplate = mapCmpMediaViberTemplate(
        mappedCmpMedia.cmpMediaViberTemplate,
      );
    }
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

  const mapCmpRecordMessageStatusAuditSms = (cmpRecordMessageStatusAuditSms) => {
    const mappedCmpRecordMessageStatusAuditSms = cmpRecordMessageStatusAuditSms.dataValues;

    delete mappedCmpRecordMessageStatusAuditSms.deleted;
    delete mappedCmpRecordMessageStatusAuditSms.createdAt;
    delete mappedCmpRecordMessageStatusAuditSms.updatedAt;

    return mappedCmpRecordMessageStatusAuditSms;
  };

  const mapCmpRecordMessageStatusAuditMapi = (cmpRecordMessageStatusAuditMapi) => {
    const mappedCmpRecordMessageStatusAuditMapi = cmpRecordMessageStatusAuditMapi.dataValues;

    delete mappedCmpRecordMessageStatusAuditMapi.deleted;
    delete mappedCmpRecordMessageStatusAuditMapi.createdAt;
    delete mappedCmpRecordMessageStatusAuditMapi.updatedAt;

    return mappedCmpRecordMessageStatusAuditMapi;
  };

  const mapCmpRecordMessageStatusAuditVapi = (cmpRecordMessageStatusAuditVapi) => {
    const mappedCmpRecordMessageStatusAuditVapi = cmpRecordMessageStatusAuditVapi.dataValues;

    delete mappedCmpRecordMessageStatusAuditVapi.deleted;
    delete mappedCmpRecordMessageStatusAuditVapi.createdAt;
    delete mappedCmpRecordMessageStatusAuditVapi.updatedAt;

    return mappedCmpRecordMessageStatusAuditVapi;
  };

  const mapCmpRecordMessageStatusAuditNi = (cmpRecordMessageStatusAuditNi) => {
    const mappedCmpRecordMessageStatusAuditNi = cmpRecordMessageStatusAuditNi.dataValues;

    delete mappedCmpRecordMessageStatusAuditNi.deleted;
    delete mappedCmpRecordMessageStatusAuditNi.createdAt;
    delete mappedCmpRecordMessageStatusAuditNi.updatedAt;

    return mappedCmpRecordMessageStatusAuditNi;
  };

  const mapCmpRecordMessageStatusAudit = (cmpRMSAudit) => {
    const mappedCmpRMSAudit = cmpRMSAudit.dataValues;

    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditSms) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditSms = mapCmpRecordMessageStatusAuditSms(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditSms,
      );
    }
    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditMapi) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditMapi = mapCmpRecordMessageStatusAuditMapi(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditMapi,
      );
    }
    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditVapi) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditVapi = mapCmpRecordMessageStatusAuditVapi(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditVapi,
      );
    }
    if (mappedCmpRMSAudit.cmpRecordMessageStatusAuditNi) {
      mappedCmpRMSAudit.cmpRecordMessageStatusAuditNi = mapCmpRecordMessageStatusAuditNi(
        mappedCmpRMSAudit.cmpRecordMessageStatusAuditNi,
      );
    }
    delete mappedCmpRMSAudit.deleted;
    delete mappedCmpRMSAudit.createdAt;
    delete mappedCmpRMSAudit.updatedAt;

    return mappedCmpRMSAudit;
  };

  const mapCmpRecordMessage = (cmpRecordMessage) => {
    const mappedCmpRecordMessage = cmpRecordMessage.dataValues;

    if (mappedCmpRecordMessage.cmpRecordMessageStatusAudits) {
      mappedCmpRecordMessage.cmpRecordMessageStatusAudits = mappedCmpRecordMessage
        .cmpRecordMessageStatusAudits
        .map(mapCmpRecordMessageStatusAudit);
    }

    delete mappedCmpRecordMessage.deleted;
    delete mappedCmpRecordMessage.createdAt;
    delete mappedCmpRecordMessage.updatedAt;

    return mappedCmpRecordMessage;
  };

  const mapCmpRecord = (cmpRecord, excludeSecret = true) => {
    const mappedCmpRecord = cmpRecord.dataValues;

    if (mappedCmpRecord.cmpCampaign) {
      mappedCmpRecord.cmpCampaign = mapCmpCampaign(mappedCmpRecord.cmpCampaign);
    }
    if (mappedCmpRecord.cmpMedia) {
      mappedCmpRecord.cmpMedia = mapCmpMedia(mappedCmpRecord.cmpMedia);
    }
    if (mappedCmpRecord.cmpVoice) {
      mappedCmpRecord.cmpVoice = mapCmpVoice(mappedCmpRecord.cmpVoice);
    }
    if (mappedCmpRecord.cmpTemplate) {
      mappedCmpRecord.cmpTemplate = mapCmpTemplate(mappedCmpRecord.cmpTemplate, excludeSecret);
    }
    if (mappedCmpRecord.cmpParameters) {
      mappedCmpRecord.cmpParameters = mappedCmpRecord.cmpParameters.map(mapCmpParameter);
    }
    if (mappedCmpRecord.cmpRecordMessages) {
      mappedCmpRecord.cmpRecordMessages = mappedCmpRecord.cmpRecordMessages
        .map(mapCmpRecordMessage);
    }

    delete mappedCmpRecord.deleted;
    delete mappedCmpRecord.createdAt;
    delete mappedCmpRecord.updatedAt;

    return mappedCmpRecord;
  };

  const listRecords = async (excludeSecret = true, options = {}) => {
    try {
      const cmpRecords = await getByCriteria({}, excludeSecret, true, options);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordBatch = async (records, excludeSecret = true) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const creatableRecords = records.map((record) => {
        const {
          id,
          recipient,
          cmpCampaignId,
          cmpTemplateId,
          cmpMediaId,
          cmpVoiceId,
          activeStartHour,
          activeStartMinute,
          activeEndHour,
          activeEndMinute,
          activeOnWeekends,
          status,
          statusTime,
          timezone,
        } = record;
        const activeStart = (activeStartHour * 60) + activeStartMinute;
        const activeEnd = (activeEndHour * 60) + activeEndMinute;
        return {
          id: id || container.uuid(),
          recipient,
          cmpCampaignId,
          cmpTemplateId,
          cmpMediaId,
          cmpVoiceId,
          activeStart,
          activeStartHour,
          activeStartMinute,
          activeEnd,
          activeEndHour,
          activeEndMinute,
          activeOnWeekends,
          timezone,
          status: status || 'draft',
          statusTime: statusTime || new Date(),
          deleted: false,
        };
      });
      const createdRecords = await CmpRecord.bulkCreate(creatableRecords);
      const cmpRecords = createdRecords.map(
        rawCmpRecord => mapCmpRecord(rawCmpRecord, excludeSecret),
      );
      return Promise.resolve(cmpRecords);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecordBatch(records, excludeSecret);
      }
      return Promise.reject(error);
    }
  };

  const createRecord = async (
    recipient,
    cmpCampaignId,
    cmpTemplateId,
    cmpMediaId,
    cmpVoiceId,
    activeStartHour,
    activeStartMinute,
    activeEndHour,
    activeEndMinute,
    activeOnWeekends,
    timezone,
    excludeSecret = true,
  ) => {
    try {
      const activeStart = (activeStartHour * 60) + activeStartMinute;
      const activeEnd = (activeEndHour * 60) + activeEndMinute;

      const { CmpRecord } = container.databaseService.models;
      const rawCmpRecord = await CmpRecord.create({
        id: container.uuid(),
        recipient,
        cmpCampaignId,
        cmpTemplateId,
        cmpMediaId,
        cmpVoiceId,
        activeStart,
        activeStartHour,
        activeStartMinute,
        activeEnd,
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
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createRecord(
          recipient,
          cmpCampaignId,
          cmpTemplateId,
          cmpMediaId,
          cmpVoiceId,
          activeStartHour,
          activeStartMinute,
          activeEndHour,
          activeEndMinute,
          activeOnWeekends,
          timezone,
          excludeSecret,
        );
      }
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

  const updateRecord = async (cmpRecordId, changes, excludeSecret = true, options = {}) => {
    try {
      const cmpRecord = await updateById(cmpRecordId, changes, excludeSecret, true, options);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecords = async (
    criteria, changes, excludeSecret = true, includeGet = true, options = {},
  ) => {
    try {
      const cmpRecords = await updateByCriteria(
        criteria, changes, excludeSecret, true, includeGet, options,
      );
      L.trace('Records Updated');
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecord = async (cmpRecordId, excludeSecret = true, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecord = await updateById(cmpRecordId, changes, excludeSecret, true, options);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecords = async (criteria = {}, excludeSecret = true, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpRecords = await updateByCriteria(
        criteria, changes, excludeSecret, true, true, options,
      );
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecord = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpRecord = await getOneByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecords = async (
    criteria = {},
    excludeSecret = true, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const cmpRecords = await getByCriteria(
        criteria, excludeSecret, excludeDeleted, options,
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
        CmpRecord, CmpCampaign, CmpTemplate, CmpMedia, CmpVoice,
        CmpParameter, CmpChannel, CmpApplication, CmpApiKey,
        CmpMediaText, CmpMediaImage, CmpMediaAudio, CmpMediaVideo,
        CmpMediaFile, CmpMediaLocation, CmpMediaViberTemplate,
      } = container.databaseService.models;

      const { Op, col } = container.Sequelize;

      const utcDate = container.dateTimeService
        .getCurrentTimeInUtc(currentTime);

      const currentHour = utcDate.getUTCHours();
      const currentMinute = utcDate.getUTCMinutes();
      const currentDay = utcDate.getUTCDay();

      const minutes = (currentHour * 60) + currentMinute;

      const query = {
        where: {
          [Op.or]: [
            {
              activeStart: {
                [Op.lt]: col('activeEnd'),
                [Op.lte]: minutes,
              },
              activeEnd: {
                [Op.gt]: minutes,
              },
            },

            {
              activeStart: {
                [Op.gt]: col('activeEnd'),
                [Op.lte]: minutes,
              },
            },
            {
              activeStart: {
                [Op.gt]: col('activeEnd'),
              },
              activeEnd: {
                [Op.gt]: minutes,
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
              [Op.or]: [
                {
                  status: 'pending',
                },
                {
                  status: 'started',
                },
              ],
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
            include: [
              {
                model: CmpMediaText,
                as: 'cmpMediaText',
                foreignKey: 'cmpMediaTextId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaImage,
                as: 'cmpMediaImage',
                foreignKey: 'cmpMediaImageId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaAudio,
                as: 'cmpMediaAudio',
                foreignKey: 'cmpMediaAudioId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaVideo,
                as: 'cmpMediaVideo',
                foreignKey: 'cmpMediaVideoId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaFile,
                as: 'cmpMediaFile',
                foreignKey: 'cmpMediaFileId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaLocation,
                as: 'cmpMediaLocation',
                foreignKey: 'cmpMediaLocationId',
                where: {
                  deleted: false,
                },
                required: false,
              },
              {
                model: CmpMediaViberTemplate,
                as: 'cmpMediaViberTemplate',
                foreignKey: 'cmpMediaViberTemplateId',
                where: {
                  deleted: false,
                },
                required: false,
              },
            ],
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
            model: CmpVoice,
            as: 'cmpVoice',
            foreignKey: 'cmpVoiceId',
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

      const startTime1 = new Date().getTime();
      const rawCmpRecords = await CmpRecord.findAll(query);
      const endTime1 = new Date().getTime();
      L.debug(`Time Taken (Select Active Records): ${endTime1 - startTime1}ms`);

      const startTime2 = new Date().getTime();
      const cmpRecords = rawCmpRecords
        .map(cmpRecord => mapCmpRecord(cmpRecord, excludeSecret));
      const endTime2 = new Date().getTime();
      L.debug(`Time Taken (Map Active Records): ${endTime2 - startTime2}ms`);

      return Promise.resolve(cmpRecords);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getActiveRecords(limit, currentTime, excludeSecret);
      }
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
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return countPendingRecordsByCampaignId(campaignId);
      }
      return Promise.reject(error);
    }
  };

  const countPendingAndQueuingRecordsByCampaignId = async (campaignId) => {
    try {
      const { CmpRecord } = container.databaseService.models;

      const query = {
        where: {
          cmpCampaignId: campaignId,
          status: ['pending', 'queuing'],
          deleted: false,
        },
      };

      const count = await CmpRecord.count(query);
      return Promise.resolve(count);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return countPendingAndQueuingRecordsByCampaignId(campaignId);
      }
      return Promise.reject(error);
    }
  };

  return {
    listRecords,
    getActiveRecords,
    countPendingRecordsByCampaignId,
    countPendingAndQueuingRecordsByCampaignId,

    createRecord,
    createRecordBatch,
    readRecord,

    updateRecord,
    updateRecords,

    deleteRecord,
    deleteRecords,

    findRecord,
    findRecords,
  };
};
