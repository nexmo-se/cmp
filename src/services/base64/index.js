/**
 * Base64 Service
 * Encode and Decode between Plaintext and Base64 String
 */

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
    encode, // Encode plaintext string to base64
    decode, // Decode base64 string to plaintext
  };
};
