import Joi from 'joi';

export default {
  listCampaigns: {
    query: {},
    params: {},
    body: {},
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
      actualStartDate: Joi.date(),
      actualEndDate: Joi.date().min(Joi.ref('actualStartDate')),
      actualDuration: Joi.number,
      status: Joi.string(),
      statusTime: Joi.date(),
    },
  },
  deleteCampaign: {
    query: {},
    params: {
      cmpCampaignId: Joi.string().min(1).required(),
    },
    body: {},
  },
};
