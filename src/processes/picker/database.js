import CreatableGenerator from './creatableGenerator';

export default (container) => {
  const { L } = container.defaultLogger('Picker Process (Database)');

  const generator = CreatableGenerator(container);

  const createCreatableLists = (records) => {
    const creatableRecords = [];
    const creatableParameters = [];
    const creatableMediaList = [];

    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];

      const cmpRecordId = container.uuid();
      const cmpMediaId = container.uuid();

      // Record
      const creatableRecord = generator.generateCreatableRecord(cmpRecordId, cmpMediaId, record);
      creatableRecords.push(creatableRecord);

      // Parameters
      const creatableParameterList = generator.generateCreatableParameters(cmpRecordId, record);
      for (let j = 0; j < creatableParameterList.length; j += 1) {
        const creatableParameter = creatableParameterList[j];
        creatableParameters.push(creatableParameter);
      }

      // Media
      const creatableMedia = generator.generateCreatableMedia(cmpMediaId, record);
      if (creatableMedia != null) {
        creatableMediaList.push(creatableMedia);
      }
    }

    return {
      records: creatableRecords,
      parameters: creatableParameters,
      media: creatableMediaList,
    };
  };

  const insertRecords = async (creatableRecords) => {
    try {
      const { CmpRecord } = container.persistenceService;

      const createRecordStart = new Date().getTime();
      await CmpRecord.createRecordBatch(creatableRecords);
      const createRecordEnd = new Date().getTime();
      L.debug(`Time Taken (Create Records): ${createRecordEnd - createRecordStart}ms`);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const insertParameters = async (creatableParameters) => {
    try {
      const { CmpParameter } = container.persistenceService;

      const createParameterStart = new Date().getTime();
      await CmpParameter.createParameterBatch(creatableParameters);
      const createParameterEnd = new Date().getTime();
      L.debug(`Time Taken (Create Parameters): ${createParameterEnd - createParameterStart}ms`);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const insertMedia = async (creatableMediaList) => {
    try {
      const { CmpMedia } = container.persistenceService;

      const createMediaStart = new Date().getTime();
      await CmpMedia.createMediaBatch(creatableMediaList);
      const createMediaEnd = new Date().getTime();
      L.debug(`Time Taken (Create Media): ${createMediaEnd - createMediaStart}ms`);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecordsDatabase = async (records) => {
    try {
      const creatableLists = createCreatableLists(records);

      await insertMedia(creatableLists.media);
      await insertParameters(creatableLists.parameters);
      await insertRecords(creatableLists.records);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    createRecordsDatabase,
  };
};
