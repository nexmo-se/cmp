import User from './user';
import NexmoApiKey from './nexmoApiKey';
import NexmoApplication from './nexmoApplication';

export default container => ({
  User: User(container),
  NexmoApiKey: NexmoApiKey(container),
  NexmoApplication: NexmoApplication(container),
});
