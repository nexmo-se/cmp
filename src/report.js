/**
 * Actual Entry point for Reporter
 */

import container from './container';

const { L } = container.defaultLogger('Report App');

const checkLogLevels = () => {
  container.logger.debug('LOG LEVEL CHECK: DEBUG');
  container.logger.info('LOG LEVEL CHECK: INFO');
  container.logger.warn('LOG LEVEL CHECK: WARN');
  container.logger.error('LOG LEVEL CHECK: ERROR');
};

const start = async () => {
  try {
    checkLogLevels();
    await container.reportProcess.run(); // in src/processes
    return Promise.resolve();
  } catch (error) {
    container.logger.error(error.message, error);
    return Promise.reject(error);
  }
};

L.info('Report Started');
start().then(() => {
  L.info('Report Ended');
  L.info('Ending Report Process - NORMAL');
  process.exit(0);
});
