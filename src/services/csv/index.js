/**
 * CSV Service
 * To Parse CSV to JSON and to Serialize JSON to CSV
 */

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

  const fromCsvSync = (csvContent) => {
    const content = container.csvParse(csvContent);
    return content;
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
    fromCsv, // Convert CSV to JSON (Async version), requires await/then
    fromCsvSync, // Convert CSV to JSON (Sync version), can use directly (PREFERRED)
    toCsv, // Convert JSON to CSV
  };
};
