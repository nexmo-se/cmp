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
      apiKey: Joi.string().min(1).required(),
      applicationId: Joi.string().min(1).required(),
      privateKey: Joi.string().min(1).required(),
    },
  },
  readApplication: {
    query: {},
    params: {
      nexmoApplicationId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateApplication: {
    query: {},
    params: {
      nexmoApplicationId: Joi.string().min(1).required(),
    },
    body: {
      name: Joi.string(),
      apiKey: Joi.string(),
      applicationId: Joi.string(),
      privateKey: Joi.string(),
    },
  },
  deleteApplication: {
    query: {},
    params: {
      nexmoApplicationId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
