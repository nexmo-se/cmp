import SummaryReporter from './summary';
import CampaignDetailReporter from './campaignDetail';

export default (container) => {
  const { L } = container.defaultLogger('Cmp Template Controller');

  const summaryReporter = SummaryReporter(container);
  const campaignDetailReporter = CampaignDetailReporter(container);

  const ReportTypes = {
    overallSummary: 'overall_summary',
    campaignSummary: 'campaign_summary',
    campaignDetail: 'campaign_detail',
  };
  const ReportGenerators = {
    [ReportTypes.overallSummary]: summaryReporter.getOverall,
    [ReportTypes.campaignSummary]: summaryReporter.getCampaign,
    [ReportTypes.campaignDetail]: campaignDetailReporter.getCampaign,
  };

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

      if (type == null) {
        throw new container.BadRequestError('Invalid report type');
      }

      const reportGenerator = ReportGenerators[type];
      if (reportGenerator == null) {
        throw new container.BadRequestError('Invalid report type');
      }

      const report = await reportGenerator(content);
      res.json(report);
    } catch (error) {
      next(error);
    }
  };

  const createCsvReport = async (req, res, next) => {
    try {
      const { type, name, content } = req.body;
      const { CmpReport } = container.persistenceService;
      const cmpReport = await CmpReport.createReport(type, name, content);
      res.json(cmpReport);
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

  const getReportArchive = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Reports');
      const { fileName } = req.params;
      const { filePath } = container.config.report;

      const fullPath = `${filePath}/${fileName}`;
      res.sendFile(fullPath);
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

    getReportArchive,
  };
};
