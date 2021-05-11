import Joi from 'joi';

export default {
  listCampaigns: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.string(),
      campaignStartDate: Joi.date(),
      campaignEndDate: Joi.date(),
      activeStartHour: Joi.number().integer().min(0).max(23),
      activeStartMinute: Joi.number().integer().min(0).max(59),
      activeEndHour: Joi.number().integer().min(0).max(23),
      activeEndMinute: Joi.number().integer().min(0).max(59),
      activeOnWeekends: Joi.boolean(),
      timezone: Joi.string(),
      status: Joi.string().valid('pending', 'draft', 'started', 'paused', 'completed', 'failed'),
    },
    params: {},
    body: {},
  },
  searchCampaigns: {
    query: {},
    params: {},
    body: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      name: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      campaignStartDate: Joi.date(),
      campaignEndDate: Joi.date(),
      status: Joi.alternatives().try(
        Joi.string().valid('pending', 'draft', 'started', 'paused', 'completed'),
        Joi.array().items(Joi.string().valid('pending', 'draft', 'started', 'paused', 'completed', 'failed')),
      ),
      activeStartHour: Joi.number().integer().min(0).max(23),
      activeStartMinute: Joi.number().integer().min(0).max(59),
      activeEndHour: Joi.number().integer().min(0).max(23),
      activeEndMinute: Joi.number().integer().min(0).max(59),
      activeOnWeekends: Joi.boolean(),
      timezone: Joi.string(),
    },
  },
  deleteAllCampaigns: {
    query: {},
    params: {},
    body: {},
  },
  createCampaign: {
    query: {},
    params: {},
    body: {
      name: Joi.string().min(1).required(),
      campaignStartDate: Joi.date().required(),
      campaignEndDate: Joi.date().min(Joi.ref('campaignStartDate')).required(),
      activeStartHour: Joi.number()
        .integer().min(0).max(23)
        .required(),
      activeStartMinute: Joi.number()
        .integer().min(0).max(59)
        .required(),
      activeEndHour: Joi.number()
        .integer().min(0).max(23)
        .required(),
      activeEndMinute: Joi.number()
        .integer().min(0).max(59)
        .required(),
      activeOnWeekends: Joi.boolean().required(),
      timezone: Joi.string().required(),
      niCnam: Joi.boolean().optional(),
    },
  },
  readCampaign: {
    query: {},
    params: {
      cmpCampaignId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateCampaign: {
    query: {},
    params: {
      cmpCampaignId: Joi.string().min(1).required(),
    },
    body: {
      name: Joi.string().min(1),
      campaignStartDate: Joi.date(),
      campaignEndDate: Joi.date().min(Joi.ref('campaignStartDate')),
      activeStartHour: Joi.number().integer().min(0).max(23),
      activeStartMinute: Joi.number().integer().min(0).max(59),
      activeEndHour: Joi.number().integer().min(0).max(23),
      activeEndMinute: Joi.number().integer().min(0).max(59),
      activeOnWeekends: Joi.boolean(),
      timezone: Joi.string(),
      actualStartDate: Joi.date(),
      actualEndDate: Joi.date().min(Joi.ref('actualStartDate')),
      actualDuration: Joi.number(),
      status: Joi.string().valid('pending', 'draft', 'started', 'paused', 'completed', 'failed'),
      statusTime: Joi.date(),
      niCnam: Joi.boolean().optional(),
    },
  },
  deleteCampaign: {
    query: {},
    params: {
      cmpCampaignId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateCampaignStatus: {
    query: {},
    params: {
      cmpCampaignId: Joi.string().min(1).required(),
    },
    body: {
      status: Joi.string().valid('pending', 'draft', 'started', 'paused', 'completed', 'failed'),
    },
  },
};
