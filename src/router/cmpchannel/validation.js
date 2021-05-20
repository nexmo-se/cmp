import Joi from 'joi';

export default {
  listChannels: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.string(),
      channel: Joi.string(),
      senderId: Joi.string(),
      tps: Joi.number().integer(),
      cmpApiKeyId: Joi.string(),
      cmpApplicationId: Joi.string(),
      smsUseSignature: Joi.boolean(),
    },
    params: {},
    body: {},
  },
  searchChannels: {
    query: {},
    params: {},
    body: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      channel: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      senderId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      tps: Joi.number().integer(),
      cmpApiKeyId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      cmpApplicationId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      smsUseSignature: Joi.boolean(),
    },
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
      senderId: Joi.string().allow(null, '').optional(),
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
