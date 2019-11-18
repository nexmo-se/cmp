import User from './user';
import UserRole from './userrole';
import NexmoApiKey from './nexmoapikey';
import NexmoApplication from './nexmoapplication';

export default container => ({
  User: User(container),
  UserRole: UserRole(container),
  NexmoApiKey: NexmoApiKey(container),
  NexmoApplication: NexmoApplication(container),
});
