/**
 * Report After the Blast
 */

import SmsDetails from './campaignDetailSms';
import MapiDetails from './campaignDetailMapi';
import VapiDetails from './campaignDetailVapi';
import NiDetails from './campaignDetailNi';

export default (container) => {
  const { L } = container.defaultLogger('Report Process - Campaign Detail');

  const smsDetails = SmsDetails(container);
  const mapiDetails = MapiDetails(container);
  const vapiDetails = VapiDetails(container);
  const niDetails = NiDetails(container);

  // Get the type of campaign, so that a different report can be generated
  const getCampaignType = async (cmpCampaignId) => {
    try {
      // TODO: Check Campaign Type
      const { CmpCampaign } = container.persistenceService;
      const campaign = await CmpCampaign.readCampaign(cmpCampaignId);
      const { campaignType } = campaign;
      return Promise.resolve(campaignType);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Generate different report based on campaign types
  const generateCampaign = async (cmpCampaignId, filePath) => {
    try {
      // Get Campaign Type
      const campaignType = await getCampaignType(cmpCampaignId);

      // Generate Based on Type
      if (campaignType === 'sms') {
        L.debug('Generating SMS Report');
        return smsDetails.generateCampaign(cmpCampaignId, filePath);
      } else if (campaignType === 'viber' || campaignType === 'whatsapp' || campaignType === 'facebook') {
        L.debug('Generating MAPI Report');
        return mapiDetails.generateCampaign(cmpCampaignId, filePath);
      } else if (campaignType === 'voice') {
        L.debug('Generating VAPI Report');
        return vapiDetails.generateCampaign(cmpCampaignId, filePath);
      } else if (campaignType === 'number_insight') {
        L.debug('Generating NI Report');
        return niDetails.generateCampaign(cmpCampaignId, filePath);
      } else {
        // Generic, fallback to SMS
        L.debug('Unknown Campaign Type, fallback to Generating SMS Report');
        return smsDetails.generateCampaign(cmpCampaignId, filePath);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    generateCampaign,
  };
};
