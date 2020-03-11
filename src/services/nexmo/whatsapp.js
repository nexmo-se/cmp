export default (container) => {
  const { L } = container.defaultLogger('Nexmo Whatsapp Service');
  const getUrl = () => {
    const {
      host, useWhatsappSandbox, useMockWhatsapp, mockWhatsappUrl,
    } = container.config.nexmo;

    let url = `${host}/v0.1/messages`;
    if (useMockWhatsapp) {
      L.info('Using Mock Whatsapp Url');
      url = mockWhatsappUrl;
    } else if (useWhatsappSandbox) {
      L.info('Using APAC Whatsapp Sandbox Url');
      url = 'http://nexmoapac.hopto.me/sandbox/whatsapp.php';
    }

    return url;
  };

  const getFromNumber = (senderId) => {
    const { useWhatsappSandbox, useMockWhatsapp } = container.config.nexmo;

    let from = senderId;
    if (useMockWhatsapp) {
      L.info('Using Mock Whatsapp, use provided mobile number');
    } else if (useWhatsappSandbox) {
      L.info('Using APAC Whatsapp Sandbox Mobile Number');
      from = '447418342132';
    }

    return from;
  };

  const sendFreeForm = async (
    from, to, text, clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const senderId = getFromNumber(from);
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

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
          number: senderId,
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

  const sendTemplate = async (
    from, to, namespace, name,
    mediaType, media, parameters, clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      if (mediaType === 'text') {
        L.trace('Using Message Template');
        return sendMessageTemplate(
          from, to, namespace, name, parameters,
          clientRef, applicationId, privateKey, axios,
        );
      }

      L.trace('Using Media Template');
      return sendMediaTemplate(
        from, to, namespace, name, mediaType, media, parameters,
        clientRef, applicationId, privateKey, axios,
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const sendMessageTemplate = async (
    from, to, namespace, name, parameters, clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const senderId = getFromNumber(from);
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

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
          number: senderId,
        },
        message: {
          content: {
            type: 'template',
            template: {
              name: `${namespace}:${name}`,
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

  const getTextParameter = text => ({
    type: 'text',
    text,
  });

  const getImageParameter = image => ({
    type: 'image',
    image: {
      link: image.url,
      caption: image.caption,
    },
  });

  const getAudioParameter = audio => ({
    type: 'audio',
    audio: {
      link: audio.url,
    },
  });

  const getVideoParameter = video => ({
    type: 'video',
    video: {
      link: video.url,
      caption: video.caption,
    },
  });

  const getFileParameter = file => ({
    type: 'document',
    document: {
      link: file.url,
      caption: file.caption,
      filename: file.fileName,
    },
  });

  const getLocationParameter = location => ({
    type: 'location',
    location: {
      longitude: location.longitude,
      latitude: location.latitude,
      name: location.name,
      address: location.address,
    },
  });

  const getMediaParameter = (mediaType, media) => {
    let parameter = { type: 'text', text: media };
    if (mediaType === 'text') {
      L.trace('MTM Text');
      parameter = getTextParameter(media);
    } else if (mediaType === 'image') {
      L.trace('MTM Image');
      parameter = getImageParameter(media);
    } else if (mediaType === 'audio') {
      L.trace('MTM Audio');
      parameter = getAudioParameter(media);
    } else if (mediaType === 'video') {
      L.trace('MTM Video');
      parameter = getVideoParameter(media);
    } else if (mediaType === 'file') {
      L.trace('MTM File');
      parameter = getFileParameter(media);
    } else if (mediaType === 'location') {
      L.trace('MTM Location');
      parameter = getLocationParameter(media);
    } else {
      L.trace('MTM Unknown - Default');
    }

    return parameter;
  };

  const sendMediaTemplate = async (
    from, to, namespace, name,
    mediaType, media, parameters, clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const senderId = getFromNumber(from);
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);
      const mediaParameter = getMediaParameter(mediaType, media);

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
          number: senderId,
        },
        message: {
          content: {
            type: 'custom',
            template: {
              namespace,
              name,
              language: {
                policy: 'deterministic',
                locale: 'en_GB',
              },
              components: [
                {
                  type: 'header',
                  parameters: [mediaParameter],
                },
                {
                  type: 'body',
                  parameters: parameters.map(parameter => getTextParameter(parameter)),
                },
              ],
            },
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
    sendTemplate,
  };
};
