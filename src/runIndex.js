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

const { client } = container.databaseService;
const recordFilePath = '/Users/ypoh/vcmp/dataload/records.csv';
const parametersFilePath = '/Users/ypoh/vcmp/dataload/parameters.csv';
const recordsSql = `LOAD DATA LOCAL INFILE '${recordFilePath}' INTO TABLE CmpRecords FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;
const parametersSql = `LOAD DATA LOCAL INFILE '${parametersFilePath}' INTO TABLE CmpParameters FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n'`;

let recordsStart;
let parametersStart;
Promise.resolve()
  .then(() => {
    recordsStart = new Date().getTime();
    console.log('Loading Records');
    return client.query(recordsSql);
  })
  .then(() => {
    const endTime = new Date().getTime();
    console.log(`Time Taken (Records): ${endTime - recordsStart}ms`);
    parametersStart = new Date().getTime();
    console.log('Loading Parameters');
    return client.query(parametersSql);
  })
  .then(() => {
    const endTime = new Date().getTime();
    console.log(`Time Taken (Parameters): ${endTime - parametersStart}ms`);
  })
  .catch(console.error);
