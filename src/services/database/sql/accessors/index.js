import User from './user';
import UserRole from './userrole';
import CmpApiKey from './cmpapikey';
import CmpApplication from './cmpapplication';
import CmpChannel from './cmpchannel';

export default container => ({
  User: User(container),
  UserRole: UserRole(container),
  CmpApiKey: CmpApiKey(container),
  CmpApplication: CmpApplication(container),
  CmpChannel: CmpChannel(container),
});
