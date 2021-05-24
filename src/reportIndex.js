/**
 * Entry point for the Reporter process
 * Used for checking and generating reports that are manually requested from the frontend
 */

require('@babel/polyfill');
require('dotenv').config();

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
  console.error('SIGTERM received, someone is trying to kill Report Process');
  console.error('Killing myself (Report Process)');
  process.exit(1);
});

// Set default node environment to development
const env = process.env.NODE_ENV || 'development';

console.log('ENVIRONMENT:', env);
console.log('VERSION:', packageJson.version);
console.log('NODEJS VERSION:', process.version);

// Start of Script
console.log('Starting Report Process');
require('./report');
