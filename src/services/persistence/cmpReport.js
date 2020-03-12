export default (container) => {
  const { L } = container.defaultLogger('Cmp Report Persistence Accessor');

  const listReports = async (options = {}) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.listReports(options);
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReport = async (criteria) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.findReport(criteria, true);
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReports = async (criteria, options = {}) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.findReports(criteria, true, options);
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createReport = async (
    type,
    name,
  ) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.createReport(
        type,
        name,
      );
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readReport = async (cmpReportId) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.readReport(cmpReportId);
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReport = async (cmpReportId, changes) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.updateReport(
        cmpReportId, changes,
      );
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateReports = async (criteria, changes, options = {}) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.updateReports(
        criteria, changes, options,
      );
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReport = async (cmpReportId) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.deleteReport(cmpReportId);
      return Promise.resolve(cmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReports = async (criteria) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.deleteReports(criteria);
      return Promise.resolve(cmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listReports,

    createReport,
    readReport,

    updateReport,
    updateReports,

    deleteReport,
    deleteReports,

    findReport,
    findReports,
  };
};
