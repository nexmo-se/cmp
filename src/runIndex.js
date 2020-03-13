require('@babel/polyfill');
require('dotenv').config();

const axios = require('axios');
const mysql = require('mysql2');
const packageJson = require('../package.json');

/* eslint-disable global-require */
process.on('unhandledRejection', (reason, p) => {
  console.warn('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:');
  console.error(err);
});

process.on('SIGTERM', () => {
  console.error('SIGTERM received, someone is trying to kill Run');
  console.error('Killing myself (Run)');
  process.exit(1);
});

// Set default node environment to development
const env = process.env.NODE_ENV || 'development';

console.log('ENVIRONMENT:', env);
console.log('VERSION:', packageJson.version);
console.log('NODEJS VERSION:', process.version);

// Start of Script
console.log('This is the Trigger Script');

const container = require('./container').default;

const from = new Date(1168445696000);
const to = new Date();
const cmpCampaignId = '8fef82b5-86ac-4ab2-8327-a72158264cfd';

container.reportService.summary.getOverallSummary(from, to)
// container.reportService.summary.getCampaignSummary(cmpCampaignId, from, to)
  .then(results => console.log(results))
  .then(() => console.log('done'))
  .then(() => process.exit(0))
  .catch(console.error);
