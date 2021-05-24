/**
 * Hash Service
 * Generate Salt and Hash of a plaintext
 */

export default (container) => {
  const generateSalt = async () => {
    try {
      const { saltRounds } = container.config.hash;
      const salt = await container.bcrypt.genSalt(saltRounds);
      return Promise.resolve(salt);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const hash = async (plaintext, salt) => {
    try {
      const hashResult = await container.bcrypt.hash(plaintext, salt);
      return Promise.resolve(hashResult);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    hash, // Hash a given plaintext
    generateSalt, // Generate a salt for hashing purposes
  };
};
