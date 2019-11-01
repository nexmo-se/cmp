import Models from './models';

export default (container) => {
  const clients = {};
  const models = Models();

  const createClient = (userNexmo, database) => {
    const host = userNexmo.dbhost;
    const username = userNexmo.dbuser;
    const password = userNexmo.dbpassword;
    const client = new container.Sequelize('heroku_4637099e192205a', username, password, {
      host,
      dialect: 'mysql',
      pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    return client;
  };

  // Database name should be 'demo{demoName}'
  const getClient = (userNexmo, demoName) => {
    const databaseName = `demo${demoName}`;

    if (clients[databaseName] == null) {
      // Creating Client
      const sequelizeClient = createClient(userNexmo, databaseName);

      // Import Models
      const demoModels = models.getModels(sequelizeClient, demoName);

      // Establish Associations
      Object.keys(sequelizeClient.models).forEach((m) => {
        const model = sequelizeClient.models[m];
        if (model.associate) {
          console.log(`Set association for model ${model.name}`);
          model.associate(model, sequelizeClient.models);
        }
      });

      // Add to Memory
      clients[databaseName] = {
        sequelize: sequelizeClient,
        models: demoModels,
      };
    }

    return clients[databaseName];
  };

  return {
    getClient,
  };
};
