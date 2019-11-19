import Joi from 'joi';

export default {
  listApplications: {
    query: {},
    params: {},
    body: {},
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
      cmpApiKeyId: Joi.string(),
      applicationId: Joi.string(),
      privateKey: Joi.string(),
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
