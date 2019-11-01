export default (container) => {
  const getUrl = applicationId => `${container.config.nexmo.host}/v2/applications/${applicationId}`;
  const getSmsUrl = () => `${container.config.nexmo.restHost}/account/settings`;
  const getApplication = async (userNexmoIni) => {
    try {
      const applicationId = userNexmoIni.app_id;
      const { key, secret } = userNexmoIni;
      const url = getUrl(applicationId);
      const config = {
        auth: {
          username: key,
          password: secret,
        },
      };
      const response = await container.axios.get(url, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const setApplication = async (userNexmoIni, application) => {
    try {
      const applicationId = userNexmoIni.app_id;
      const { key, secret } = userNexmoIni;
      const url = getUrl(applicationId);
      const config = {
        auth: {
          username: key,
          password: secret,
        },
      };
      const response = await container.axios.put(url, application, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const registerSms = async (
    userNexmoIni, demoRoute, inboundRoute, deliveryRoute,
  ) => {
    try {
      const { key, secret } = userNexmoIni;
      const rawUrl = getSmsUrl();

      const url = `${rawUrl}?api_key=${key}&api_secret=${secret}`;
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      let body = '';

      // Inbound Url
      if (inboundRoute && inboundRoute !== '') {
        if (body === '') {
          body += `moCallBackUrl=${container.config.host}${demoRoute}/${inboundRoute}`;
        } else {
          body += `&moCallBackUrl=${container.config.host}${demoRoute}/${inboundRoute}`;
        }
      }

      // Delivery Url
      if (deliveryRoute && deliveryRoute !== '') {
        if (body === '') {
          body += `drCallBackUrl=${container.config.host}${demoRoute}/${deliveryRoute}`;
        } else {
          body += `&drCallBackUrl=${container.config.host}${demoRoute}/${deliveryRoute}`;
        }
      }

      const response = await container.axios.post(url, body, config);
      const { data } = response;
      return Promise.resolve(data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const registerRtc = async (
    userNexmoIni, demoRoute, eventRoute,
  ) => {
    try {
      // Load
      const application = await getApplication(userNexmoIni);

      // Initialize if not exist
      if (application.capabilities.rtc == null) {
        application.capabilities.rtc = {
          webhooks: {},
        };
      }

      // Event Url
      if (eventRoute && eventRoute !== '') {
        application.capabilities.rtc.webhooks.event_url = {
          address: `${container.config.host}${demoRoute}/${eventRoute}`,
          http_method: 'POST',
        };
      }

      // Delete unused keys
      delete application._links;

      // Save
      await setApplication(userNexmoIni, application);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const registerMapi = async (
    userNexmoIni, demoRoute, inboundRoute, statusRoute,
  ) => {
    try {
      // Load
      const application = await getApplication(userNexmoIni);

      // Initialize if not exist
      if (application.capabilities.messages == null) {
        application.capabilities.messages = {
          webhooks: {},
        };
      }

      // Inbound Url
      if (inboundRoute && inboundRoute !== '') {
        application.capabilities.messages.webhooks.inbound_url = {
          address: `${container.config.host}${demoRoute}/${inboundRoute}`,
          http_method: 'POST',
        };
      }

      // Status Url
      if (statusRoute && statusRoute !== '') {
        application.capabilities.messages.webhooks.status_url = {
          address: `${container.config.host}${demoRoute}/${statusRoute}`,
          http_method: 'POST',
        };
      }

      // Delete unused keys
      delete application._links;

      // Save
      await setApplication(userNexmoIni, application);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const registerVapi = async (
    userNexmoIni, demoRoute, eventRoute, answerRoute, fallbackAnswerRoute,
  ) => {
    try {
      // Load
      const application = await getApplication(userNexmoIni);

      // Initialize if not exist
      if (application.capabilities.voice == null) {
        application.capabilities.voice = {
          webhooks: {},
        };
      }

      // Event Url
      if (eventRoute && eventRoute !== '') {
        application.capabilities.voice.webhooks.event_url = {
          address: `${container.config.host}${demoRoute}/${eventRoute}`,
          http_method: 'POST',
        };
      }

      // Answer Url
      if (answerRoute && answerRoute !== '') {
        application.capabilities.voice.webhooks.answer_url = {
          address: `${container.config.host}${demoRoute}/${answerRoute}`,
          http_method: 'POST',
        };
      }

      // Fallback Answer Url
      if (fallbackAnswerRoute && fallbackAnswerRoute !== '') {
        application.capabilities.voice.webhooks.fallback_answer_url = {
          address: `${container.config.host}${demoRoute}/${fallbackAnswerRoute}`,
          http_method: 'POST',
        };
      }

      // Delete unused keys
      delete application._links;

      // Save
      await setApplication(userNexmoIni, application);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    registerSms,
    registerRtc,
    registerVapi,
    registerMapi,
  };
};
