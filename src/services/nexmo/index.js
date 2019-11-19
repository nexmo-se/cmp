import Jwt from './jwt';
import Webhook from './webhook';
import Sms from './sms';
import Whatsapp from './whatsapp';

export default container => ({
  jwt: Jwt(container),
  webhook: Webhook(container),
  sms: Sms(container),
  whatsapp: Whatsapp(container),
});
