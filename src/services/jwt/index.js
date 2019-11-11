export default (container) => {
  const encode = async (payload) => {
    try {
      const { secret } = container.config.jwt;
      const token = await container.jsonwebtoken.sign(payload, secret);
      return Promise.resolve(token);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const decode = async (token) => {
    try {
      const { secret } = container.config.jwt;
      const payload = await container.jsonwebtoken.verify(token, secret);
      return Promise.resolve(payload);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    encode,
    decode,
  };
};
