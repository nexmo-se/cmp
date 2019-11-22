export default (container) => {
  const { L } = container.defaultLogger('Nexmo Facebook Messenger Service');

  const getUrl = () => {
    const { host } = container.config.nexmo;

    const url = `${host}/v0.1/messages`;
    return url;
  };

  const getTextMediaContentBody = text => ({
    type: 'text',
    text,
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
    let mediaContentBody = { type: 'text', text: media };
    if (mediaType === 'text') {
      L.debug('FB Template Text');
      mediaContentBody = getTextMediaContentBody(media);
    } else if (mediaType === 'image') {
      L.debug('FB Template Image');
      mediaContentBody = getImageMediaContentBody(media);
    } else if (mediaType === 'audio') {
      L.debug('FB Template Audio');
      mediaContentBody = getAudioMediaContentBody(media);
    } else if (mediaType === 'video') {
      L.debug('FB Template Video');
      mediaContentBody = getVideoMediaContentBody(media);
    } else if (mediaType === 'file') {
      L.debug('FB Template File');
      mediaContentBody = getFileMediaContentBody(media);
    } else {
      L.debug('FB Template Unknown - Default');
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
    sendText,
    sendMedia,
  };
};
