import Joi from 'joi';

export default {
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
      nexmoApiKeyId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateApiKey: {
    query: {},
    params: {
      nexmoApiKeyId: Joi.string().min(1).required(),
    },
    body: {
      name: Joi.string(),
      apiKey: Joi.string(),
      apiSecret: Joi.string(),
    },
  },
  deleteApiKey: {
    query: {},
    params: {
      nexmoApiKeyId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
