import Joi from 'joi';

export default {
  setWebhook: {
    query: {},
    params: {
      cmpApplicationId: Joi.string().min(1).required(),
    },
    body: {},
  },
  listApplications: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.string(),
      cmpApiKeyId: Joi.string(),
    },
    params: {},
    body: {},
  },
  searchApplications: {
    query: {},
    params: {},
    body: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      cmpApiKeyId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
    },
  },
  deleteAllApplications: {
    query: {},
    params: {},
    body: {},
  },
  createApplication: {
    query: {},
    params: {},
    body: {
      name: Joi.string().min(1).required(),
      cmpApiKeyId: Joi.string().min(1).required(),
      applicationId: Joi.string().min(1).required(),
      privateKey: Joi.string().min(1).required(),
    },
  },
  readApplication: {
    query: {},
    params: {
      cmpApplicationId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateApplication: {
    query: {},
    params: {
      cmpApplicationId: Joi.string().min(1).required(),
    },
    body: {
      name: Joi.string(),
      cmpApiKeyId: Joi.string().forbidden(),
      applicationId: Joi.string().forbidden(),
      privateKey: Joi.string().forbidden(),
    },
  },
  deleteApplication: {
    query: {},
    params: {
      cmpApplicationId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
