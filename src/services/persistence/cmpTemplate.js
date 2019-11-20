export default (container) => {
  const { L } = container.defaultLogger('Cmp Template Persistence Accessor');

  const listTemplates = async () => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplates = await CmpTemplate.listTemplates();
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
  ) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.createTemplate(
        name,
        cmpChannelId,
        whatsappTemplateId,
        mediaType,
        body,
      );
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readTemplate = async (cmpTemplateId) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.readTemplate(cmpTemplateId);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateTemplate = async (cmpTemplateId, changes) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.updateTemplate(
        cmpTemplateId, changes,
      );
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateTemplates = async (criteria, changes) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplates = await CmpTemplate.updateTemplates(criteria, changes);
      return Promise.resolve(cmpTemplates);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteTemplate = async (cmpTemplateId) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplate = await CmpTemplate.deleteTemplate(cmpTemplateId);
      return Promise.resolve(cmpTemplate);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteTemplates = async (criteria) => {
    try {
      const { CmpTemplate } = container.databaseService.accessors;
      const cmpTemplates = await CmpTemplate.deleteTemplates(criteria);
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
  };
};
