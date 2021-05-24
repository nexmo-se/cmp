/**
 * Whatsapp
 * Send Text and Media Messages
 */

import windows1252 from 'windows-1252';
import utf8 from 'utf8';

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

  // Convert encoding to UTF-8
  const convertToUtf8 = (text) => {
    if (text == null) {
      return null;
    }
    const encoded = windows1252.encode(text);
    const decoded = utf8.decode(encoded);
    return decoded;
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
            text: convertToUtf8(text),
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
      if (mediaType == null || mediaType === 'none') {
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

  // Send Text-only Message Template using "Template"
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
              parameters: parameters.map(parameter => ({ default: convertToUtf8(parameter) })),
            },
          },
          whatsapp: {
            policy: 'deterministic',
            locale: 'en',
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

  const getBodyParameter = text => ({
    type: 'text',
    text: convertToUtf8(text),
  });

  const getTextParameter = text => ({
    type: 'text',
    text: convertToUtf8(text.text),
  });

  const getImageParameter = image => ({
    type: 'image',
    image: {
      link: image.url,
    },
  });

  const getVideoParameter = video => ({
    type: 'video',
    video: {
      link: video.url,
    },
  });

  const getFileParameter = file => ({
    type: 'document',
    document: {
      link: file.url,
      filename: convertToUtf8(file.fileName),
    },
  });

  const getLocationParameter = location => ({
    type: 'location',
    location: {
      longitude: parseFloat(`${location.longitude}`),
      latitude: parseFloat(`${location.latitude}`),
      name: convertToUtf8(location.name),
      address: convertToUtf8(location.address),
    },
  });

  const getMediaParameter = (mediaType, media) => {
    let parameter = { type: 'text', text: media };
    if (mediaType === 'text') {
      L.trace('MTM Text');
      parameter = getTextParameter(media.cmpMediaText);
    } else if (mediaType === 'image') {
      L.trace('MTM Image');
      parameter = getImageParameter(media.cmpMediaImage);
    } else if (mediaType === 'video') {
      L.trace('MTM Video');
      parameter = getVideoParameter(media.cmpMediaVideo);
    } else if (mediaType === 'file') {
      L.trace('MTM File');
      parameter = getFileParameter(media.cmpMediaFile);
    } else if (mediaType === 'location') {
      L.trace('MTM Location');
      parameter = getLocationParameter(media.cmpMediaLocation);
    } else {
      L.trace('MTM Unknown - Default');
    }

    return parameter;
  };

  // Send Whatsapp Media Template using "Custom"
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
            custom: {
              type: 'template',
              template: {
                namespace,
                name,
                language: {
                  policy: 'deterministic',
                  code: 'en',
                },
                components: [
                  {
                    type: 'header',
                    parameters: [mediaParameter],
                  },
                  {
                    type: 'body',
                    parameters: parameters.map(parameter => getBodyParameter(parameter)),
                  },
                ],
              },
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
    sendFreeForm, // Send FreeForm Text (not very useful, requires 24H window open)
    sendTemplate, // Send Message/Media Template
  };
};
