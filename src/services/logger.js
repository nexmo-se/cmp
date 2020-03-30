const fs = require('fs');
const path = require('path');

export default (container) => {
  const { log4js } = container;
  const { configure, getLogger } = log4js;
  const {
    logToFile, logToConsole, logFile, logLevel,
  } = container.config.logger;

  const logsFolderDir = path.normalize('logs/');
  const appenders = {};

  if (logToConsole) {
    appenders.out = {
      type: 'stdout',
    };
  }

  if (logToFile) {
    let sanitizedLogFile = logFile;
    if (sanitizedLogFile == null || sanitizedLogFile === '') {
      sanitizedLogFile = 'log.log';
    }

    appenders.everything = {
      type: 'dateFile',
      filename: `${logsFolderDir}${sanitizedLogFile}`,
    };
  }

  const logConfig = {
    appenders,
    categories: {
      default: {
        appenders: Object.keys(appenders),
        level: logLevel,
      },
    },
  };

  // Check Folder Existence
  if (!fs.existsSync(logsFolderDir)) {
    fs.mkdirSync(logsFolderDir);
  }

  function buildLog(logger) {
    configure(logConfig);
    return {
      L: getLogger(logger),
    };
  }

  return buildLog;
};
