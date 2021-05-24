/**
 * Persistence Service for CMP Templates
 * Create, Read, Update, Delete and List Templates
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Template Persistence Accessor');

  const listTemplates = async (excludeSecret = true, options = {}) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplates = await CmpTemplate.listTemplates(excludeSecret, options);
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findTemplate = async (criteria, excludeSecret = true) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.findTemplate(criteria, excludeSecret, true);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findTemplates = async (criteria, excludeSecret = true, options = {}) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplates = await CmpTemplate.findTemplates(criteria, excludeSecret, true, options);
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createTemplate = async (
    name,
    cmpChannelId,
    whatsappTemplateNamespace,
    whatsappTemplateName,
    viberTtl,
    facebookTag,
    category,
    mediaType,
    body,
    excludeSecret = true,
  ) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.createTemplate(
        name,
        cmpChannelId,
        whatsappTemplateNamespace,
        whatsappTemplateName,
        viberTtl,
        facebookTag,
        category,
        mediaType,
        body,
        excludeSecret,
      );
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readTemplate = async (cmpTemplateId, excludeSecret = true) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.readTemplate(cmpTemplateId, excludeSecret);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateTemplate = async (cmpTemplateId, changes, excludeSecret = true, options = {}) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.updateTemplate(
        cmpTemplateId, changes, excludeSecret, options,
      );
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateTemplates = async (criteria, changes, excludeSecret = true, options = {}) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplates = await CmpTemplate.updateTemplates(
        criteria, changes, excludeSecret, options,
      );
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteTemplate = async (cmpTemplateId, excludeSecret = true, options = { noGet: true }) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.deleteTemplate(cmpTemplateId, excludeSecret, options);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteTemplates = async (criteria, excludeSecret = true, options = { noGet: true }) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplates = await CmpTemplate.deleteTemplates(criteria, excludeSecret, options);
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
