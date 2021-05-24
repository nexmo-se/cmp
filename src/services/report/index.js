/**
 * Report Service
 * Generates various reports
 */

import Summary from './summary';
import CampaignDetail from './campaignDetail';

export default (container) => {
  const { L } = container.defaultLogger('Report Service');

  return {
    summary: Summary(container),
    campaignDetail: CampaignDetail(container),
  };
};
