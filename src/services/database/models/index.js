import ExampleModels from './example';
import SmsProxyModels from './demoSmsProxy';

export default () => {
  const models = {};

  // Setup Model Generators
  const modelGenerator = {};
  modelGenerator.example = ExampleModels();
  modelGenerator.SmsProxy = SmsProxyModels();

  const getModels = (sequelizeClient, demoName) => {
    if (models[demoName] == null) {
      if (modelGenerator[demoName] == null) {
        // Model Generator not available
        return {};
      }

      models[demoName] = modelGenerator[demoName].getModels(sequelizeClient);
    }
    return models[demoName];
  };

  return {
    getModels,
  };
};
