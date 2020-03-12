export default (container) => {
  const { L } = container.defaultLogger('Cmp Template Controller');

  const findAllReports = async (req, res, next) => {
    try {
      const {
        limit, offset,
        type, status,
      } = req.body;
      const criteria = {};
      if (type) {
        criteria.type = type;
      }

      if (status) {
        criteria.status = status;
      }

      const options = { limit, offset };
      const { CmpReport } = container.persistenceService;
      const cmpReports = await CmpReport.findReports(criteria, options);
      res.status(200).json(cmpReports);
    } catch (error) {
      next(error);
    }
  };

  const findMyReports = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Reports');
      const {
        limit, offset,
        type, status,
      } = req.body;
      const criteria = {};
      if (type) {
        criteria.type = type;
      }

      if (status) {
        criteria.status = status;
      }

      const options = { limit, offset };
      const { CmpReport } = container.persistenceService;
      const cmpReports = await CmpReport.findReports(criteria, options);
      res.status(200).json(cmpReports);
    } catch (error) {
      next(error);
    }
  };

  const listAllReports = async (req, res, next) => {
    try {
      const {
        limit, offset,
        type, status,
      } = req.query;
      const criteria = {};
      if (type) {
        criteria.type = type;
      }

      if (status) {
        criteria.status = status;
      }

      const options = { limit, offset };
      const { CmpReport } = container.persistenceService;
      const cmpReports = await CmpReport.findReports(criteria, options);
      res.status(200).json(cmpReports);
    } catch (error) {
      next(error);
    }
  };

  const listMyReports = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Reports');
      const {
        limit, offset,
        type, status,
      } = req.query;
      const criteria = {};
      if (type) {
        criteria.type = type;
      }

      if (status) {
        criteria.status = status;
      }

      const options = { limit, offset };
      const { CmpReport } = container.persistenceService;
      const cmpReports = await CmpReport.findReports(criteria, options);
      res.status(200).json(cmpReports);
    } catch (error) {
      next(error);
    }
  };

  const createJsonReport = async (req, res, next) => {
    try {
      const { type, content } = req.body;
      const { CmpReport } = container.persistenceService;
      // res.status(200).json({});
      res.status(500).send('Not implement, coming soon');
    } catch (error) {
      next(error);
    }
  };

  const createCsvReport = async (req, res, next) => {
    try {
      const { type, name, content } = req.body;
      const { CmpReport } = container.persistenceService;
      // const cmpReport = await CmpReport.createReport(type, name);
      // res.status(200).json({});
      res.status(500).send('Not implemented, coming soon');
    } catch (error) {
      next(error);
    }
  };

  const readReport = async (req, res, next) => {
    try {
      const { cmpReportId } = req.params;
      const { CmpReport } = container.persistenceService;

      const cmpReport = await CmpReport.readReport(cmpReportId);
      res.status(200).json(cmpReport);
    } catch (error) {
      next(error);
    }
  };

  const readMyReport = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Reports');
      const { cmpReportId } = req.params;
      const { CmpReport } = container.persistenceService;

      const cmpReport = await CmpReport.readReport(cmpReportId);
      res.status(200).json(cmpReport);
    } catch (error) {
      next(error);
    }
  };

  return {
    findAllReports,
    findMyReports,

    listAllReports,
    listMyReports,

    createJsonReport,
    createCsvReport,

    readReport,
    readMyReport,
  };
};
