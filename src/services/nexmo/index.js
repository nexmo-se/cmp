import Jwt from './jwt';
import Webhook from './webhook';
import Sms from './sms';
import Whatsapp from './whatsapp';
import Viber from './viber';

export default container => ({
  jwt: Jwt(container),
  webhook: Webhook(container),
  sms: Sms(container),
  whatsapp: Whatsapp(container),
  viber: Viber(container),
});
