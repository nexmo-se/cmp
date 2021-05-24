/**
 * SMS
 * Send SMS message
 */

import windows1252 from 'windows-1252';
import utf8 from 'utf8';

export default (container) => {
  const { L } = container.defaultLogger('Nexmo SMS Service');

  const getUrl = () => {
    const { restHost, useMockSms, mockSmsUrl } = container.config.nexmo;
    if (useMockSms) {
      L.trace('Using Mock SMS Endpoint');
      L.trace(mockSmsUrl);
      return mockSmsUrl;
    }

    return `${restHost}/sms/json`;
  };

  // eslint-disable-next-line no-control-regex
  const isUnicode = text => /[^\u0000-\u00ff]/.test(text);

  // Convert encoding to UTF-8
  const convertToUtf8 = (text) => {
    if (text == null) {
      return null;
    }
    const encoded = windows1252.encode(text);
    const decoded = utf8.decode(encoded);
    return decoded;
  };

  const sendText = async (
    to, text, type, senderId,
    apiKey, apiSecret,
    smsUseSignature, signatureSecret, signatureMethod,
    axios = container.axios) => {
    try {
      const url = getUrl();
      const sanitizedText = convertToUtf8(text);
      const sanitizedType = isUnicode(sanitizedText) ? 'unicode' : 'text';
      const body = {
        api_key: apiKey,
        from: senderId,
        to,
        text: sanitizedText,
        type: sanitizedType,
      };

      if (smsUseSignature) {
        L.trace('With SMS Signature');
        const signature = container.nexmo.generateSignature(
          signatureMethod, signatureSecret, body,
        );
        body.sig = signature;
      } else {
        L.trace('Without SMS Signature');
        body.api_secret = apiSecret;
      }

      const response = await axios.post(url, body);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    sendText, // Send Text SMS
  };
};
