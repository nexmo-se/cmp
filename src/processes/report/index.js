import SummaryReporter from './summary';
import CampaignDetailReporter from './campaignDetail';

export default (container) => {
  const { L } = container.defaultLogger('Report Process');

  const summaryReporter = SummaryReporter(container);
  const campaignDetailReporter = CampaignDetailReporter(container);

  const ReportTypes = {
    overallSummary: 'overall_summary',
    campaignSummary: 'campaign_summary',
    campaignDetail: 'campaign_detail',
  };
  const ReportGenerators = {
    [ReportTypes.overallSummary]: summaryReporter.generateOverall,
    [ReportTypes.campaignSummary]: summaryReporter.generateCampaign,
    [ReportTypes.campaignDetail]: campaignDetailReporter.generateCampaign,
  };

  const wait = duration => new Promise(resolve => setTimeout(resolve, duration));

  const runSingle = async () => {
    try {
      L.trace('Meow');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const runIndefinitely = async (reportTime) => {
    try {
      // Wait
      const currentTime = new Date().getTime();
      const waitTime = reportTime - currentTime;
      if (waitTime > 0) {
        const waitStart = new Date().getTime();
        await wait(waitTime);
        const waitEnd = new Date().getTime();
        L.debug(`Time Taken (Wait): ${waitEnd - waitStart}ms`);
      }

      L.trace('Wait Over');

      const startTime = new Date().getTime();
      await runSingle();
      const endTime = new Date().getTime();
      L.debug(`Time Taken (Iteration): ${endTime - startTime}ms`);

      const nextReportTime = endTime + (container.config.report.delay * 1000);
      return runIndefinitely(nextReportTime);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const run = async () => {
    try {
      // Check if Process Active Hour is OK
      const startTime = new Date();
      L.info(`Report Process started at ${startTime}`);

      await runIndefinitely(new Date().getTime(), 0);

      const endTime = new Date();
      L.info(`Report Process ended at ${endTime}`);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    run,
  };
};
