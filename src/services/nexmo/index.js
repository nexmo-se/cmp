import Jwt from './jwt';
import Webhook from './webhook';
import Sms from './sms';

export default container => ({
  jwt: Jwt(container),
  webhook: Webhook(container),
  sms: Sms(container),
});
