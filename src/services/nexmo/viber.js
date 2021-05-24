/**
 * Viber
 * Send Text and Media Viber Message
 */

import windows1252 from 'windows-1252';
import utf8 from 'utf8';

export default (container) => {
  const { L } = container.defaultLogger('Nexmo Viber Service');

  const getUrl = () => {
    const {
      host, useViberSandbox, useMockViber, mockViberUrl,
    } = container.config.nexmo;

    let url = `${host}/v0.1/messages`;
    if (useMockViber) {
      L.info('Using Mock Viber Url');
      url = mockViberUrl;
    } else if (useViberSandbox) {
      L.info('Using APAC Viber Sandbox Url');
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

  const getFromId = (senderId) => {
    const { useViberSandbox, useMockViber } = container.config.nexmo;

    let from = senderId;
    if (useMockViber) {
      L.info('Using Mock Viber, use provided mobile number');
    } else if (useViberSandbox) {
      L.info('Using APAC Viber Sandbox Mobile Number');
      from = '13219';
    }

    return from;
  };

  const sendText = async (
    from, to, text, clientRef,
    category, ttl,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const senderId = getFromId(from);
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

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
          id: senderId,
        },
        message: {
          content: {
            type: 'text',
            text: convertToUtf8(text),
          },
        },
        // viber_service_msg: {
        //   category,
        //   ttl,
        // },
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
      const senderId = getFromId(from);
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

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
          id: senderId,
        },
        message: {
          content: {
            type: 'image',
            image: {
              url: imageUrl,
            },
          },
        },
        // viber_service_msg: {
        //   category,
        //   ttl,
        // },
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
      const senderId = getFromId(from);
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

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
          id: senderId,
        },
        message: {
          content: {
            type: 'custom',
            custom: {
              '#txt': convertToUtf8(text),
              '#img': imageUrl,
              '#caption': convertToUtf8(caption),
              '#action': actionUrl,
            },
          },
        },
        // viber_service_msg: {
        //   category,
        //   ttl,
        // },
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
    sendText, // Send Text-only Viber message
    sendImage, // Send Image-only Viber message
    sendTemplate, // Send Image + Text + Button Viber message
  };
};
