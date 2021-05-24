/**
 * Accessor Service for CMP Voices
 * Create, Read, Update, Delete and List Voices
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Voice Model Accessor');

  const getById = async (cmpVoiceId, excludeDeleted = true) => {
    try {
      const {
        CmpVoice,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpVoiceId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpVoice = await CmpVoice.findOne(query);
      if (rawCmpVoice == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpVoice = mapCmpVoice(rawCmpVoice);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpVoiceId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpVoice,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['createdAt', 'DESC'],
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpVoices = await CmpVoice.findAll(query);
      const cmpVoices = rawCmpVoices
        .map(cmpVoice => mapCmpVoice(cmpVoice));
      return Promise.resolve(cmpVoices);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpVoices = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpVoices == null || cmpVoices.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpVoice = cmpVoices[0];
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpVoiceId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpVoice } = container.databaseService.models;
      const query = {
        where: {
          id: cmpVoiceId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpVoice.update(changes, query);
      L.trace('CmpVoice Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpVoice = await getById(cmpVoiceId, excludeDeleted);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpVoiceId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpVoice } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpVoice.update(changes, query);
      L.trace('CmpVoice Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpVoices = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpVoices);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpVoice = (cmpVoice) => {
    const mappedCmpVoice = cmpVoice.dataValues;

    delete mappedCmpVoice.deleted;
    delete mappedCmpVoice.createdAt;
    delete mappedCmpVoice.updatedAt;

    return mappedCmpVoice;
  };

  const listVoices = async (options = {}) => {
    try {
      const cmpVoices = await getByCriteria({}, true, options);
      return Promise.resolve(cmpVoices);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createVoiceBatch = async (voiceList) => {
    try {
      const { CmpVoice } = container.databaseService.models;
      const creatableVoiceList = voiceList.map(voiceItem => ({
        id: voiceItem.id || container.uuid(),
        voiceType: voiceItem.voiceType,
        language: voiceItem.language,
        style: voiceItem.style,
        streamUrl: voiceItem.streamUrl,
        answerUrl: voiceItem.answerUrl,
        deleted: false,
      }));
      const rawCmpVoices = await CmpVoice.bulkCreate(creatableVoiceList);
      const cmpVoices = rawCmpVoices.map(mapCmpVoice);
      return Promise.resolve(cmpVoices);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createVoiceBatch(voiceList);
      }
      return Promise.reject(error);
    }
  };

  const createVoice = async (
    voiceType, language, style,
    streamUrl, answerUrl,
  ) => {
    try {
      const { CmpVoice } = container.databaseService.models;
      const rawCmpVoice = await CmpVoice.create({
        id: container.uuid(),
        voiceType,
        language,
        style,
        streamUrl,
        answerUrl,
        deleted: false,
      });

      const cmpVoice = mapCmpVoice(rawCmpVoice);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createVoice(text);
      }
      return Promise.reject(error);
    }
  };

  const readVoice = async (cmpVoiceId) => {
    try {
      const cmpVoice = await getById(cmpVoiceId, false);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateVoice = async (cmpVoiceId, changes, options = {}) => {
    try {
      const cmpVoice = await updateById(cmpVoiceId, changes, true, options);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateVoices = async (criteria, changes, options = {}) => {
    try {
      const cmpVoices = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpVoices);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteVoice = async (cmpVoiceId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpVoice = await updateById(cmpVoiceId, changes, true, options);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteVoices = async (criteria = {}, options = {}) => {
    try {
      const changes = { deleted: true };
      const cmpVoices = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpVoices);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findVoice = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpVoice = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findVoices = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpVoices = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpVoices);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listVoices,

    createVoice,
    createVoiceBatch,

    readVoice,

    updateVoice,
    updateVoices,

    deleteVoice,
    deleteVoices,

    findVoice,
    findVoices,
  };
};
