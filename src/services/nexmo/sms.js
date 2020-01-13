export default (container) => {
  const { L } = container.defaultLogger('Nexmo SMS Service');

  const sendText = async (
    to, text, type, senderId,
    apiKey, apiSecret,
    smsUseSignature, signatureSecret, signatureMethod,
    axios = container.axios) => {
    try {
      const { restHost } = container.config.nexmo;

      const url = `${restHost}/sms/json`;
      const body = {
        api_key: apiKey,
        from: senderId,
        to,
        text,
        type,
      };

      if (smsUseSignature) {
        L.debug('With SMS Signature');
        const signature = container.nexmo.generateSignature(
          signatureMethod, signatureSecret, body,
        );
        body.sig = signature;
      } else {
        L.debug('Without SMS Signature');
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
    sendText,
  };
};
