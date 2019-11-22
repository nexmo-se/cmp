import Joi from 'joi';

export default {
  blastBatch: {
    query: {},
    params: {},
    body: {
      recordIds: Joi.array().items(Joi.string().min(1)).required(),
    },
  },
  blastSingle: {
    query: {},
    params: {},
    body: {
      recordId: Joi.string().min(1).required(),
    },
  },
};
