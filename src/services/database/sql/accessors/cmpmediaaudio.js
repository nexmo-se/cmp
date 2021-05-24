/**
 * Accessor Service for CMP Media (Audio)
 * Create, Read, Update, Delete and List Audio Media
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Audio Model Accessor');

  const getById = async (cmpMediaAudioId, excludeDeleted = true) => {
    try {
      const {
        CmpMediaAudio,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaAudioId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaAudio = await CmpMediaAudio.findOne(query);
      if (rawCmpMediaAudio == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaAudio = mapCmpMediaAudio(rawCmpMediaAudio);
      return Promise.resolve(cmpMediaAudio);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpMediaAudioId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpMediaAudio,
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

      const rawCmpMediaAudios = await CmpMediaAudio.findAll(query);
      const cmpMediaAudios = rawCmpMediaAudios
        .map(cmpMediaAudio => mapCmpMediaAudio(cmpMediaAudio));
      return Promise.resolve(cmpMediaAudios);
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
      const cmpMediaAudios = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpMediaAudios == null || cmpMediaAudios.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaAudio = cmpMediaAudios[0];
      return Promise.resolve(cmpMediaAudio);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaAudioId, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaAudio } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaAudioId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaAudio.update(changes, query);
      L.trace('CmpMediaAudio Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpMediaAudioId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpMediaAudioId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaAudio } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaAudio.update(changes, query);
      L.trace('CmpMediaAudio Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMediaAudios = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaAudios);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpMediaAudio = (cmpMediaAudio) => {
    const mappedCmpMediaAudio = cmpMediaAudio.dataValues;

    delete mappedCmpMediaAudio.deleted;
    delete mappedCmpMediaAudio.createdAt;
    delete mappedCmpMediaAudio.updatedAt;

    return mappedCmpMediaAudio;
  };

  const listMediaAudios = async () => {
    try {
      const cmpMediaAudios = await getByCriteria({}, true);
      return Promise.resolve(cmpMediaAudios);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaAudioBatch = async (mediaList) => {
    try {
      const { CmpMediaAudio } = container.databaseService.models;
      const creatableMediaList = mediaList.map(mediaItem => ({
        id: mediaItem.id || container.uuid(),
        url: mediaItem.url,
        deleted: false,
      }));
      const rawCmpMediaAudios = await CmpMediaAudio.bulkCreate(creatableMediaList);
      const cmpMediaAudios = rawCmpMediaAudios.map(mapCmpMediaAudio);
      return Promise.resolve(cmpMediaAudios);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaAudioBatch(mediaList);
      }
      return Promise.reject(error);
    }
  };

  const createMediaAudio = async (
    url,
  ) => {
    try {
      const { CmpMediaAudio } = container.databaseService.models;
      const rawCmpMediaAudio = await CmpMediaAudio.create({
        id: container.uuid(),
        url,
        deleted: false,
      });

      const cmpMediaAudio = mapCmpMediaAudio(rawCmpMediaAudio);
      return Promise.resolve(cmpMediaAudio);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaAudio(url);
      }
      return Promise.reject(error);
    }
  };

  const readMediaAudio = async (cmpMediaAudioId) => {
    try {
      const cmpMediaAudio = await getById(cmpMediaAudioId, false);
      return Promise.resolve(cmpMediaAudio);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaAudio = async (cmpMediaAudioId, changes, options = {}) => {
    try {
      const cmpMediaAudio = await updateById(cmpMediaAudioId, changes, true, options);
      return Promise.resolve(cmpMediaAudio);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaAudios = async (criteria, changes, options = {}) => {
    try {
      const cmpMediaAudios = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaAudios);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaAudio = async (cmpMediaAudioId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaAudio = await updateById(cmpMediaAudioId, changes, true, options);
      return Promise.resolve(cmpMediaAudio);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaAudios = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaAudios = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaAudios);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaAudio = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaAudio = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaAudio);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaAudios = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpMediaAudios = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaAudios);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaAudios,

    createMediaAudio,
    createMediaAudioBatch,

    readMediaAudio,

    updateMediaAudio,
    updateMediaAudios,

    deleteMediaAudio,
    deleteMediaAudios,

    findMediaAudio,
    findMediaAudios,
  };
};
