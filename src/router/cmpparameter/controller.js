export default (container) => {
  const { L } = container.defaultLogger('Cmp Parameter Controller');

  const listAllParameters = async (req, res, next) => {
    try {
      const { CmpParameter } = container.persistenceService;
      const cmpParameters = await CmpParameter.listParameters();
      res.status(200).json(cmpParameters);
    } catch (error) {
      next(error);
    }
  };

  const listMyParameters = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Parameters');
      const { CmpParameter } = container.persistenceService;
      const cmpParameters = await CmpParameter.listParameters();
      res.status(200).json(cmpParameters);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllParameters = async (req, res, next) => {
    try {
      const { CmpParameter } = container.persistenceService;
      const cmpParameters = await CmpParameter.deleteParameters({});
      res.status(200).json(cmpParameters);
    } catch (error) {
      next(error);
    }
  };

  const createParameter = async (req, res, next) => {
    try {
      const {
        cmpRecordId,
        parameter,
        order,
      } = req.body;
      const { CmpParameter } = container.persistenceService;

      const cmpParameter = await CmpParameter.createParameter(
        cmpRecordId, parameter, order,
      );
      res.status(200).json(cmpParameter);
    } catch (error) {
      next(error);
    }
  };

  const readParameter = async (req, res, next) => {
    try {
      const { cmpParameterId } = req.params;
      const { CmpParameter } = container.persistenceService;

      const cmpParameter = await CmpParameter.readParameter(cmpParameterId);
      res.status(200).json(cmpParameter);
    } catch (error) {
      next(error);
    }
  };

  const readMyParameter = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Parameters');
      const { cmpParameterId } = req.params;
      const { CmpParameter } = container.persistenceService;

      const cmpParameter = await CmpParameter.readParameter(cmpParameterId);
      res.status(200).json(cmpParameter);
    } catch (error) {
      next(error);
    }
  };

  const deleteParameter = async (req, res, next) => {
    try {
      const { cmpParameterId } = req.params;
      const { CmpParameter } = container.persistenceService;
      const cmpParameter = await CmpParameter.deleteParameter(cmpParameterId);
      res.status(200).json(cmpParameter);
    } catch (error) {
      next(error);
    }
  };

  return {
    listAllParameters,
    listMyParameters,
    deleteAllParameters,

    createParameter,
    readParameter,
    readMyParameter,

    deleteParameter,
  };
};
