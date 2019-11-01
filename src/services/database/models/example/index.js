export default () => {
  const getModels = (sequelizeClient) => {
    const models = {};
    models.Example = sequelizeClient.import('./user');
    return models;
  };

  return {
    getModels,
  };
};
