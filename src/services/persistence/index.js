/**
 * Persistence Service
 * A higher level service to manage the persistence of data into the database
 */

 import User from './user';
import CmpApiKey from './cmpApiKey';
import CmpApplication from './cmpApplication';
import CmpChannel from './cmpChannel';
import CmpTemplate from './cmpTemplate';
import CmpMedia from './cmpMedia';
import CmpParameter from './cmpParameter';
import CmpRecord from './cmpRecord';
import CmpCampaign from './cmpCampaign';
import CmpCampaignStatusAudit from './cmpCampaignStatusAudit';
import CmpRecordMessage from './cmpRecordMessage';
import CmpRecordMessageStatusAudit from './cmpRecordMessageStatusAudit';
import CmpReport from './cmpReport';
import CmpVoice from './cmpVoice';

export default container => ({
  User: User(container),
  CmpApiKey: CmpApiKey(container),
  CmpApplication: CmpApplication(container),
  CmpChannel: CmpChannel(container),
  CmpTemplate: CmpTemplate(container),
  CmpMedia: CmpMedia(container),
  CmpParameter: CmpParameter(container),
  CmpRecord: CmpRecord(container),
  CmpCampaign: CmpCampaign(container),
  CmpCampaignStatusAudit: CmpCampaignStatusAudit(container),
  CmpRecordMessage: CmpRecordMessage(container),
  CmpRecordMessageStatusAudit: CmpRecordMessageStatusAudit(container),
  CmpReport: CmpReport(container),
  CmpVoice: CmpVoice(container),
});
