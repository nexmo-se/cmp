require('@babel/polyfill');
require('dotenv').config();

const axios = require('axios');
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

const host = 'http://localhost:8080';
const numberOfRecords = 15000;
const number = '6583206274';
const templateId = 'ad7b86ff-64c1-4a80-b0a7-e98b7cda4a44';

const login = async () => {
  try {
    const url = `${host}/auth/login`;
    const body = {
      username: 'sysadmin',
      password: 'password123',
    };

    const response = await axios.post(url, body);
    const { data } = response;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createRecord = async (campaignId) => {
  try {
    const url = `${host}/records`;
    const body = {
      recipient: number,
      cmpCampaignId: campaignId,
      cmpTemplateId: templateId,
      cmpParameters: [
        'Sheenigami',
        'Pusheen',
        'pick up',
      ],
      activeStartHour: 8,
      activeStartMinute: 0,
      activeEndHour: 18,
      activeEndMinute: 0,
      activeOnWeekends: true,
      timezone: 'Asia/Singapore',
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await axios.post(url, body, config);
    const { data } = response;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createCampaign = async () => {
  try {
    const url = `${host}/campaigns`;
    const body = {
      name: 'Test Campaign',
      campaignStartDate: '2019/11/01 00:00:00',
      campaignEndDate: '2019/12/31 23:59:59',
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await axios.post(url, body, config);
    const { data } = response;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const startCampaign = async (campaignId) => {
  try {
    const url = `${host}/campaigns/${campaignId}/status`;
    const body = {
      status: 'pending',
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await axios.put(url, body, config);
    const { data } = response;
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const runInSeqeunce = async (promises, campaignId, i = 0) => {
  try {
    if (i >= promises.length) {
      return Promise.resolve();
    }

    console.log(`creating record ${i + 1}`);
    const promise = promises[i];
    await promise(campaignId);
    await runInSeqeunce(promises, campaignId, i + 1);
    return campaignId;
  } catch (error) {
    return Promise.reject(error);
  }
};

// let authToken = null;
// login()
//   .then(data => data.token)
//   .then((token) => {
//     authToken = token;
//     return createCampaign();
//   })
//   .then(campaign => campaign.id)
//   .then((campaignId) => {
//     console.log(campaignId);
//     const recordPromises = [];
//     for (let i = 0; i < numberOfRecords; i += 1) {
//       recordPromises.push(createRecord);
//     }

//     return runInSeqeunce(recordPromises, campaignId);
//   })
//   .then(campaignId => startCampaign(campaignId))
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

let count = 0;
const skipCount = 3;
const batchSize = 1000;
let batch = '';
const result = [];
const startTime = new Date().getTime();

const filePath = '/Users/ypoh/vcmp/upload/20200226174126_bda7f7dd-95ea-4cc1-ba63-16168af6ca0a_10e6236a-b7c0-45a5-987f-89db17b13a2c_aaa.csv';

// container.fileService.readLineBuffer(
//   filePath,
//   () => console.log('hi'),
//   () => console.log((new Date().getTime() - startTime)),
// );

const reader = container.fileService.readNLineBuffer(filePath);
let line = reader.next();

while (line) {
  if (count >= skipCount) {
    if (count % batchSize === 0) {
      // Process Batch
      const tempBatch = batch;
      batch = '';
      const csvData = container.csvService.fromCsvSync(tempBatch);
      for (let i = 0; i < csvData.length; i += 1) {
        result.push(csvData[i]);
      }
    }

    batch += `${line}\n`;
  }

  count += 1;
  line = reader.next();
}

// Process Final Batch
const tempBatch = batch;
batch = '';
const csvData = container.csvService.fromCsvSync(tempBatch);
for (let i = 0; i < csvData.length; i += 1) {
  result.push(csvData[i]);
}

console.log((new Date().getTime() - startTime));
console.log(result.length);

// container.fileService.readLineBuffer(
//   filePath,
//   (line) => {
//     if (count % batchSize === 0) {
//       // Process Batch
//       const tempBatch = batch;
//       batch = '';
//       container.csvService.fromCsv(tempBatch)
//         .then((csvData) => {
//           for (let i = 0; i < csvData.length; i += 1) {
//             result.push(csvData[i]);
//           }
//         });
//     }

//     batch += `${line}\n`;
//     count += 1;
//   },
//   () => {
//     // Process Batch
//     const tempBatch = batch;
//     batch = '';
//     container.csvService.fromCsv(tempBatch)
//       .then((csvData) => {
//         for (let i = 0; i < csvData.length; i += 1) {
//           result.push(csvData[i]);
//         }
//         console.log((new Date().getTime() - startTime));
//         console.log(result.length);
//       });
//   },
// );
