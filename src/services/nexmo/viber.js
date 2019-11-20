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

  const getContentBody = (templateBody, parameters) => {
    let contentBody = templateBody;

    for (let i = 0; i < parameters.length; i += 1) {
      const parameter = parameters[i];
      const regexp = new RegExp(`{{${i + 1}}}`, 'g');
      contentBody = contentBody.replace(regexp, parameter);
    }

    return contentBody;
  };

  const sendText = async (
    from, to, templateBody, parameters, clientRef,
    category, ttl,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const jwt = container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);
      const contentBody = getContentBody(templateBody, parameters);

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const body = {
        to: {
          type: 'viber_service_msg',
          number: to,
        },
        from: {
          type: 'viber_service_msg',
          id: from,
        },
        message: {
          content: {
            type: 'text',
            text: contentBody,
          },
        },
        viber_service_msg: {
          category,
          ttl,
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

  const sendImage = async (
    from, to, imageUrl, clientRef,
    category, ttl,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const jwt = container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const body = {
        to: {
          type: 'viber_service_msg',
          number: to,
        },
        from: {
          type: 'viber_service_msg',
          id: from,
        },
        message: {
          content: {
            type: 'image',
            image: {
              url: imageUrl,
            },
          },
        },
        viber_service_msg: {
          category,
          ttl,
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

  const sendTemplate = async (
    from, to, text, imageUrl, caption, actionUrl,
    clientRef, category, ttl,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const jwt = container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const body = {
        to: {
          type: 'viber_service_msg',
          number: to,
        },
        from: {
          type: 'viber_service_msg',
          id: from,
        },
        message: {
          content: {
            type: 'custom',
            custom: {
              '#txt': text,
              '#img': imageUrl,
              '#caption': caption,
              '#action': actionUrl,
            },
          },
        },
        viber_service_msg: {
          category,
          ttl,
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
    sendText,
    sendImage,
    sendTemplate,
  };
};
