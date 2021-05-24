/**
 * Persistence Service for CMP Reports
 * Create, Read, Update, Delete and List Reports
 * This Report is actually a request to generate new custom report (not the automated one after blasting)
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Report Persistence Accessor');

  const ReportTypes = {
    overallSummary: 'overall_summary',
    campaignSummary: 'campaign_summary',
    campaignDetail: 'campaign_detail',
  };

  const mapReport = (report) => {
    if (report == null) {
      return null;
    }

    const reportData = report;

    if (report.type === ReportTypes.overallSummary) {
      reportData.content = report.cmpReportOverallSummary;
    } else if (report.type === ReportTypes.campaignSummary) {
      reportData.content = report.cmpReportCampaignSummary;
    } else if (report.type === ReportTypes.campaignDetail) {
      reportData.content = report.cmpReportCampaignDetail;
    }

    if (reportData.url === '') {
      delete reportData.url;
    }

    delete reportData.cmpReportOverallSummaryId;
    delete reportData.cmpReportCampaignSummaryId;
    delete reportData.cmpReportCampaignDetailId;
    delete reportData.cmpReportOverallSummary;
    delete reportData.cmpReportCampaignSummary;
    delete reportData.cmpReportCampaignDetail;

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

  const createReport = async (
    type, name, content,
  ) => {
    try {
      let report;
      if (type === ReportTypes.overallSummary) {
        report = await createOverallSummary(type, name, content);
      } else if (type === ReportTypes.campaignSummary) {
        report = await createCampaignSummary(type, name, content);
      } else if (type === ReportTypes.campaignDetail) {
        report = await createCampaignDetail(type, name, content);
      } else {
        throw new container.BadRequestError('Unknown Report Type');
      }
      return Promise.resolve(report);
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

  const updateReport = async (cmpReportId, changes, options = {}) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.updateReport(
        cmpReportId, changes, options,
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

  const deleteReport = async (cmpReportId, options = { noGet: true }) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReport = await CmpReport.deleteReport(cmpReportId, options);
      const mappedCmpReport = mapReport(cmpReport);
      return Promise.resolve(mappedCmpReport);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteReports = async (criteria, options = { noGet: true }) => {
    try {
      const { CmpReport } = container.databaseService.accessors;
      const cmpReports = await CmpReport.deleteReports(criteria, options);
      const mappedCmpReports = cmpReports.map(mapReport);
      return Promise.resolve(mappedCmpReports);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listReports,

    createReport,
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
