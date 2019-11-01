const fs = require('fs');
const path = require('path');

export default (container) => {
  const { log4js } = container;
  const { configure, getLogger } = log4js;
  const env = container.config.environment;
  const logsFolderDir = path.normalize('logs/');
  const logConfig = container.config.log4js;
  if (!fs.existsSync(logsFolderDir)) {
    fs.mkdirSync(logsFolderDir);
  }

  function buildLog(logger) {
    configure(logConfig);
    return {
      L: getLogger(logger),
      // slack: getLogger('slackLogger') todo need configurations
    };
  }

  return buildLog;
};
