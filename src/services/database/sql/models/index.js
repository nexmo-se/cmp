export default (container) => {
  const { fs, path } = container;
  const { L } = container.defaultLogger('SQL Database Models');

  const getModels = (sequelizeClient) => {
    const fileNames = fs.readdirSync(path.resolve(__dirname));
    const modelFiles = fileNames.map(fileName => path.resolve(__dirname, fileName))
      .filter(fileName => fileName !== __filename);

    const models = {};
    for (let i = 0; i < modelFiles.length; i += 1) {
      const modelFile = modelFiles[i];

      L.debug(`Importing model: ${modelFile}`);
      const model = sequelizeClient.import(modelFile);

      const modelName = model.name;
      models[modelName] = model;
    }

    return models;
  };

  return {
    getModels,
  };
};