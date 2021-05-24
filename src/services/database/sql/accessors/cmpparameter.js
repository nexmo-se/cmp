/**
  Accessor Service for CMP Record Parameters
 * Create, Read, Update, Delete and List Record Parameters
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Parameter Model Accessor');

  const getById = async (cmpParameterId, excludeDeleted = true) => {
    try {
      const {
        CmpParameter,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpParameterId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpParameter = await CmpParameter.findOne(query);
      if (rawCmpParameter == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpParameter = mapCmpParameter(rawCmpParameter);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpParameterId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpParameter,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['order', 'ASC'],
          ['createdAt', 'ASC'],
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpParameters = await CmpParameter.findAll(query);
      const cmpParameters = rawCmpParameters
        .map(cmpParameter => mapCmpParameter(cmpParameter));
      return Promise.resolve(cmpParameters);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpParameters = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpParameters == null || cmpParameters.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpParameter = cmpParameters[0];
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpParameterId, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpParameter } = container.databaseService.models;
      const query = {
        where: {
          id: cmpParameterId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpParameter.update(changes, query);
      L.trace('CmpParameter Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpParameter = await getById(cmpParameterId, excludeDeleted);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpParameterId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpParameter } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpParameter.update(changes, query);
      L.trace('CmpParameter Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpParameters = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpParameter = (cmpParameter) => {
    const mappedCmpParameter = cmpParameter.dataValues;

    delete mappedCmpParameter.deleted;
    delete mappedCmpParameter.createdAt;
    delete mappedCmpParameter.updatedAt;

    return mappedCmpParameter;
  };

  const listParameters = async (options = {}) => {
    try {
      const cmpParameters = await getByCriteria({}, true, options);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createParameterBatch = async (parameters) => {
    try {
      const { CmpParameter } = container.databaseService.models;
      const creatableParameters = parameters.map(parameterObj => ({
        id: container.uuid(),
        cmpRecordId: parameterObj.cmpRecordId,
        parameter: parameterObj.parameter,
        order: parameterObj.order,
        deleted: false,
      }));
      const rawCmpParameters = await CmpParameter.bulkCreate(creatableParameters);
      const cmpParameters = rawCmpParameters.map(mapCmpParameter);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createParameterBatch(parameters);
      }
      return Promise.reject(error);
    }
  };

  const createParameter = async (
    cmpRecordId,
    parameter,
    order,
  ) => {
    try {
      const { CmpParameter } = container.databaseService.models;
      const rawCmpParameter = await CmpParameter.create({
        id: container.uuid(),
        cmpRecordId,
        parameter,
        order,
        deleted: false,
      });

      const cmpParameter = mapCmpParameter(rawCmpParameter);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createParameter(cmpRecordId, parameter, order);
      }
      return Promise.reject(error);
    }
  };

  const readParameter = async (cmpParameterId) => {
    try {
      const cmpParameter = await getById(cmpParameterId, false);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateParameter = async (cmpParameterId, changes, options = {}) => {
    try {
      const cmpParameter = await updateById(cmpParameterId, changes, true, options);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateParameters = async (criteria, changes, options = {}) => {
    try {
      const cmpParameters = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameter = async (cmpParameterId, options = {}) => {
    try {
      const changes = { deleted: true };
      const cmpParameter = await updateById(cmpParameterId, changes, true, options);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameters = async (criteria = {}, options = {}) => {
    try {
      const changes = { deleted: true };
      const cmpParameters = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findParameter = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpParameter = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findParameters = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpParameters = await getByCriteria(criteria, excludeDeleted, options);
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

    findParameter,
    findParameters,
  };
};
