require('@babel/polyfill');
require('dotenv').config();
const windows1252 = require('windows-1252');
const utf8 = require('utf8');

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

// container.persistenceService.CmpParameter.listParameters({ limit: 100 })
//   .then(parameters => parameters.map(parameter => parameter.parameter))
//   .then(parameters => parameters.map((parameter) => {
//     const encoded = windows1252.encode(parameter);
//     const decoded = utf8.decode(encoded);
//     console.log(decoded);
//     return parameter;
//   }))
//   .catch(error => console.error(error));

const parameter = null;
const encoded = windows1252.encode(parameter);
const decoded = utf8.decode(encoded);
console.log(encoded);
console.log(decoded);
