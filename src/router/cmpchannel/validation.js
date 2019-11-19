import Joi from 'joi';

export default {
  listChannels: {
    query: {},
    params: {},
    body: {},
  },
  deleteAllChannels: {
    query: {},
    params: {},
    body: {},
  },
  createChannel: {
    query: {},
    params: {},
    body: {
      name: Joi.string().min(1).required(),
      channel: Joi.string().min(1).required(),
      senderId: Joi.string().min(1).required(),
      cmpApplicationId: Joi.string(),
      cmpApiKeyId: Joi.string(),
    },
  },
  readChannel: {
    query: {},
    params: {
      cmpChannelId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateChannel: {
    query: {},
    params: {
      cmpChannelId: Joi.string().min(1).required(),
    },
    body: {
      name: Joi.string(),
      channel: Joi.string(),
      senderId: Joi.string(),
      cmpApplicationId: Joi.string(),
      cmpApiKeyId: Joi.string(),
    },
  },
  deleteChannel: {
    query: {},
    params: {
      cmpChannelId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
