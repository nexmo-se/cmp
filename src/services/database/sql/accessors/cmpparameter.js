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
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpParameter = mapCmpParameter(rawCmpParameter);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpParameter,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpParameters = await CmpParameter.findAll(query);
      const cmpParameters = rawCmpParameters
        .map(cmpParameter => mapCmpParameter(cmpParameter));
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpParameters = await getByCriteria(criteria, excludeDeleted);
      if (cmpParameters == null || cmpParameters.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpParameter = cmpParameters[0];
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpParameterId, changes = {}, excludeDeleted = true,
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
      L.debug('CmpParameter Update Result', result);

      const cmpParameter = await getById(cmpParameterId, excludeDeleted);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpParameter } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpParameter.update(changes, query);
      L.debug('CmpParameter Update Result', result);

      const cmpParameters = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpParameters);
    } catch (error) {
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

  const listParameters = async () => {
    try {
      const cmpParameters = await getByCriteria({}, true);
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

  const updateParameter = async (cmpParameterId, changes) => {
    try {
      const cmpParameter = await updateById(cmpParameterId, changes, true);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateParameters = async (criteria, changes) => {
    try {
      const cmpParameters = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpParameters);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameter = async (cmpParameterId) => {
    try {
      const changes = { deleted: true };
      const cmpParameter = await updateById(cmpParameterId, changes, true);
      return Promise.resolve(cmpParameter);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteParameters = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpParameters = await updateByCriteria(criteria, changes, true);
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

  const findParameters = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpParameters = await getByCriteria(criteria, excludeDeleted);
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
