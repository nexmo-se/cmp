import Joi from 'joi';

export default {
  listTemplates: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.string(),
      cmpChannelId: Joi.string(),
      whatsappTemplateNamespace: Joi.string(),
      whatsappTemplateName: Joi.string(),
      viberTtl: Joi.number().integer(),
      facebookTag: Joi.string(),
      category: Joi.string(),
      mediaType: Joi.string(),
      body: Joi.string(),
    },
    params: {},
    body: {},
  },
  searchTemplates: {
    query: {},
    params: {},
    body: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      cmpChannelId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      whatsappTemplateNamespace: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      whatsappTemplateName: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      viberTtl: Joi.number().integer(),
      facebookTag: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      category: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      mediaType: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      body: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
    },
  },
  deleteAllTemplates: {
    query: {},
    params: {},
    body: {},
  },
  createTemplate: {
    query: {},
    params: {},
    body: {
      name: Joi.string().min(1).required(),
      cmpChannelId: Joi.string().min(1).required(),
      whatsappTemplateNamespace: Joi.string(),
      whatsappTemplateName: Joi.string(),
      viberTtl: Joi.number().integer(),
      facebookTag: Joi.string(),
      category: Joi.string(),
      mediaType: Joi.string().min(1).required(),
      body: Joi.string().allow(null, '').optional(),
    },
  },
  readTemplate: {
    query: {},
    params: {
      cmpTemplateId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateTemplate: {
    query: {},
    params: {
      cmpTemplateId: Joi.string().min(1).required(),
    },
    body: {
      name: Joi.string(),
      cmpChannelId: Joi.string().forbidden(),
      whatsappTemplateNamespace: Joi.string().forbidden(),
      whatsappTemplateName: Joi.string().forbidden(),
      viberTtl: Joi.number().integer().forbidden(),
      facebookTag: Joi.string().forbidden(),
      category: Joi.string().forbidden(),
      mediaType: Joi.string(),
      body: Joi.string(),
    },
  },
  deleteTemplate: {
    query: {},
    params: {
      cmpTemplateId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
