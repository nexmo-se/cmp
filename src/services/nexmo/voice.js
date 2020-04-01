export default (container) => {
  const { L } = container.defaultLogger('Nexmo Voice Service');
  const getUrl = () => {
    const {
      host, useMockVoice, mockWhatsappUrl,
    } = container.config.nexmo;

    let url = `${host}/v1/calls`;
    if (useMockVoice) {
      L.info('Using Mock Voice Url');
      url = mockWhatsappUrl;
    }

    return url;
  };

  const callTalk = async (
    from, to, text, voiceName,
    applicationId, privateKey,
    axios = container.axios,
  ) => {
    try {
      const jwt = await container.nexmoService.jwt.getSystemJwt(applicationId, privateKey);
      const eventUrl = `${container.constants.hostUrl}/webhook/vapi/event`;
      const ncco = {
        action: 'talk',
        text,
        voiceName,
      };

      const url = getUrl();
      const body = {
        from: {
          type: 'phone',
          number: from,
        },
        to: [
          {
            type: 'phone',
            number: to,
          },
        ],
        ncco,
        event_url: [eventUrl],
        event_method: 'POST',
      };
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      const response = await axios.post(url, body, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    callTalk,
  };
};
