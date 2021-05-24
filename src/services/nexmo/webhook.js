/**
 * Webhook Setup
 * Setup webhook to Nexmo Application automatically
 */

export default (container) => {
  const getUrl = applicationId => `${container.config.nexmo.host}/v2/applications/${applicationId}`;
  const getSmsUrl = () => `${container.config.nexmo.restHost}/account/settings`;
  const getApplication = async (apiKey, apiSecret, applicationId) => {
    try {
      const url = getUrl(applicationId);
      const config = {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      };
      const response = await container.axios.get(url, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const setApplication = async (apiKey, apiSecret, applicationId, application) => {
    try {
      const url = getUrl(applicationId);
      const config = {
        auth: {
          username: apiKey,
          password: apiSecret,
        },
      };
      const response = await container.axios.put(url, application, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Setup SMS webhooks (API Key Level)
  const registerSms = async (
    apiKey, apiSecret, inboundRoute, deliveryRoute,
  ) => {
    try {
      const rawUrl = getSmsUrl();

      const url = `${rawUrl}?api_key=${apiKey}&api_secret=${apiSecret}`;
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      let body = '';

      // Inbound Url
      if (inboundRoute && inboundRoute !== '') {
        if (body === '') {
          body += `moCallBackUrl=${container.config.hostUrl}${inboundRoute}`;
        } else {
          body += `&moCallBackUrl=${container.config.hostUrl}${inboundRoute}`;
        }
      }

      // Delivery Url
      if (deliveryRoute && deliveryRoute !== '') {
        if (body === '') {
          body += `drCallBackUrl=${container.config.hostUrl}${deliveryRoute}`;
        } else {
          body += `&drCallBackUrl=${container.config.hostUrl}${deliveryRoute}`;
        }
      }

      const response = await container.axios.post(url, body, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Setup RTC webhooks (Application Level)
  const registerRtc = async (
    apiKey, apiSecret, applicationId, eventRoute,
  ) => {
    try {
      // Load
      const application = await getApplication(apiKey, apiSecret, applicationId);

      // Initialize if not exist
      if (application.capabilities.rtc == null) {
        application.capabilities.rtc = {
          webhooks: {},
        };
      }

      // Event Url
      if (eventRoute && eventRoute !== '') {
        application.capabilities.rtc.webhooks.event_url = {
          address: `${container.config.hostUrl}${eventRoute}`,
          http_method: 'POST',
        };
      }

      // Delete unused keys
      delete application._links;

      // Save
      await setApplication(apiKey, apiSecret, applicationId, application);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Setup Messages API (MAPI) webhooks (Application Level)
  const registerMapi = async (
    apiKey, apiSecret, applicationId, inboundRoute, statusRoute,
  ) => {
    try {
      // Load
      const application = await getApplication(apiKey, apiSecret, applicationId);

      // Initialize if not exist
      if (application.capabilities.messages == null) {
        application.capabilities.messages = {
          webhooks: {},
        };
      }

      // Inbound Url
      if (inboundRoute && inboundRoute !== '') {
        application.capabilities.messages.webhooks.inbound_url = {
          address: `${container.config.hostUrl}${inboundRoute}`,
          http_method: 'POST',
        };
      }

      // Status Url
      if (statusRoute && statusRoute !== '') {
        application.capabilities.messages.webhooks.status_url = {
          address: `${container.config.hostUrl}${statusRoute}`,
          http_method: 'POST',
        };
      }

      // Delete unused keys
      delete application._links;

      // Save
      await setApplication(apiKey, apiSecret, applicationId, application);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Setup Voice API (VAPI) webhooks (Application Level)
  const registerVapi = async (
    apiKey, apiSecret, applicationId, eventRoute, answerRoute, fallbackAnswerRoute,
  ) => {
    try {
      // Load
      const application = await getApplication(apiKey, apiSecret, applicationId);

      // Initialize if not exist
      if (application.capabilities.voice == null) {
        application.capabilities.voice = {
          webhooks: {},
        };
      }

      // Event Url
      if (eventRoute && eventRoute !== '') {
        application.capabilities.voice.webhooks.event_url = {
          address: `${container.config.hostUrl}${eventRoute}`,
          http_method: 'POST',
        };
      }

      // Answer Url
      if (answerRoute && answerRoute !== '') {
        application.capabilities.voice.webhooks.answer_url = {
          address: `${container.config.hostUrl}${answerRoute}`,
          http_method: 'POST',
        };
      }

      // Fallback Answer Url
      if (fallbackAnswerRoute && fallbackAnswerRoute !== '') {
        application.capabilities.voice.webhooks.fallback_answer_url = {
          address: `${container.config.hostUrl}${fallbackAnswerRoute}`,
          http_method: 'POST',
        };
      }

      // Delete unused keys
      delete application._links;

      // Save
      await setApplication(apiKey, apiSecret, applicationId, application);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    registerSms, // Setup SMS Webhook (API key level)
    registerRtc, // Setup RTC Webhook (application level)
    registerVapi, // Setup VAPI Webhook (application level)
    registerMapi, // Setup MAPI Webhook (application level)
  };
};
