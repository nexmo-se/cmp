/**
 * Actual Entry point for Blaster
 */

import container from './container';

const { L } = container.defaultLogger('Blaster App');

const checkLogLevels = () => {
  container.logger.debug('LOG LEVEL CHECK: DEBUG');
  container.logger.info('LOG LEVEL CHECK: INFO');
  container.logger.warn('LOG LEVEL CHECK: WARN');
  container.logger.error('LOG LEVEL CHECK: ERROR');
};

const start = async () => {
  try {
    checkLogLevels();
    await container.blasterProcess.run(); // in src/processes
    return Promise.resolve();
  } catch (error) {
    container.logger.error(error.message, error);
    return Promise.reject(error);
  }
};

L.info('Blaster Started');
start().then(() => {
  L.info('Blaster Ended');
  L.info('Ending Blaster Process - NORMAL');
  process.exit(0);
});
