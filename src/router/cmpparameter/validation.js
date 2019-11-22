import Joi from 'joi';

export default {
  listParameters: {
    query: {},
    params: {},
    body: {},
  },
  deleteAllParameters: {
    query: {},
    params: {},
    body: {},
  },
  createParameter: {
    query: {},
    params: {},
    body: {
      parameter: Joi.string().min(1).required(),
      order: Joi.number().integer().required(),
    },
  },
  readParameter: {
    query: {},
    params: {
      cmpParameterId: Joi.string().min(1).required(),
    },
    body: {},
  },
  deleteParameter: {
    query: {},
    params: {
      cmpParameterId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
