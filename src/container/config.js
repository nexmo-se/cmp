export default {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  ip: process.env.IP || '0.0.0.0',
  host: process.env.HOST || 'http://localhost',
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  hash: {
    saltRounds: parseInt(process.env.HASH_SALT_ROUNDS || '10', 10),
  },
  user: {
    username: process.env.USER_USERNAME,
    passwordHash: process.env.USER_PASSWORD_HASH,
    passwordSalt: process.env.USER_PASSWORD_SALT,
  },
  nexmo: {
    host: 'https://api.nexmo.com',
    restHost: 'https://rest.nexmo.com',
    mock: {
      sms: (process.env.USE_MOCK_SMS || 'false') === 'true',
      whatsapp: (process.env.USE_MOCK_WHATSAPP || 'false') === 'true',
      facebook: (process.env.USE_MOCK_FACEBOOK || 'false') === 'true',
      viber: (process.env.USE_MOCK_VIBER || 'false') === 'true',
    },
    sandbox: {
      sms: (process.env.USE_SANDBOX_SMS || 'false') === 'true',
      whatsapp: (process.env.USE_SANDBOX_WHATSAPP || 'false') === 'true',
      facebook: (process.env.USE_SANDBOX_FACEBOOK || 'false') === 'true',
      viber: (process.env.USE_SANDBOX_VIBER || 'false') === 'true',
    },
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
  },
  enableSequelizeLog: false,
  forceSequelizeSync: false,
  define: {
    timestamps: false,
  },
};