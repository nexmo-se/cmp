/**
 * Nexmo Service
 * Provide subservices related to Nexmo product
 */

import Jwt from './jwt';
import Webhook from './webhook';
import Sms from './sms';
import Whatsapp from './whatsapp';
import Viber from './viber';
import Facebook from './facebook';
import Voice from './voice';
import NumberInsight from './numberInsight';

export default container => ({
  jwt: Jwt(container), // Get JWT for Nexmo Application
  webhook: Webhook(container), // Setup webhook programmatically
  sms: Sms(container), // SMS API
  whatsapp: Whatsapp(container), // Whatsapp (Messages API)
  viber: Viber(container), // Viber (Messages API)
  facebook: Facebook(container), // Facebok Messenger (Messages API)
  voice: Voice(container), // Voice (Voice API)
  numberInsight: NumberInsight(container), // Number Insight (Number Insight API)
});
