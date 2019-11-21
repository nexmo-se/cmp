import User from './user';
import UserRole from './userrole';
import CmpApiKey from './cmpapikey';
import CmpApplication from './cmpapplication';
import CmpChannel from './cmpchannel';
import CmpTemplate from './cmptemplate';
import CmpMedia from './cmpmedia';

export default container => ({
  User: User(container),
  UserRole: UserRole(container),
  CmpApiKey: CmpApiKey(container),
  CmpApplication: CmpApplication(container),
  CmpChannel: CmpChannel(container),
  CmpTemplate: CmpTemplate(container),
  CmpMedia: CmpMedia(container),
});
