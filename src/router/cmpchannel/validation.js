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
      tps: Joi.number().integer().required(),
      cmpApiKeyId: Joi.string().min(1).required(),
      cmpApplicationId: Joi.string(),
      smsUseSignature: Joi.boolean(),
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
      channel: Joi.string().forbidden(),
      senderId: Joi.string(),
      tps: Joi.number().min(0),
      cmpApiKeyId: Joi.string().forbidden(),
      cmpApplicationId: Joi.string().forbidden(),
      smsUseSignature: Joi.boolean(),
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
