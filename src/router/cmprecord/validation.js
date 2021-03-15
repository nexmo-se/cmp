import Joi from 'joi';

export default {
  listRecords: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      recipient: Joi.string(),
      cmpCampaignId: Joi.string(),
      cmpTemplateId: Joi.string(),
      cmpMediaId: Joi.string(),
      cmpVoiceId: Joi.string(),
      activeStartHour: Joi.number().integer(),
      activeStartMinute: Joi.number().integer(),
      activeEndHour: Joi.number().integer(),
      activeEndMinute: Joi.number().integer(),
      activeOnWeekends: Joi.boolean(),
      timezone: Joi.string(),
      status: Joi.string(),
    },
    params: {},
    body: {},
  },
  searchRecords: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      recipient: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      cmpCampaignId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      cmpTemplateId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      cmpMediaId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      cmpVoiceId: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      activeStartHour: Joi.number().integer(),
      activeStartMinute: Joi.number().integer(),
      activeEndHour: Joi.number().integer(),
      activeEndMinute: Joi.number().integer(),
      activeOnWeekends: Joi.boolean(),
      timezone: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      status: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
    },
    params: {},
    body: {},
  },
  listActiveRecords: {
    query: {
      limit: Joi.number().integer().default(30),
      time: Joi.date(),
    },
    params: {},
    body: {},
  },
  deleteAllRecords: {
    query: {},
    params: {},
    body: {},
  },
  createCsvMetadata: {
    query: {},
    params: {
      cmpCampaignId: Joi.string().min(1).required(),
      cmpTemplateId: Joi.string().min(1).required(),
    },
    body: {
      mediaType: Joi.string()
        .min(1)
        .valid(
          'none', // no media (body text only)
          'audio', // facebook
          'file', // facebook, whatsapp
          'image', // facebook, whatsapp, viber
          'location', // whatsapp
          'text', // whatsapp (header)
          'viber_template', // viber
          'video', // facebook, whatsapp
        )
        .default('none'),
      columns: Joi.array()
        .items(
          Joi.string().valid(
            'recipient',
            'text', // text
            'url', // audio, file, image, viber_template, video
            'caption', // viber_template
            'fileName', // file,
            'latitude', // location
            'longitude', // location
            'name', // location
            'address', // location
            'actionUrl', // viber_template
            'parameter', // body text parameter (multiple)
            'voice_voiceType',
            'voice_language',
            'voice_style',
            'voice_streamUrl',
            'voice_answerUrl',
          ),
        )
        .default([]),
    },
  },
  uploadCsv: {
    query: {},
    body: {},
    params: {
      cmpCampaignId: Joi.string().min(1).required(),
      cmpTemplateId: Joi.string().min(1).required(),
    },
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
        actionUrl: Joi.string(),
      }),
      cmpVoiceId: Joi.string(),
      cmpVoice: Joi.object({
        voiceType: Joi.string().min(1).required(),
        language: Joi.string(),
        style: Joi.string(),
        streamUrl: Joi.string(),
        answerUrl: Joi.string(),
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
        actionUrl: Joi.string(),
      }),
      cmpVoiceId: Joi.string(),
      cmpVoice: Joi.object({
        voiceType: Joi.string().min(1).required(),
        language: Joi.string(),
        style: Joi.string(),
        streamUrl: Joi.string(),
        answerUrl: Joi.string(),
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
