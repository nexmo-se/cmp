export default (container) => {
  const { L } = container.defaultLogger('Cmp Report Persistence Accessor');

  const mapReport = (report) => {
    const reportData = report;

    if (report.type === 'overall_summary') {
      reportData.content = report.cmpReportOverallSummary;
    } else if (report.type === 'campaign_summary') {
      reportData.content = report.cmpReportCampaignSummary;
    } else if (report.type === 'campaign_detail') {
      reportData.content = report.cmpReportCampaignDetail;
    }

    return reportData;
  };

  const listReports = async (options = {}) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.listReports(options);
      const mappedCmpReports = cmpReports.map(mapReport);
      return Promise.resolve(mappedCmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReport = async (criteria) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.findReport(criteria, true);
      const mappedCmpReport = mapReport(cmpReport);
      return Promise.resolve(mappedCmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findReports = async (criteria, options = {}) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.findReports(criteria, true, options);
      const mappedCmpReports = cmpReports.map(mapReport);
      return Promise.resolve(mappedCmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createOverallSummary = async (
    type, name, content,
  ) => {
    try {
      const { CmpReport, CmpReportOverallSummary } = container.databaseService.accessors;

      // Create Media Text
      const { from, to } = content;
      const cmpReportOverallSummary = await CmpReportOverallSummary
        .createReportOverallSummary(from, to);
      const cmpReportOverallSummaryId = cmpReportOverallSummary.id;

      // Create Media
      const cmpReport = await CmpReport.createReport(
        type,
        name,
        cmpReportOverallSummaryId,
        null,
        null,
      );
      const mappedReport = mapReport(cmpReport);
      return Promise.resolve(mappedReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createCampaignSummary = async (
    type, name, content,
  ) => {
    try {
      const { CmpReport, CmpReportCampaignSummary } = container.databaseService.accessors;

      // Create Media Text
      const { cmpCampaignId, from, to } = content;
      const cmpReportCampaignSummary = await CmpReportCampaignSummary
        .createReportCampaignSummary(cmpCampaignId, from, to);
      const cmpReportCampaignSummaryId = cmpReportCampaignSummary.id;

      // Create Media
      const cmpReport = await CmpReport.createReport(
        type,
        name,
        null,
        cmpReportCampaignSummaryId,
        null,
      );
      const mappedReport = mapReport(cmpReport);
      return Promise.resolve(mappedReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createCampaignDetail = async (
    type, name, content,
  ) => {
    try {
      const { CmpReport, CmpReportCampaignDetail } = container.databaseService.accessors;

      // Create Media Text
      const { cmpCampaignId, from, to } = content;
      const cmpReportCampaignDetail = await CmpReportCampaignDetail
        .createReportCampaignDetail(cmpCampaignId, from, to);
      const cmpReportCampaignDetailId = cmpReportCampaignDetail.id;

      // Create Media
      const cmpReport = await CmpReport.createReport(
        type,
        name,
        null,
        null,
        cmpReportCampaignDetailId,
      );
      const mappedReport = mapReport(cmpReport);
      return Promise.resolve(mappedReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readReport = async (cmpReportId) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.readReport(cmpReportId);
      const mappedCmpReport = mapReport(cmpReport);
      return Promise.resolve(mappedCmpReport);
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
      const mappedCmpReport = mapReport(cmpReport);
      return Promise.resolve(mappedCmpReport);
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
      const mappedCmpReports = cmpReports.map(mapReport);
      return Promise.resolve(mappedCmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReport = async (cmpReportId) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.deleteReport(cmpReportId);
      const mappedCmpReport = mapReport(cmpReport);
      return Promise.resolve(mappedCmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReports = async (criteria) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.deleteReports(criteria);
      const mappedCmpReports = cmpReports.map(mapReport);
      return Promise.resolve(mappedCmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listReports,

    createOverallSummary,
    createCampaignSummary,
    createCampaignDetail,

    readReport,

    updateReport,
    updateReports,

    deleteReport,
    deleteReports,

    findReport,
    findReports,
  };
};
