import ModelGenerator from './models';
import ModelAccessors from './accessors';

export default (container) => {
  const { L } = container.defaultLogger('SQL Database Service');
  const modelGenerator = ModelGenerator(container);

  const createClient = () => {
    const {
      name, username, password, host, port, dialect, useSsl, logging,
    } = container.config.database;

    // Setup Config
    const config = {
      host,
      port,
      dialect,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging,
    };
    if (useSsl) {
      config.dialectOptions = { ssl: true };
    }

    // Create Client
    const sequelizeClient = new container.Sequelize(name, username, password, config);
    return sequelizeClient;
  };

  // Database name should be 'demo{demoName}'
  const getClient = () => {
    if (client == null) {
      // Creating Client
      client = createClient();

      // Import Models
      models = modelGenerator.getModels(client);

      // Establish Associations
      Object.keys(client.models).forEach((m) => {
        const model = client.models[m];
        if (model.associate) {
          L.info(`Set association for model ${model.name}`);
          model.associate(models);
        }
      });
    }

    return client;
  };

  let client = null;
  let models = {};
  let accessors = {};

  client = getClient();
  accessors = ModelAccessors(container);

  return {
    client,
    models,
    accessors,
  };
};
