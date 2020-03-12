import User from './user';
import UserRole from './userrole';
import CmpApiKey from './cmpapikey';
import CmpApplication from './cmpapplication';
import CmpChannel from './cmpchannel';
import CmpTemplate from './cmptemplate';
import CmpMedia from './cmpmedia';
import CmpParameter from './cmpparameter';
import CmpRecord from './cmprecord';
import CmpCampaign from './cmpcampaign';
import CmpCampaignStatusAudit from './cmpcampaignstatusaudit';
import CmpRecordMessage from './cmprecordmessage';
import CmpRecordMessageStatusAudit from './cmprecordmessagestatusaudit';
import CmpReport from './cmpreport';

import CmpMediaText from './cmpmediatext';
import CmpMediaImage from './cmpmediaimage';
import CmpMediaAudio from './cmpmediaaudio';
import CmpMediaVideo from './cmpmediavideo';
import CmpMediaFile from './cmpmediafile';
import CmpMediaLocation from './cmpmedialocation';

import CmpRecordMessageStatusAuditMapi from './cmprecordmessagestatusauditmapi';
import CmpRecordMessageStatusAuditSms from './cmprecordmessagestatusauditsms';

export default container => ({
  User: User(container),
  UserRole: UserRole(container),
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

  CmpMediaText: CmpMediaText(container),
  CmpMediaImage: CmpMediaImage(container),
  CmpMediaAudio: CmpMediaAudio(container),
  CmpMediaVideo: CmpMediaVideo(container),
  CmpMediaFile: CmpMediaFile(container),
  CmpMediaLocation: CmpMediaLocation(container),

  CmpRecordMessageStatusAuditMapi: CmpRecordMessageStatusAuditMapi(container),
  CmpRecordMessageStatusAuditSms: CmpRecordMessageStatusAuditSms(container),
});
