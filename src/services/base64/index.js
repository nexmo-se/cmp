export default () => {
  const encode = async (plaintext) => {
    try {
      const buffer = Buffer.from(plaintext);
      const encodedText = buffer.toString('base64');
      return Promise.resolve(encodedText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const decode = async (encodedText) => {
    try {
      const buffer = Buffer.from(encodedText, 'base64');
      const plaintext = buffer.toString();
      return Promise.resolve(plaintext);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    encode,
    decode,
  };
};
