export default (container) => {
  const fromCsv = async (csvContent) => {
    try {
      const client = container.csvtojson({
        noheader: true,
        output: 'csv',
      });
      const content = await client.fromString(csvContent);
      return Promise.resolve(content);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const toCsv = async (jsonContent) => {
    try {
      const csvContent = container.arraytocsv(jsonContent);
      return Promise.resolve(csvContent);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    fromCsv,
    toCsv,
  };
};
