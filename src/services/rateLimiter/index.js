/**
 * Rate Limiter Service
 * REST API call service with Rate Limiting queue
 */

import http from 'http';
import https from 'https';
import request from 'request';

export default (container) => {
  const { L } = container.defaultLogger('RateLimiter Service');
  const axiosMap = {};
  const trackerMap = {};

  const getMinTime = (tps) => {
    const { rateLimiterMode } = container.config.blaster;

    let minTime;
    if (rateLimiterMode === 'ceiling') {
      minTime = Math.ceil(1000 / tps);
    } else if (rateLimiterMode === 'floor') {
      minTime = Math.floor(1000 / tps);
    } else if (rateLimiterMode === 'decimal') {
      minTime = 1000 / tps;
    } else {
      minTime = Math.ceil(1000 / tps);
    }

    return minTime;
  };

  // Get new tracker time
  const getTrackTime = () => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const date = currentTime.getDate();
    const hours = currentTime.getHours();
    const minute = `0${currentTime.getMinutes()}`.slice(-2);
    const second = `0${currentTime.getSeconds()}`.slice(-2);
    const trackTime = `${month}/${date}/${year} ${hours}:${minute}:${second}`;
    return trackTime;
  };

  // Print TPS tracking log
  const trackTps = (key) => {
    if (trackerMap[key] == null) {
      L.trace('New TPS Tracker');
      trackerMap[key] = {
        lastTps: 0,
        trackingTps: 0,
        trackTime: getTrackTime(),
      };
    }

    const tracker = trackerMap[key];
    const trackTime = getTrackTime();
    if (tracker.trackTime === trackTime) {
      tracker.trackingTps += 1;
    } else {
      tracker.trackTime = trackTime;
      tracker.lastTps = tracker.trackingTps;
      tracker.trackingTps = 1;

      L.debug(`Bottleneck TPS (${key}): ${tracker.lastTps}tps`);
    }
  };

  // Create Axios-based AxiosRateLimiter instance
  const createNewAxiosInstance = (key, tps) => {
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    const config = { maxRequests: tps, perMilliseconds: 1000 };
    L.debug('Creating new Axios instance', config);

    const originalAxiosInstance = container.axios.create({
      httpAgent,
      httpsAgent,
    });

    // Log before request sent
    originalAxiosInstance.interceptors.request.use((req) => {
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const date = currentTime.getDate();
      const hours = currentTime.getHours();
      const minute = `0${currentTime.getMinutes()}`.slice(-2);
      const second = `0${currentTime.getSeconds()}`.slice(-2);
      const milliseconds = `00${currentTime.getMilliseconds()}`.slice(-3);
      const hour = hours > 12 ? hours - 12 : hours;
      const ampm = hours < 12 ? 'AM' : 'PM';

      const timeText = `${month}/${date}/${year} ${hour}:${minute}:${second}.${milliseconds} ${ampm}`;
      L.trace(`API Request Sent (${key}) at ${timeText}`);

      trackTps(key);
      return req;
    });

    // Log after response received
    originalAxiosInstance.interceptors.response.use((res) => {
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const date = currentTime.getDate();
      const hours = currentTime.getHours();
      const minute = `0${currentTime.getMinutes()}`.slice(-2);
      const second = `0${currentTime.getSeconds()}`.slice(-2);
      const milliseconds = `00${currentTime.getMilliseconds()}`.slice(-3);
      const hour = hours > 12 ? hours - 12 : hours;
      const ampm = hours < 12 ? 'AM' : 'PM';

      const timeText = `${month}/${date}/${year} ${hour}:${minute}:${second}.${milliseconds} ${ampm}`;
      L.trace(`API Response Received (${key}) at ${timeText}`);

      if (res.status >= 400) {
        L.error(`Interceptor (${key}): ${res.status}`, res.data);
      } else {
        L.trace(`Interceptor (${key}): ${res.status}`, res.data);
      }
      return res;
    });

    const rateLimitedAxiosInstance = container.rateLimit(originalAxiosInstance, config);
    return rateLimitedAxiosInstance;
  };

  // Create Request(library)-based Bottleneck instance
  const createNewBottleneckRequestInstance = (key, tps) => {
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    const config = { maxRequests: tps, perMilliseconds: 1000 };
    L.debug('Creating new Bottleneck instance (Request)', config);

    const minTime = getMinTime(tps);
    const bottleneckInstance = new container.Bottleneck({ minTime, trackDoneStatus: true });
    return {
      get: () => bottleneckInstance.schedule(
        () => {
          trackTps(key);
          Promise.resolve();
        },
      ),
      post: (url, body, requestConfig) => bottleneckInstance.schedule(
        () => new Promise((resolve, reject) => {
          const agent = url.indexOf('https') === 0 ? httpsAgent : httpAgent;
          const { headers = {} } = (requestConfig || {}).headers || {};
          const options = {
            url,
            agent,
            json: body,
            headers,
          };

          const handler = (error, res, resBody) => {
            const counts = bottleneckInstance.counts();
            L.debug('Bottleneck Counts', counts);
            if (error) {
              reject(error);
              return;
            }

            L.error(resBody);
            const newRes = res;
            newRes.data = resBody;
            resolve(newRes);
          };

          request.post(options, handler);
          trackTps(key);
        }),
      ),
      put: () => bottleneckInstance.schedule(
        () => {
          trackTps(key);
          Promise.resolve();
        },
      ),
      delete: () => bottleneckInstance.schedule(
        () => {
          trackTps(key);
          Promise.resolve();
        },
      ),
    };
  };

  // Create Axios-based Bottleneck instance
  const createNewBottleneckAxiosInstance = (key, tps) => {
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    const config = { maxRequests: tps, perMilliseconds: 1000 };
    L.debug('Creating new Bottleneck instance (Axios)', config);

    const minTime = getMinTime(tps);
    const bottleneckInstance = new container.Bottleneck({ minTime, trackDoneStatus: true });

    const originalAxiosInstance = container.axios.create({
      httpAgent,
      httpsAgent,
    });

    // Before request sent
    originalAxiosInstance.interceptors.request.use((req) => {
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const date = currentTime.getDate();
      const hours = currentTime.getHours();
      const minute = `0${currentTime.getMinutes()}`.slice(-2);
      const second = `0${currentTime.getSeconds()}`.slice(-2);
      const milliseconds = `00${currentTime.getMilliseconds()}`.slice(-3);
      const hour = hours > 12 ? hours - 12 : hours;
      const ampm = hours < 12 ? 'AM' : 'PM';

      const timeText = `${month}/${date}/${year} ${hour}:${minute}:${second}.${milliseconds} ${ampm}`;
      L.trace(`Bottleneck API Request Sent (${key}) at ${timeText}`);

      const counts = bottleneckInstance.counts();
      L.trace('Bottleneck Counts', counts);

      trackTps(key);
      return req;
    });

    // After response received
    originalAxiosInstance.interceptors.response.use((res) => {
      const currentTime = new Date();
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const date = currentTime.getDate();
      const hours = currentTime.getHours();
      const minute = `0${currentTime.getMinutes()}`.slice(-2);
      const second = `0${currentTime.getSeconds()}`.slice(-2);
      const milliseconds = `00${currentTime.getMilliseconds()}`.slice(-3);
      const hour = hours > 12 ? hours - 12 : hours;
      const ampm = hours < 12 ? 'AM' : 'PM';

      const timeText = `${month}/${date}/${year} ${hour}:${minute}:${second}.${milliseconds} ${ampm}`;
      L.trace(`Bottleneck API Response Received (${key}) at ${timeText}`);

      if (res.status >= 400) {
        L.error(`Interceptor (${key}): ${res.status}`, res.data);
      } else {
        L.trace(`Interceptor (${key}): ${res.status}`, res.data);
      }
      return res;
    });

    return {
      get: (url, requestConfig) => bottleneckInstance.schedule(
        () => originalAxiosInstance.get(url, requestConfig),
      ),
      post: (url, body, requestConfig) => bottleneckInstance.schedule(
        () => originalAxiosInstance.post(url, body, requestConfig),
      ),
      put: (url, body, requestConfig) => bottleneckInstance.schedule(
        () => originalAxiosInstance.put(url, body, requestConfig),
      ),
      delete: (url, body, requestConfig) => bottleneckInstance.schedule(
        () => originalAxiosInstance.delete(url, body, requestConfig),
      ),
    };
  };

  // Get or Create Axios Rate Limiter for channel
  const getAxiosRateLimiter = (id, channel, tps) => {
    const key = `${channel}-${id}`;
    if (axiosMap[key] == null) {
      axiosMap[key] = createNewAxiosInstance(key, tps);
    }

    return axiosMap[key];
  };

  // Get or Create Axios Bottleneck for channel
  const getAxiosBottleneckAxios = (id, channel, tps) => {
    const key = `${channel}-${id}`;
    if (axiosMap[key] == null) {
      axiosMap[key] = createNewBottleneckAxiosInstance(key, tps);
    }

    return axiosMap[key];
  };

  // Get or Create Request Bottleneck for channel
  const getAxiosBottleneckRequest = (id, channel, tps) => {
    const key = `${channel}-${id}`;
    if (axiosMap[key] == null) {
      axiosMap[key] = createNewBottleneckRequestInstance(key, tps);
    }

    return axiosMap[key];
  };


  // Get or create rate limited instance for channel
  const getAxios = (id, channel, tps) => {
    const { rateLimiter } = container.config.blaster;
    if (rateLimiter === 'bottleneck') {
      return getAxiosBottleneckAxios(id, channel, tps);
    }

    if (rateLimiter === 'bottleneckaxios') {
      return getAxiosBottleneckAxios(id, channel, tps);
    }

    if (rateLimiter === 'bottleneckrequest') {
      return getAxiosBottleneckRequest(id, channel, tps);
    }

    if (rateLimiter === 'axiosratelimiter') {
      return getAxiosRateLimiter(id, channel, tps);
    }

    L.debug(`Invalid Rate Limiter '${rateLimiter}', using bottleneck`);
    return getAxiosBottleneckAxios(id, channel, tps);
  };

  return {
    getAxios, // Get Axios-like instance with rate limiting
  };
};
