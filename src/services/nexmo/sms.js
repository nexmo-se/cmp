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

  const sendText = async (
    to, text, type, senderId,
    apiKey, apiSecret,
    smsUseSignature, signatureSecret, signatureMethod,
    axios = container.axios) => {
    try {
      const url = getUrl();
      const body = {
        api_key: apiKey,
        from: senderId,
        to,
        text,
        type,
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
    sendText,
  };
};
