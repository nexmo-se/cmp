import Joi from 'joi';

export default {
  setWebhook: {
    query: {},
    params: {
      cmpApiKeyId: Joi.string().min(1).required(),
    },
    body: {},
  },
  listApiKeys: {
    query: {},
    params: {},
    body: {},
  },
  deleteAllApiKeys: {
    query: {},
    params: {},
    body: {},
  },
  createApiKey: {
    query: {},
    params: {},
    body: {
      name: Joi.string().min(1).required(),
      apiKey: Joi.string().min(1).required(),
      apiSecret: Joi.string().min(1).required(),
    },
  },
  readApiKey: {
    query: {},
    params: {
      cmpApiKeyId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateApiKey: {
    query: {},
    params: {
      cmpApiKeyId: Joi.string().min(1).required(),
    },
    body: {
      name: Joi.string(),
      apiKey: Joi.string().forbidden(),
      apiSecret: Joi.string().forbidden(),
    },
  },
  deleteApiKey: {
    query: {},
    params: {
      cmpApiKeyId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
