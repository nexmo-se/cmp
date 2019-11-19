import User from './user';
import CmpApiKey from './cmpApiKey';
import CmpApplication from './cmpApplication';
import CmpChannel from './cmpChannel';

export default container => ({
  User: User(container),
  CmpApiKey: CmpApiKey(container),
  CmpApplication: CmpApplication(container),
  CmpChannel: CmpChannel(container),
});
