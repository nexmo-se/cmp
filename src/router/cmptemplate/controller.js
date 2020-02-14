export default (container) => {
  const { L } = container.defaultLogger('Cmp Template Controller');

  const findAllTemplates = async (req, res, next) => {
    try {
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        name, cmpChannelId,
        whatsappTemplateNamespace, whatsappTemplateName,
        viberTtl, facebookTag, category,
        mediaType, body,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (cmpChannelId) {
        criteria.cmpChannelId = cmpChannelId;
      }
      if (whatsappTemplateNamespace) {
        if (typeof whatsappTemplateNamespace === 'string') {
          criteria.whatsappTemplateNamespace = {
            [Op.like]: `%${whatsappTemplateNamespace}%`,
          };
        } else {
          criteria.whatsappTemplateNamespace = whatsappTemplateNamespace;
        }
      }
      if (whatsappTemplateName) {
        if (typeof whatsappTemplateName === 'string') {
          criteria.whatsappTemplateName = {
            [Op.like]: `%${whatsappTemplateName}%`,
          };
        } else {
          criteria.whatsappTemplateName = whatsappTemplateName;
        }
      }
      if (viberTtl) {
        criteria.viberTtl = viberTtl;
      }
      if (facebookTag) {
        if (typeof facebookTag === 'string') {
          criteria.facebookTag = {
            [Op.like]: `%${facebookTag}%`,
          };
        } else {
          criteria.facebookTag = facebookTag;
        }
      }
      if (category) {
        if (typeof category === 'string') {
          criteria.category = {
            [Op.like]: `%${category}%`,
          };
        } else {
          criteria.category = category;
        }
      }
      if (mediaType) {
        if (typeof mediaType === 'string') {
          criteria.mediaType = {
            [Op.like]: `%${mediaType}%`,
          };
        } else {
          criteria.mediaType = mediaType;
        }
      }
      if (body) {
        if (typeof body === 'string') {
          criteria.body = {
            [Op.like]: `%${body}%`,
          };
        } else {
          criteria.body = body;
        }
      }
      const options = { limit, offset };
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplates = await CmpTemplate.findTemplates(criteria, true, options);
      res.status(200).json(cmpTemplates);
    } catch (error) {
      next(error);
    }
  };

  const findMyTemplates = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Templates');
      const { Op } = container.Sequelize;
      const {
        limit, offset,
        name, cmpChannelId,
        whatsappTemplateNamespace, whatsappTemplateName,
        viberTtl, facebookTag, category,
        mediaType, body,
      } = req.body;
      const criteria = {};
      if (name) {
        if (typeof name === 'string') {
          criteria.name = {
            [Op.like]: `%${name}%`,
          };
        } else {
          criteria.name = name;
        }
      }
      if (cmpChannelId) {
        criteria.cmpChannelId = cmpChannelId;
      }
      if (whatsappTemplateNamespace) {
        if (typeof whatsappTemplateNamespace === 'string') {
          criteria.whatsappTemplateNamespace = {
            [Op.like]: `%${whatsappTemplateNamespace}%`,
          };
        } else {
          criteria.whatsappTemplateNamespace = whatsappTemplateNamespace;
        }
      }
      if (whatsappTemplateName) {
        if (typeof whatsappTemplateName === 'string') {
          criteria.whatsappTemplateName = {
            [Op.like]: `%${whatsappTemplateName}%`,
          };
        } else {
          criteria.whatsappTemplateName = whatsappTemplateName;
        }
      }
      if (viberTtl) {
        criteria.viberTtl = viberTtl;
      }
      if (facebookTag) {
        if (typeof facebookTag === 'string') {
          criteria.facebookTag = {
            [Op.like]: `%${facebookTag}%`,
          };
        } else {
          criteria.facebookTag = facebookTag;
        }
      }
      if (category) {
        if (typeof category === 'string') {
          criteria.category = {
            [Op.like]: `%${category}%`,
          };
        } else {
          criteria.category = category;
        }
      }
      if (mediaType) {
        if (typeof mediaType === 'string') {
          criteria.mediaType = {
            [Op.like]: `%${mediaType}%`,
          };
        } else {
          criteria.mediaType = mediaType;
        }
      }
      if (body) {
        if (typeof body === 'string') {
          criteria.body = {
            [Op.like]: `%${body}%`,
          };
        } else {
          criteria.body = body;
        }
      }
      const options = { limit, offset };
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplates = await CmpTemplate.findTemplates(criteria, true, options);
      res.status(200).json(cmpTemplates);
    } catch (error) {
      next(error);
    }
  };

  const listAllTemplates = async (req, res, next) => {
    try {
      const {
        limit, offset,
        name, cmpChannelId,
        whatsappTemplateNamespace, whatsappTemplateName,
        viberTtl, facebookTag, category,
        mediaType, body,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (cmpChannelId) {
        criteria.cmpChannelId = cmpChannelId;
      }
      if (whatsappTemplateNamespace) {
        criteria.whatsappTemplateNamespace = whatsappTemplateNamespace;
      }
      if (whatsappTemplateName) {
        criteria.whatsappTemplateName = whatsappTemplateName;
      }
      if (viberTtl) {
        criteria.viberTtl = viberTtl;
      }
      if (facebookTag) {
        criteria.facebookTag = facebookTag;
      }
      if (category) {
        criteria.category = category;
      }
      if (mediaType) {
        criteria.mediaType = mediaType;
      }
      if (body) {
        criteria.body = body;
      }
      const options = { limit, offset };
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplates = await CmpTemplate.findTemplates(criteria, true, options);
      res.status(200).json(cmpTemplates);
    } catch (error) {
      next(error);
    }
  };

  const listMyTemplates = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Templates');
      const {
        limit, offset,
        name, cmpChannelId,
        whatsappTemplateNamespace, whatsappTemplateName,
        viberTtl, facebookTag, category,
        mediaType, body,
      } = req.query;
      const criteria = {};
      if (name) {
        criteria.name = name;
      }
      if (cmpChannelId) {
        criteria.cmpChannelId = cmpChannelId;
      }
      if (whatsappTemplateNamespace) {
        criteria.whatsappTemplateNamespace = whatsappTemplateNamespace;
      }
      if (whatsappTemplateName) {
        criteria.whatsappTemplateName = whatsappTemplateName;
      }
      if (viberTtl) {
        criteria.viberTtl = viberTtl;
      }
      if (facebookTag) {
        criteria.facebookTag = facebookTag;
      }
      if (category) {
        criteria.category = category;
      }
      if (mediaType) {
        criteria.mediaType = mediaType;
      }
      if (body) {
        criteria.body = body;
      }
      const options = { limit, offset };
      const { CmpTemplate } = container.persistenceService;
      const cmpTemplates = await CmpTemplate.findTemplates(criteria, true, options);
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
    findAllTemplates,
    findMyTemplates,

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
