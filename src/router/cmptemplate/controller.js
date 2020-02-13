export default (container) => {
  const { L } = container.defaultLogger('Cmp Template Controller');

  const listAllTemplates = async (req, res, next) => {
    try {
      const { limit, offset } = req.query;
      const options = { limit, offset };
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplates = await CmpTemplate.listTemplates(true, options);
      res.status(200).json(cmpTemplates);
    } catch (error) {
      next(error);
    }
  };

  const listMyTemplates = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Templates');
      const { limit, offset } = req.query;
      const options = { limit, offset };
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplates = await CmpTemplate.listTemplates(true, options);
      res.status(200).json(cmpTemplates);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllTemplates = async (req, res, next) => {
    try {
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplates = await CmpTemplate.deleteTemplates({});
      res.status(200).json(cmpTemplates);
    } catch (error) {
      next(error);
    }
  };

  const createTemplate = async (req, res, next) => {
    try {
      const {
        name,
        cmpChannelId,
        whatsappTemplateNamespace,
        whatsappTemplateName,
        viberTtl,
        facebookTag,
        category,
        mediaType,
        body,
      } = req.body;
      const { CmpTemplate } = container.persistenceService;

      const cmpApiKey = await CmpTemplate.createTemplate(
        name,
        cmpChannelId,
        whatsappTemplateNamespace,
        whatsappTemplateName,
        viberTtl,
        facebookTag,
        category,
        mediaType,
        body,
      );
      res.status(200).json(cmpApiKey);
    } catch (error) {
      next(error);
    }
  };

  const readTemplate = async (req, res, next) => {
    try {
      const { cmpTemplateId } = req.params;
      const { CmpTemplate } = container.persistenceService;

      const cmpTemplate = await CmpTemplate.readTemplate(cmpTemplateId);
      res.status(200).json(cmpTemplate);
    } catch (error) {
      next(error);
    }
  };

  const readMyTemplate = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Templates');
      const { cmpTemplateId } = req.params;
      const { CmpTemplate } = container.persistenceService;

      const cmpTemplate = await CmpTemplate.readTemplate(cmpTemplateId);
      res.status(200).json(cmpTemplate);
    } catch (error) {
      next(error);
    }
  };

  const updateTemplate = async (req, res, next) => {
    try {
      const { cmpTemplateId } = req.params;
      const {
        name,
        mediaType,
        body,
      } = req.body;

      const changes = {};

      if (name && name !== '') {
        changes.name = name;
      }

      if (mediaType && mediaType !== '') {
        changes.mediaType = mediaType;
      }

      if (body && body !== '') {
        changes.body = body;
      }

      const { CmpTemplate } = container.persistenceService;
      const cmpTemplate = await CmpTemplate.updateTemplate(
        cmpTemplateId, changes,
      );
      res.status(200).json(cmpTemplate);
    } catch (error) {
      next(error);
    }
  };

  const deleteTemplate = async (req, res, next) => {
    try {
      const { cmpTemplateId } = req.params;
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplate = await CmpTemplate.deleteTemplate(cmpTemplateId);
      res.status(200).json(cmpTemplate);
    } catch (error) {
      next(error);
    }
  };

  return {
    listAllTemplates,
    listMyTemplates,
    deleteAllTemplates,

    createTemplate,
    readTemplate,
    readMyTemplate,
    updateTemplate,
    deleteTemplate,
  };
};
