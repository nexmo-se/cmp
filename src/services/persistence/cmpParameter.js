export default (container) => {
  const { L } = container.defaultLogger('Cmp Parameter Persistence Accessor');

  const listParameters = async () => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameters = await CmpParameter.listParameters();
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createParameterBatch = async (parameters) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameters = await CmpParameter.createParameterBatch(parameters);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createParameter = async (
    cmpRecordId,
    parameter,
    order,
  ) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameter = await CmpParameter.createParameter(
        cmpRecordId,
        parameter,
        order,
      );
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readParameter = async (cmpParameterId) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameter = await CmpParameter.readParameter(cmpParameterId);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateParameter = async (cmpParameterId, changes) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameter = await CmpParameter.updateParameter(
        cmpParameterId, changes,
      );
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateParameters = async (criteria, changes) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameters = await CmpParameter.updateParameters(criteria, changes);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameter = async (cmpParameterId) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameter = await CmpParameter.deleteParameter(cmpParameterId);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameters = async (criteria) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameters = await CmpParameter.deleteParameters(criteria);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listParameters,

    createParameter,
    createParameterBatch,
    readParameter,

    updateParameter,
    updateParameters,

    deleteParameter,
    deleteParameters,
  };
};
