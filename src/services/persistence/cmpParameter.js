/**
 * Persistence Service for CMP Record Parameters
 * Create, Read, Update, Delete and List Record Parameters
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Parameter Persistence Accessor');

  const listParameters = async (options = {}) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameters = await CmpParameter.listParameters(options);
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

  const updateParameter = async (cmpParameterId, changes, options = {}) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameter = await CmpParameter.updateParameter(
        cmpParameterId, changes, options,
      );
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateParameters = async (criteria, changes, options = {}) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameters = await CmpParameter.updateParameters(criteria, changes, options);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameter = async (cmpParameterId, options = { noGet: true }) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameter = await CmpParameter.deleteParameter(cmpParameterId, options);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameters = async (criteria, options = { noGet: true }) => {
    try {
      const { CmpParameter } = container.databaseService.accessors;
      const cmpParameters = await CmpParameter.deleteParameters(criteria, options);
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
