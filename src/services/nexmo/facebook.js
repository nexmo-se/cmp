/**
 * Facebook Messenger
 * Send Message to Facebook Messenger
 */

import windows1252 from 'windows-1252';
import utf8 from 'utf8';

export default (container) => {
  const { L } = container.defaultLogger('Nexmo Facebook Messenger Service');

  const getUrl = () => {
    const { host } = container.config.nexmo;

    const url = `${host}/v0.1/messages`;
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

  const getTextMediaContentBody = text => ({
    type: 'text',
    text: convertToUtf8(text),
  });

  const getImageMediaContentBody = image => ({
    type: 'image',
    image: {
      url: image.url,
    },
  });

  const getAudioMediaContentBody = audio => ({
    type: 'audio',
    audio: {
      url: audio.url,
    },
  });

  const getVideoMediaContentBody = video => ({
    type: 'video',
    video: {
      url: video.url,
    },
  });

  const getFileMediaContentBody = file => ({
    type: 'file',
    file: {
      url: file.url,
    },
  });

  const getMediaContentBody = (mediaType, media) => {
    let mediaContentBody = { type: 'none', text: media };
    if (mediaType == null || mediaType === 'none') {
      L.trace('FB Template Text');
      mediaContentBody = getTextMediaContentBody(media);
    } else if (mediaType === 'image') {
      L.trace('FB Template Image');
      mediaContentBody = getImageMediaContentBody(media);
    } else if (mediaType === 'audio') {
      L.trace('FB Template Audio');
      mediaContentBody = getAudioMediaContentBody(media);
    } else if (mediaType === 'video') {
      L.trace('FB Template Video');
      mediaContentBody = getVideoMediaContentBody(media);
    } else if (mediaType === 'file') {
      L.trace('FB Template File');
      mediaContentBody = getFileMediaContentBody(media);
    } else {
      L.trace('FB Template Unknown - Default');
    }

    return mediaContentBody;
  };

  const sendMedia = async (
    from, to, mediaType, media, clientRef,
    category, tag,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);
      const contentBody = getMediaContentBody(mediaType, media);

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const body = {
        to: {
          type: 'messenger',
          id: to,
        },
        from: {
          type: 'messenger',
          id: from,
        },
        message: {
          content: contentBody,
        },
        messenger: {
          category,
          tag,
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

  const sendText = async (
    from, to, text, clientRef,
    category, tag,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const content = getTextMediaContentBody(text);

      return sendMedia(
        from, to, 'text', content,
        clientRef, category, tag,
        applicationId, privateKey, axios,
      );
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    sendText, // Send Text-only message
    sendMedia, // Send Media message
  };
};
