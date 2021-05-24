/**
 * Actual Entry point for Picker
 */

import container from './container';

const { L } = container.defaultLogger('Picker App');

const checkLogLevels = () => {
  container.logger.debug('LOG LEVEL CHECK: DEBUG');
  container.logger.info('LOG LEVEL CHECK: INFO');
  container.logger.warn('LOG LEVEL CHECK: WARN');
  container.logger.error('LOG LEVEL CHECK: ERROR');
};

const start = async () => {
  try {
    checkLogLevels();
    await container.pickerProcess.run(); // in src/processes
    return Promise.resolve();
  } catch (error) {
    container.logger.error(error.message, error);
    return Promise.reject(error);
  }
};

L.info('Picker Started');
start().then(() => {
  L.info('Picker Ended');
  L.info('Ending Picker Process - NORMAL');
  process.exit(0);
});
