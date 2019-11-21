export default (container) => {
  const { L } = container.defaultLogger('Nexmo Viber Service');

  const getUrl = () => {
    const { host } = container.config.nexmo;

    const url = `${host}/v0.1/messages`;
    return url;
  };

  const sendText = async (
    from, to, text, clientRef,
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
            type: 'text',
            text,
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
    from, to,
    text, imageUrl, caption, actionUrl,
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
