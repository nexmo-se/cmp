import http from 'http';
import https from 'https';

export default (container) => {
  const { L } = container.defaultLogger('RateLimiter Service');
  const axiosMap = {};

  const createNewAxiosInstance = (key, tps) => {
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    const config = { maxRequests: tps, perMilliseconds: 1000 };
    L.debug('Creating new Axios instance', config);

    const originalAxiosInstance = container.axios.create({
      httpAgent,
      httpsAgent,
    });

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
      L.debug(`API Request Sent (${key}) at ${timeText}`);

      return req;
    });

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
      L.debug(`API Response Received (${key}) at ${timeText}`);

      if (res.status >= 400) {
        L.error(`Interceptor (${key}): ${res.status}`, res.data);
      } else {
        L.debug(`Interceptor (${key}): ${res.status}`, res.data);
      }
      return res;
    });

    const rateLimitedAxiosInstance = container.rateLimit(originalAxiosInstance, config);
    return rateLimitedAxiosInstance;
  };

  const createNewBottleneckInstance = (key, tps) => {
    const httpAgent = new http.Agent({ keepAlive: true });
    const httpsAgent = new https.Agent({ keepAlive: true });
    const config = { maxRequests: tps, perMilliseconds: 1000 };
    L.debug('Creating new Bottleneck instance', config);

    const originalAxiosInstance = container.axios.create({
      httpAgent,
      httpsAgent,
    });

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
      L.debug(`Bottleneck API Request Sent (${key}) at ${timeText}`);

      return req;
    });

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
      L.debug(`Bottleneck API Response Received (${key}) at ${timeText}`);

      if (res.status >= 400) {
        L.error(`Interceptor (${key}): ${res.status}`, res.data);
      } else {
        L.debug(`Interceptor (${key}): ${res.status}`, res.data);
      }
      return res;
    });

    const minTime = 1000 / tps;
    const bottleneckInstance = new container.Bottleneck({ minTime });

    return {
      get: bottleneckInstance.wrap(originalAxiosInstance.get),
      post: bottleneckInstance.wrap(originalAxiosInstance.post),
      put: bottleneckInstance.wrap(originalAxiosInstance.put),
      delete: bottleneckInstance.wrap(originalAxiosInstance.delete),
    };
  };

  const getAxiosRateLimiter = (id, channel, tps) => {
    const key = `${channel}-${id}`;
    if (axiosMap[key] == null) {
      axiosMap[key] = createNewAxiosInstance(key, tps);
    }

    return axiosMap[key];
  };

  const getAxiosBottleneck = (id, channel, tps) => {
    const key = `${channel}-${id}`;
    if (axiosMap[key] == null) {
      axiosMap[key] = createNewBottleneckInstance(key, tps);
    }

    return axiosMap[key];
  };

  const getAxios = (id, channel, tps) => {
    const { rateLimiter } = container.config.blaster;
    if (rateLimiter === 'bottleneck') {
      return getAxiosBottleneck(id, channel, tps);
    }

    if (rateLimiter === 'axiosratelimiter') {
      return getAxiosRateLimiter(id, channel, tps);
    }

    L.debug(`Invalid Rate Limiter '${rateLimiter}', using bottleneck`);
    return getAxiosBottleneck(id, channel, tps);
  };

  return {
    getAxios,
  };
};
