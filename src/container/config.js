export default {
  environment: (process.env.NODE_ENV || 'development').toLowerCase(),
  port: process.env.PORT || 8080,
  ip: process.env.IP || '0.0.0.0',
  host: process.env.HOST || 'http://localhost',
  customPort: (process.env.CUSTOM_PORT || 'false').toLowerCase() === 'true',
  requestMaxSize: process.env.REQUEST_MAX_SIZE || '150mb',
  csv: {
    skipCount: parseInt(process.env.CSV_SKIP_COUNT || '3', 10),
    batchSize: parseInt(process.env.CSV_BATCH_SIZE || '10000', 10),
    uploadPath: process.env.CSV_UPLOAD_PATH,
    archivePath: process.env.CSV_ARCHIVE_PATH,
    dataloadPath: process.env.CSV_DATALOAD_PATH,
    insertMode: process.env.CSV_INSERT_MODE || 'sql',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  hash: {
    saltRounds: parseInt(process.env.HASH_SALT_ROUNDS || '10', 10),
  },
  picker: {
    delay: parseInt(process.env.PICKER_DELAY || '5', 10),
  },
  blaster: {
    rateLimiter: (process.env.RATE_LIMITER || 'axiosratelimiter').toLowerCase(),
    secondsPerBatch: parseInt(process.env.SECONDS_PER_BATCH || '5', 10),
    recordsPerBatch: parseInt(process.env.RECORDS_PER_BATCH || '30', 10),
    useMockBlast: (process.env.USE_MOCK_BLAST || 'false').toLowerCase() === 'true',
  },
  webhook: {
    useQueue: (process.env.USE_QUEUE || 'false').toLowerCase() === 'true',
    queueDelay: parseInt(process.env.QUEUE_DELAY || '1', 10),
  },
  nexmo: {
    host: process.env.NEXMO_API,
    restHost: process.env.NEXMO_REST_API,
    mockSmsUrl: process.env.MOCK_SMS_URL,
    mockWhatsappUrl: process.env.MOCK_WHATSAPP_URL,
    useWhatsappSandbox: (process.env.USE_SANDBOX_WHATSAPP || 'false').toLowerCase() === 'true',
    useMockSms: (process.env.USE_MOCK_SMS || 'false').toLowerCase() === 'true',
    useMockWhatsapp: (process.env.USE_MOCK_WHATSAPP || 'false').toLowerCase() === 'true',
  },
  log4js: {
    appenders: {
      out: {
        type: 'stdout',
      },
      everything: {
        type: 'dateFile', filename: 'logs/log.log',
      },
    },
    categories: {
      default: {
        appenders: ['out', 'everything'],
        level: process.env.LOGGING_LEVEL || 'info',
      },
    },
  },
  database: {
    name: process.env.DATABASE_NAME || '',
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    host: process.env.DATABASE_HOST || '',
    port: process.env.DATABASE_PORT || 3306,
    dialect: (process.env.DATABASE_DIALECT || 'mysql').toLowerCase(),
    useSsl: (process.env.DATABASE_USE_SSL || 'false').toLowerCase() === 'true',
    logging: (process.env.DATABASE_LOGGING || 'false').toLowerCase() === 'true',
  },
  enableSequelizeLog: false,
  forceSequelizeSync: false,
  define: {
    timestamps: false,
  },
};
