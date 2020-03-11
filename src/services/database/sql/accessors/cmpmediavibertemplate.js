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
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpMediaViberTemplate,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaViberTemplates = await CmpMediaViberTemplate.findAll(query);
      const cmpMediaViberTemplates = rawCmpMediaViberTemplates
        .map(cmpMediaViberTemplate => mapCmpMediaViberTemplate(cmpMediaViberTemplate));
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaViberTemplates = await getByCriteria(criteria, excludeDeleted);
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

      const cmpMedia = await getById(cmpMediaViberTemplateId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
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

      const cmpMediaViberTemplates = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
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

  const listMediaViberTemplates = async () => {
    try {
      const cmpMediaViberTemplates = await getByCriteria({}, true);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
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

  const updateMediaViberTemplate = async (cmpMediaViberTemplateId, changes) => {
    try {
      const cmpMediaViberTemplate = await updateById(cmpMediaViberTemplateId, changes, true);
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaViberTemplates = async (criteria, changes) => {
    try {
      const cmpMediaViberTemplates = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaViberTemplate = async (cmpMediaViberTemplateId) => {
    try {
      const changes = { deleted: true };
      const cmpMediaViberTemplate = await updateById(cmpMediaViberTemplateId, changes, true);
      return Promise.resolve(cmpMediaViberTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaViberTemplates = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMediaViberTemplates = await updateByCriteria(criteria, changes, true);
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

  const findMediaViberTemplates = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaViberTemplates = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaViberTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaViberTemplates,

    createMediaViberTemplate,
    readMediaViberTemplate,

    updateMediaViberTemplate,
    updateMediaViberTemplates,

    deleteMediaViberTemplate,
    deleteMediaViberTemplates,

    findMediaViberTemplate,
    findMediaViberTemplates,
  };
};
