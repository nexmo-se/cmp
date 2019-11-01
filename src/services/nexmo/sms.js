export default (container) => {
  const sendSms = async (userNexmoIni, to, text, type) => {
    try {
      const { key, secret, from } = userNexmoIni;
      const { restHost } = container.config.nexmo;

      const url = `${restHost}/sms/json`;
      const body = {
        api_key: key,
        api_secret: secret,
        from,
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
