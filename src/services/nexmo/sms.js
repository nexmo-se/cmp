export default (container) => {
  const getContentBody = (templateBody, parameters) => {
    let contentBody = templateBody;

    for (let i = 0; i < parameters.length; i += 1) {
      const parameter = parameters[i];
      const pattern = `\\{\\{${i + 1}\\}\\}`;
      const regexp = new RegExp(pattern, 'g');
      contentBody = contentBody.replace(regexp, parameter);
    }

    return contentBody;
  };

  const sendTemplate = async (to, templateBody, parameters, type, senderId, apiKey, apiSecret) => {
    try {
      const { restHost } = container.config.nexmo;
      const text = getContentBody(templateBody, parameters);

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
    sendTemplate,
  };
};
