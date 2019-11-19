export default (container) => {
  const sendSms = async (to, text, type, senderId, apiKey, apiSecret) => {
    try {
      const { restHost } = container.config.nexmo;

      const url = `${restHost}/sms/json`;
      const body = {
        api_key: apiKey,
        api_secret: apiSecret,
        from: senderId,
        to,
        text,
        type,
      };

      const response = await container.axios.post(url, body);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    sendSms,
  };
};
