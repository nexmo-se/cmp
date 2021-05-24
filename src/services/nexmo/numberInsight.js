/**
 * Number Insight
 */

export default (container) => {
  const { L } = container.defaultLogger('Nexmo Number Insight Service');

  const getUrl = () => {
    const { host, useMockNumberInsight, mockNumberInsightUrl } = container.config.nexmo;
    if (useMockNumberInsight) {
      L.trace('Using Mock Number Insight Endpoint');
      L.trace(mockNumberInsightUrl);
      return mockNumberInsightUrl;
    }

    return `${host}/ni/advanced/async/json`;
  };


  const sendAdvanced = async (
    apiKey, apiSecret, number, cnam = false,
    axios = container.axios,
  ) => {
    try {
      const url = getUrl();
      const callbackUrl = `${container.config.hostUrl}webhook/ni/callback`;

      const body = {
        api_key: apiKey,
        api_secret: apiSecret,
        number,
        cnam,
        callback: callbackUrl,
      };

      const response = await axios.post(url, body);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    sendAdvanced, // Send Advanced Number Insight request
  };
};
