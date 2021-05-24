/**
 * Configurations, configured with env
 */

export default {
  environment: (process.env.NODE_ENV || 'development').toLowerCase(),
  port: process.env.PORT || 8080, // port which the application should listen on
  ip: process.env.IP || '0.0.0.0', // listening ip
  host: process.env.HOST || 'http://localhost', // host of the application
  accessHost: process.env.ACCESS_HOST || 'http://localhost', // publicly accessible host for automated webhook setup
  accessPort: process.env.ACCESS_PORT || 8080, // publicly accessible port for automated webhook setup, may be different from 'port' depending on your nginx/apache setup
  requestMaxSize: process.env.REQUEST_MAX_SIZE || '150mb', // max REST API request size
  csv: {
    skipCount: parseInt(process.env.CSV_SKIP_COUNT || '3', 10), // number of rows to skip (header rows)
    batchSize: parseInt(process.env.CSV_BATCH_SIZE || '10000', 10), // number of lines to parse and insert to database per batch
    uploadPath: process.env.CSV_UPLOAD_PATH, // directory which the metadata and csv will be placed (when uploaded from frontend)
    archivePath: process.env.CSV_ARCHIVE_PATH, // directory which the csv will be archived to (after picked by picker)
    dataloadPath: process.env.CSV_DATALOAD_PATH, // directory which the temporary SQL CSV will be placed for dataload mode
    insertMode: process.env.CSV_INSERT_MODE || 'sql', // [sql / csv] - bulk insert with SQL or dataload with CSV
  },
  jwt: {
    secret: process.env.JWT_SECRET, // secret to generate JWT for the CMP user accounts
  },
  hash: {
    saltRounds: parseInt(process.env.HASH_SALT_ROUNDS || '10', 10), // number of rounds of salt
  },
  picker: {
    delay: parseInt(process.env.PICKER_DELAY || '5', 10), // delay between each picker run
  },
  blaster: {
    rateLimiter: (process.env.RATE_LIMITER || 'bottleneck').toLowerCase(), // [bottleneck / bottleneckaxios / bottleneckrequest / axiosratelimiter] - type of rate limiter to be used
    rateLimiterMode: (process.env.RATE_LIMITER_MODE || 'decimal').toLowerCase(), // [ceiling / floor / decimal] - method to calculate minimum time between requests 
    secondsPerBatch: parseInt(process.env.SECONDS_PER_BATCH || '5', 10), // number of seconds to wait before reading and sending next batch of records
    recordsPerBatch: parseInt(process.env.RECORDS_PER_BATCH || '30', 10),  // number of records to read per batch (need to calculate according to TPS so as to not congest the queue)
    useMockBlast: (process.env.USE_MOCK_BLAST || 'false').toLowerCase() === 'true', // whether to do fake blast (not even sending to mock endpoint)
    generateReport: (process.env.BLASTER_GENERATE_REPORT || 'false').toLowerCase() === 'true', // whether to generate report
    reportDelay: parseInt(process.env.BLASTER_REPORT_DELAY || '900', 10), // delay before generating report after the last record of this campaign is sent
    clientRefPrefix: process.env.BLASTER_CLIENT_REF_PREFIX || 'cmp_', // clientref prefix
  },
  report: {
    delay: parseInt(process.env.REPORT_DELAY || '5', 10), // delay between each reporter run (for custom created report request, not part of automated report generation after blast)
    filePath: process.env.REPORT_FILE_PATH, // directory which reports will be placed
    batchLimit: parseInt(process.env.REPORT_BATCH_LIMIT || '1000', 10), // number of records to read from database per batch
  },
  webhook: {
    useQueue: (process.env.USE_QUEUE || 'true').toLowerCase() === 'true', // whether webhook data will be saved immediately or placed into a queue and saved into the database on a regular interval
    queueDelay: parseInt(process.env.QUEUE_DELAY || '5', 10), // interval between each save of the queue
  },
  audit: {
    saveRecordAudits: (process.env.SAVE_RECORDS_AUDITS || 'true').toLowerCase() === 'true', // whether to save detailed webhook record audit trail (needed for NI and VAPI full format report)
    saveCampaignAudits: (process.env.SAVE_CAMPAIGNS_AUDITS || 'true').toLowerCase() === 'true', // whether to save detailed campaign audit trail
  },
  nexmo: {
    // Nexmo Endpoints
    host: process.env.NEXMO_API, // Nexmo API Endpoint Host
    restHost: process.env.NEXMO_REST_API, // Nexmo SMS API Endpoint Host

    // Mock Endpoints
    mockSmsUrl: process.env.MOCK_SMS_URL, // Mock SMS Endpoint URL (mockymocky)
    mockWhatsappUrl: process.env.MOCK_WHATSAPP_URL, // Mock Whatsapp Endpoint URL (mockymocky)
    mockViberUrl: process.env.MOCK_VIBER_URL, // Mock Viber Endpoint URL (mockymocky)
    mockVoiceUrl: process.env.MOCK_VOICE_URL, // Mock Voice Endpoint URL (mockymocky)
    mockNumberInsightUrl: process.env.MOCK_NUMBER_INSIGHT_URL, // Mock Number Insight Endpoint URL (mockymocky)

    // Use Sandbox
    useWhatsappSandbox: (process.env.USE_SANDBOX_WHATSAPP || 'false').toLowerCase() === 'true', // Whether to use whatsapp APAC sandbox
    useViberSandbox: (process.env.USE_SANDBOX_VIBER || 'false').toLowerCase() === 'true', // Whether to use viber APAC sandbox

    // Use Mock
    useMockSms: (process.env.USE_MOCK_SMS || 'false').toLowerCase() === 'true', // Whether to use Mock SMS Endpoint
    useMockWhatsapp: (process.env.USE_MOCK_WHATSAPP || 'false').toLowerCase() === 'true', // Whether to use Mock Whatsapp Endpoint
    useMockViber: (process.env.USE_MOCK_VIBER || 'false').toLowerCase() === 'true', // Whether to use Mock Viber Endpoint
    useMockVoice: (process.env.USE_MOCK_VOICE || 'false').toLowerCase() === 'true', // Whether to use Mock Voice Endpoint
    useMockNumberInsight: (process.env.USE_MOCK_NUMBER_INSIGHT || 'false').toLowerCase() === 'true', // Whether to use Mock Number Insight Endpoint
  },
  database: {
    name: process.env.DATABASE_NAME || '', // Database Name/Schema
    username: process.env.DATABASE_USERNAME || '', // Database Username
    password: process.env.DATABASE_PASSWORD || '', // Database Password
    host: process.env.DATABASE_HOST || '', // Database Host
    port: process.env.DATABASE_PORT || 3306, // Database Port
    dialect: (process.env.DATABASE_DIALECT || 'mysql').toLowerCase(), // [mysql] Database Dialect
    useSsl: (process.env.DATABASE_USE_SSL || 'false').toLowerCase() === 'true', // Whether to use SSL for database connection
    logging: (process.env.DATABASE_LOGGING || 'false').toLowerCase() === 'true', // Whether to log SQL queries
  },
  logger: {
    logToFile: (process.env.LOG_TO_FILE || 'false').toLowerCase() === 'true', // Whether to log to file (no automated file rotation)
    logToConsole: (process.env.LOG_TO_CONSOLE || 'true').toLowerCase() === 'true', // Whether to log to console
    logFile: process.env.LOG_FILE, // File to save the logs
    logLevel: process.env.LOGGING_LEVEL || 'info', // [trace / debug / info / warn / error] Log Levels
  },
  enableSequelizeLog: false,
  forceSequelizeSync: false,
  define: {
    timestamps: false,
  },
};
