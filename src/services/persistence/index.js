import User from './user';
import CmpApiKey from './cmpApiKey';
import CmpApplication from './cmpApplication';
import CmpChannel from './cmpChannel';
import CmpTemplate from './cmpTemplate';
import CmpMedia from './cmpMedia';
import CmpParameter from './cmpParameter';
import CmpRecord from './cmpRecord';
import CmpCampaign from './cmpCampaign';

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
});
