import windows1252 from 'windows-1252';
import utf8 from 'utf8';

export default (container) => {
  const { L } = container.defaultLogger('Nexmo Voice Service');

  const generateTtsNccos = (text) => {

  }

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
    to, text, type, senderId,
    apiKey, apiSecret,
    smsUseSignature, signatureSecret, signatureMethod,
    axios = container.axios) => {
    try {
      const url = getUrl();
      const body = {
        api_key: apiKey,
        from: senderId,
        to,
        text: sanitizedText,
        type: sanitizedType,
      };

      const response = await axios.post(url, body);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    sendTts,
  };
};
