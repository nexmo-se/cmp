import Joi from 'joi';

export default {
  listMedias: {
    query: {},
    params: {},
    body: {},
  },
  deleteAllMedias: {
    query: {},
    params: {},
    body: {},
  },
  createMedia: {
    query: {},
    params: {},
    body: {
      type: Joi.string().min(1).required(),
      text: Joi.string(),
      url: Joi.string(),
      caption: Joi.string(),
      fileName: Joi.string(),
      latitude: Joi.number(),
      longitude: Joi.number(),
      name: Joi.string(),
      address: Joi.string(),
      actionUrl: Joi.string(),
    },
  },
  readMedia: {
    query: {},
    params: {
      cmpMediaId: Joi.string().min(1).required(),
    },
    body: {},
  },
  deleteMedia: {
    query: {},
    params: {
      cmpMediaId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
