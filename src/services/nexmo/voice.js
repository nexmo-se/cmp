/**
 * Voice
 * Make voice call with NCCO (TTS only at the moment)
 */

export default (container) => {
  const { L } = container.defaultLogger('Nexmo Voice Service');

  const generateTtsNccos = (text, language = 'en-US', style = 0) => ([
    {
      action: "talk",
      text: text,
      language,
      style,
    }
  ]);

  const generateStreamNccos = (url) => ([
    {
      action: "stream",
      streamUrl: [url],
    }
  ]);

  const getUrl = () => {
    const { host, useMockVoice, mockVoiceUrl } = container.config.nexmo;
    if (useMockVoice) {
      L.trace('Using Mock Voice Endpoint');
      L.trace(mockVoiceUrl);
      return mockVoiceUrl;
    }

    return `${host}/v1/calls`;
  };

  const sendTts = async (
    from, to,
    text, language = 'en-US', style = 0,
    clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    const nccos = generateTtsNccos(text, language, style);
    return sendNcco(
      from, to, nccos, clientRef,
      applicationId, privateKey, axios,
    );
  }

  const sendStream = async (
    from, to,
    url,
    clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    const nccos = generateStreamNccos(url);
    return sendNcco(
      from, to, nccos, clientRef,
      applicationId, privateKey, axios,
    );
  }

  const sendNcco = async (
    from, to, nccos, clientRef,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);

      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };
      const body = {
        to: [
          {
            type: 'phone',
            number: to,
          },
        ],
        from: {
          type: 'phone',
          number: from,
        },
        event_url: [`${container.config.hostUrl}webhook/vapi/event/${clientRef}`],
        event_method: 'POST',
        ncco: nccos,
      };

      const response = await axios.post(url, body, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    sendTts, // Make TTS Voice call
    sendStream, // Make AudioStream (URL) Voice call (not tested)

    sendNcco, // Make Voice call with NCCO
  };
};
