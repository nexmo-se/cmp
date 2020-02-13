import Joi from 'joi';

export default {
  listTemplates: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
    },
    params: {},
    body: {},
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
      body: Joi.string(),
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
