export default (container) => {
  const { L } = container.defaultLogger('Cmp Template Model Accessor');

  const getById = async (cmpTemplateId, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, CmpTemplate,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpTemplateId,
        },
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
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpTemplate = await CmpTemplate.findOne(query);
      if (rawCmpTemplate == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpTemplate = mapCmpTemplate(rawCmpTemplate, excludeSecret);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const {
        CmpApiKey, CmpApplication, CmpChannel, CmpTemplate,
      } = container.databaseService.models;
      const query = {
        where: criteria,
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
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpTemplates = await CmpTemplate.findAll(query);
      const cmpTemplates = rawCmpTemplates
        .map(cmpTemplate => mapCmpTemplate(cmpTemplate, excludeSecret));
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpTemplates = await getByCriteria(criteria, excludeSecret, excludeDeleted);
      if (cmpTemplates == null || cmpTemplates.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpTemplate = cmpTemplates[0];
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpTemplateId, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpTemplate } = container.databaseService.models;
      const query = {
        where: {
          id: cmpTemplateId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpTemplate.update(changes, query);
      L.debug('CmpTemplate Update Result', result);

      const cmpTemplate = await getById(cmpTemplateId, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeSecret = true, excludeDeleted = true,
  ) => {
    try {
      const { CmpTemplate } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpTemplate.update(changes, query);
      L.debug('CmpTemplate Update Result', result);

      const cmpTemplates = await getByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpTemplates);
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

  const listTemplates = async (excludeSecret = true) => {
    try {
      const cmpTemplates = await getByCriteria({}, excludeSecret, true);
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createTemplate = async (
    name,
    cmpChannelId,
    whatsappTemplateId,
    mediaType,
    body,
    excludeSecret = true,
  ) => {
    try {
      const { CmpTemplate } = container.databaseService.models;
      const rawCmpTemplate = await CmpTemplate.create({
        id: container.uuid(),
        name,
        cmpChannelId,
        whatsappTemplateId,
        mediaType,
        body,
        deleted: false,
      });

      const cmpTemplate = mapCmpTemplate(rawCmpTemplate, excludeSecret);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readTemplate = async (cmpTemplateId, excludeSecret = true) => {
    try {
      const cmpTemplate = await getById(cmpTemplateId, excludeSecret, false);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateTemplate = async (cmpTemplateId, changes, excludeSecret = true) => {
    try {
      const cmpTemplate = await updateById(cmpTemplateId, changes, excludeSecret, true);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateTemplates = async (criteria, changes, excludeSecret = true) => {
    try {
      const cmpTemplates = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteTemplate = async (cmpTemplateId, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpTemplate = await updateById(cmpTemplateId, changes, excludeSecret, true);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteTemplates = async (criteria = {}, excludeSecret = true) => {
    try {
      const changes = { deleted: true };
      const cmpTemplates = await updateByCriteria(criteria, changes, excludeSecret, true);
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findTemplate = async (criteria = {}, excludeSecret = true, excludeDeleted = true) => {
    try {
      const cmpTemplate = await getOneByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findTemplates = async (criteria = {}, excludeSecret, excludeDeleted = true) => {
    try {
      const cmpTemplates = await getByCriteria(criteria, excludeSecret, excludeDeleted);
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listTemplates,

    createTemplate,
    readTemplate,

    updateTemplate,
    updateTemplates,

    deleteTemplate,
    deleteTemplates,

    findTemplate,
    findTemplates,
  };
};
