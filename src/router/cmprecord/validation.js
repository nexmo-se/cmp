import Joi from 'joi';

export default {
  listRecords: {
    query: {},
    params: {},
    body: {},
  },
  deleteAllRecords: {
    query: {},
    params: {},
    body: {},
  },
  createRecordSingle: {
    query: {},
    params: {},
    body: {
      recipient: Joi.string().min(1).required(),
      cmpCampaignId: Joi.string().min(1).required(),
      cmpTemplateId: Joi.string().min(1).required(),
      cmpMediaId: Joi.string(),
      cmpMedia: Joi.object({
        type: Joi.string().min(1).required(),
        text: Joi.string(),
        url: Joi.string(),
        caption: Joi.string(),
        fileName: Joi.string(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        name: Joi.string(),
        address: Joi.string(),
      }),
      cmpParameters: Joi.array().items(Joi.string().min(1)),
      activeStartHour: Joi.number().integer()
        .min(0)
        .max(23)
        .required(),
      activeStartMinute: Joi.number().integer()
        .min(0)
        .max(59)
        .required(),
      activeEndHour: Joi.number().integer()
        .min(0)
        .max(23)
        .required(),
      activeEndMinute: Joi.number().integer()
        .min(0)
        .max(59)
        .required(),
      activeOnWeekends: Joi.boolean().required(),
      timezone: Joi.string().required(),
    },
  },
  createRecordBatch: {
    query: {},
    params: {},
    body: Joi.array().items({
      recipient: Joi.string().min(1).required(),
      cmpCampaignId: Joi.string().min(1).required(),
      cmpTemplateId: Joi.string().min(1).required(),
      cmpMediaId: Joi.string(),
      cmpMedia: Joi.object({
        type: Joi.string().min(1).required(),
        text: Joi.string(),
        url: Joi.string(),
        caption: Joi.string(),
        fileName: Joi.string(),
        latitude: Joi.number(),
        longitude: Joi.number(),
        name: Joi.string(),
        address: Joi.string(),
      }),
      cmpParameters: Joi.array().items(Joi.string().min(1)),
      activeStartHour: Joi.number().integer()
        .min(0)
        .max(23)
        .required(),
      activeStartMinute: Joi.number().integer()
        .min(0)
        .max(59)
        .required(),
      activeEndHour: Joi.number().integer()
        .min(0)
        .max(23)
        .required(),
      activeEndMinute: Joi.number().integer()
        .min(0)
        .max(59)
        .required(),
      activeOnWeekends: Joi.boolean().required(),
      timezone: Joi.string().required(),
    }).required(),
  },
  readRecord: {
    query: {},
    params: {
      cmpRecordId: Joi.string().min(1).required(),
    },
    body: {},
  },
  deleteRecord: {
    query: {},
    params: {
      cmpRecordId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
