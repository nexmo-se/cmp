export default {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  ip: process.env.IP || '0.0.0.0',
  host: process.env.HOST || 'http://localhost',
  customPort: (process.env.CUSTOM_PORT || 'false') === 'true',
  requestMaxSize: process.env.REQUEST_MAX_SIZE || '150mb',
  csv: {
    uploadPath: process.env.CSV_UPLOAD_PATH,
    archivePath: process.env.CSV_ARCHIVE_PATH,
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
    rateLimiter: process.env.RATE_LIMITER || 'axiosratelimiter',
    secondsPerBatch: parseInt(process.env.SECONDS_PER_BATCH || '5', 10),
    recordsPerBatch: parseInt(process.env.RECORDS_PER_BATCH || '30', 10),
  },
  nexmo: {
    host: process.env.NEXMO_API,
    restHost: process.env.NEXMO_REST_API,
    mockSmsUrl: process.env.MOCK_SMS_URL,
    useWhatsappSandbox: (process.env.USE_SANDBOX_WHATSAPP || 'false') === 'true',
    useMockSms: (process.env.USE_MOCK_SMS || 'false') === 'true',
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
      default: { appenders: ['out', 'everything'], level: 'trace' },
    },
  },
  database: {
    name: process.env.DATABASE_NAME || '',
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    host: process.env.DATABASE_HOST || '',
    port: process.env.DATABASE_PORT || 3306,
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    useSsl: (process.env.DATABASE_USE_SSL || 'false').toLowerCase() === 'true',
    logging: (process.env.DATABASE_LOGGING || 'false').toLowerCase() === 'true',
  },
  enableSequelizeLog: false,
  forceSequelizeSync: false,
  define: {
    timestamps: false,
  },
};
