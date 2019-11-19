export default (container) => {
  const { L } = container.defaultLogger('Nexmo Whatsapp Service');
  const getUrl = () => {
    const { host, useWhatsappSandbox } = container.config.nexmo;

    let url = `${host}/v0.1/messages`;
    if (useWhatsappSandbox) {
      L.info('Using APAC Whatsapp Sandbox Url');
      url = 'http://nexmoapac.hopto.me/sandbox/whatsapp.php';
    }

    return url;
  };

  const getFromNumber = (senderId) => {
    const { useWhatsappSandbox } = container.config.nexmo;

    let from = senderId;
    if (useWhatsappSandbox) {
      L.info('Using APAC Whatsapp Sandbox Mobile Number');
      from = '447418342132';
    }

    return from;
  };

  const sendFreeForm = async (
    to, text, clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const from = getFromNumber();
      const jwt = container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const body = {
        to: {
          type: 'whatsapp',
          number: to,
        },
        from: {
          type: 'whatsapp',
          number: from,
        },
        message: {
          content: {
            type: 'text',
            text,
          },
        },
        client_ref: clientRef,
      };

      const response = await axios.post(url, body, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const sendMessageTemplate = async (
    to, name, parameters, clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const from = getFromNumber();
      const jwt = container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const body = {
        to: {
          type: 'whatsapp',
          number: to,
        },
        from: {
          type: 'whatsapp',
          number: from,
        },
        message: {
          content: {
            type: 'template',
            template: {
              name,
              parameters: parameters.map(parameter => ({ default: parameter })),
            },
          },
          whatsapp: {
            policy: 'deterministic',
            locale: 'en_GB',
          },
        },
        client_ref: clientRef,
      };

      const response = await axios.post(url, body, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    sendFreeForm,
    sendMessageTemplate,
  };
};
