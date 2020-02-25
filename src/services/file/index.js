export default (container) => {
  const readContent = async (path) => {
    try {
      const buffer = await readBuffer(path);
      const content = buffer.toString();
      return Promise.resolve(content);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readBuffer = async (path) => {
    try {
      const buffer = container.fs.readFileSync(path);
      return Promise.resolve(buffer);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const writeContent = async (path, content) => {
    try {
      const buffer = Buffer.from(content, 'utf8');
      await writeBuffer(path, buffer);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const writeBuffer = async (path, buffer) => {
    try {
      container.fs.writeFileSync(path, buffer);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    readContent,
    readBuffer,

    writeContent,
    writeBuffer,
  };
};
