// Template
const config = {
  database: process.env.DATABASE_NAME || '',
  username: process.env.DATABASE_USERNAME || '',
  password: process.env.DATABASE_PASSWORD || '',
  host: process.env.DATABASE_HOST || '',
  port: process.env.DATABASE_PORT || 5432,
  dialect: process.env.DATABASE_DIALECT || 'postgres',
};

// Check SSL
const useSsl = (process.env.DATABASE_USE_SSL || 'false').toLowerCase() === 'true';
if (useSsl) {
  config.dialectOptions = { ssl: true };
}

// Export
module.exports = {
  development: config,
  test: config,
  production: config,
};