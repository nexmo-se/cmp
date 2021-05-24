/**
 * Accessor Service for CMP Media (Viber Template)
 * Create, Read, Update, Delete and List Viber Template Media
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Media ViberTemplate Model Accessor');

  const getById = async (cmpMediaViberTemplateId, excludeDeleted = true) => {
    try {
      const {
        CmpMediaViberTemplate,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaViberTemplateId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaViberTemplate = await CmpMediaViberTemplate.findOne(query);
      if (rawCmpMediaViberTemplate == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaViberTemplate = mapCmpMediaViberTemplate(rawCmpMediaViberTemplate);
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpMediaViberTemplateId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpMediaViberTemplate,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['createdAt', 'DESC'],
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpMediaViberTemplates = await CmpMediaViberTemplate.findAll(query);
      const cmpMediaViberTemplates = rawCmpMediaViberTemplates
        .map(cmpMediaViberTemplate => mapCmpMediaViberTemplate(cmpMediaViberTemplate));
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpMediaViberTemplates = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpMediaViberTemplates == null || cmpMediaViberTemplates.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaViberTemplate = cmpMediaViberTemplates[0];
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaViberTemplateId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpMediaViberTemplate } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaViberTemplateId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaViberTemplate.update(changes, query);
      L.trace('CmpMediaViberTemplate Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpMediaViberTemplateId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpMediaViberTemplateId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaViberTemplate } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaViberTemplate.update(changes, query);
      L.trace('CmpMediaViberTemplate Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMediaViberTemplates = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpMediaViberTemplate = (cmpMediaViberTemplate) => {
    const mappedCmpMediaViberTemplate = cmpMediaViberTemplate.dataValues;

    delete mappedCmpMediaViberTemplate.deleted;
    delete mappedCmpMediaViberTemplate.createdAt;
    delete mappedCmpMediaViberTemplate.updatedAt;

    return mappedCmpMediaViberTemplate;
  };

  const listMediaViberTemplates = async (options = {}) => {
    try {
      const cmpMediaViberTemplates = await getByCriteria({}, true, options);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaViberTemplateBatch = async (mediaList) => {
    try {
      const { CmpMediaViberTemplate } = container.databaseService.models;
      const creatableMediaList = mediaList.map(mediaItem => ({
        id: mediaItem.id || container.uuid(),
        url: mediaItem.url,
        caption: mediaItem.caption,
        actionUrl: mediaItem.actionUrl,
        deleted: false,
      }));
      const rawCmpMediaViberTemplates = await CmpMediaViberTemplate.bulkCreate(creatableMediaList);
      const cmpMediaViberTemplate = rawCmpMediaViberTemplates.map(mapCmpMediaViberTemplate);
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaViberTemplateBatch(mediaList);
      }
      return Promise.reject(error);
    }
  };

  const createMediaViberTemplate = async (
    url, caption, actionUrl,
  ) => {
    try {
      const { CmpMediaViberTemplate } = container.databaseService.models;
      const rawCmpMediaViberTemplate = await CmpMediaViberTemplate.create({
        id: container.uuid(),
        url,
        caption,
        actionUrl,
        deleted: false,
      });

      const cmpMediaViberTemplate = mapCmpMediaViberTemplate(rawCmpMediaViberTemplate);
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaViberTemplate(url, caption, actionUrl);
      }
      return Promise.reject(error);
    }
  };

  const readMediaViberTemplate = async (cmpMediaViberTemplateId) => {
    try {
      const cmpMediaViberTemplate = await getById(cmpMediaViberTemplateId, false);
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaViberTemplate = async (cmpMediaViberTemplateId, changes, options = {}) => {
    try {
      const cmpMediaViberTemplate = await updateById(
        cmpMediaViberTemplateId, changes, true, options,
      );
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaViberTemplates = async (criteria, changes, options = {}) => {
    try {
      const cmpMediaViberTemplates = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaViberTemplate = async (cmpMediaViberTemplateId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaViberTemplate = await updateById(
        cmpMediaViberTemplateId, changes, true, options,
      );
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaViberTemplates = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaViberTemplates = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaViberTemplate = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaViberTemplate = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaViberTemplates = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpMediaViberTemplates = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaViberTemplates,

    createMediaViberTemplate,
    createMediaViberTemplateBatch,

    readMediaViberTemplate,

    updateMediaViberTemplate,
    updateMediaViberTemplates,

    deleteMediaViberTemplate,
    deleteMediaViberTemplates,

    findMediaViberTemplate,
    findMediaViberTemplates,
  };
};
