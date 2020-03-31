import Joi from 'joi';

export default {
  listReports: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      type: Joi.string(),
      status: Joi.string().valid('pending', 'processing', 'completed', 'rejected'),
    },
    params: {},
    body: {},
  },
  searchReports: {
    query: {},
    params: {},
    body: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      type: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      status: Joi.alternatives().try(
        Joi.string().valid('pending', 'processing', 'completed', 'rejected'),
        Joi.array().items(Joi.string().valid('pending', 'processing', 'completed', 'rejected')),
      ),
    },
  },
  createReportJson: {
    query: {},
    params: {},
    body: {
      type: Joi.string().min(1).required(),
      content: Joi.object().required(),
    },
  },
  createReportCsv: {
    query: {},
    params: {},
    body: {
      type: Joi.string().min(1).required(),
      name: Joi.string().min(1).required(),
      content: Joi.object().required(),
    },
  },
  readReport: {
    query: {},
    params: {
      cmpReportId: Joi.string().min(1).required(),
    },
    body: {},
  },
  getReportArchive: {
    query: {},
    params: {
      fileName: Joi.string().min(1).required(),
    },
    body: {},
  },
};
