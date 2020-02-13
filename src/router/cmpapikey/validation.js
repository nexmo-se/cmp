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
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
    },
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
      signatureSecret: Joi.string(),
      signatureMethod: Joi.string().valid('md5hash', 'md5', 'sha1', 'sha256', 'sha512'),
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
      signatureSecret: Joi.string().forbidden(),
      signatureMethod: Joi.string().forbidden(),
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
