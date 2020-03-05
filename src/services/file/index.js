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

  const readLineBuffer = (path, lineListener = () => {}, closeListener = () => {}) => {
    const { fs, readline } = container;
    const readInterface = readline.createInterface({
      input: fs.createReadStream(path),
    });
    readInterface.on('line', lineListener);
    readInterface.on('close', closeListener);
  };

  const readLineContent = (path, lineListener = () => {}, closeListener = () => {}) => {
    readLineBuffer(path, (lineBuffer) => {
      const lineContent = lineBuffer.toString();
      lineListener(lineContent);
    }, closeListener);
  };

  const readNLineBuffer = (path) => {
    const reader = new container.NReadLines(path);
    return reader;
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
      container.fs.writeFileSync(path, buffer, { flag: 'a' });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteFile = async (path) => {
    try {
      container.fs.unlinkSync(path);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    readContent,
    readBuffer,
    readLineBuffer,
    readLineContent,
    readNLineBuffer,

    writeContent,
    writeBuffer,

    deleteFile,
  };
};
