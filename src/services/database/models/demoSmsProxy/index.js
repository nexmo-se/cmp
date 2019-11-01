export default () => {
  const getModels = (sequelizeClient) => {
    const models = {};
    models.Pairing = sequelizeClient.import('./pairing');
    return models;
  };

  return {
    getModels,
  };
};
