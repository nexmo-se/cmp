/**
 * Accessor Service for CMP Media (Video)
 * Create, Read, Update, Delete and List Video Media
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Video Model Accessor');

  const getById = async (cmpMediaVideoId, excludeDeleted = true) => {
    try {
      const {
        CmpMediaVideo,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaVideoId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaVideo = await CmpMediaVideo.findOne(query);
      if (rawCmpMediaVideo == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaVideo = mapCmpMediaVideo(rawCmpMediaVideo);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpMediaVideoId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpMediaVideo,
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

      const rawCmpMediaVideos = await CmpMediaVideo.findAll(query);
      const cmpMediaVideos = rawCmpMediaVideos
        .map(cmpMediaVideo => mapCmpMediaVideo(cmpMediaVideo));
      return Promise.resolve(cmpMediaVideos);
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
      const cmpMediaVideos = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpMediaVideos == null || cmpMediaVideos.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaVideo = cmpMediaVideos[0];
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaVideoId, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaVideo } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaVideoId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaVideo.update(changes, query);
      L.trace('CmpMediaVideo Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpMediaVideoId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpMediaVideoId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaVideo } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaVideo.update(changes, query);
      L.trace('CmpMediaVideo Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMediaVideos = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpMediaVideo = (cmpMediaVideo) => {
    const mappedCmpMediaVideo = cmpMediaVideo.dataValues;

    delete mappedCmpMediaVideo.deleted;
    delete mappedCmpMediaVideo.createdAt;
    delete mappedCmpMediaVideo.updatedAt;

    return mappedCmpMediaVideo;
  };

  const listMediaVideos = async (options = {}) => {
    try {
      const cmpMediaVideos = await getByCriteria({}, true, options);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaVideoBatch = async (mediaList) => {
    try {
      const { CmpMediaVideo } = container.databaseService.models;
      const creatableMediaList = mediaList.map(mediaItem => ({
        id: mediaItem.id || container.uuid(),
        url: mediaItem.url,
        caption: mediaItem.caption,
        deleted: false,
      }));
      const rawCmpMediaVideos = await CmpMediaVideo.bulkCreate(creatableMediaList);
      const cmpMediaVideo = rawCmpMediaVideos.map(mapCmpMediaVideo);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaVideoBatch(mediaList);
      }
      return Promise.reject(error);
    }
  };

  const createMediaVideo = async (
    url, caption,
  ) => {
    try {
      const { CmpMediaVideo } = container.databaseService.models;
      const rawCmpMediaVideo = await CmpMediaVideo.create({
        id: container.uuid(),
        url,
        caption,
        deleted: false,
      });

      const cmpMediaVideo = mapCmpMediaVideo(rawCmpMediaVideo);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaVideo(url, caption);
      }
      return Promise.reject(error);
    }
  };

  const readMediaVideo = async (cmpMediaVideoId) => {
    try {
      const cmpMediaVideo = await getById(cmpMediaVideoId, false);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaVideo = async (cmpMediaVideoId, changes, options = {}) => {
    try {
      const cmpMediaVideo = await updateById(cmpMediaVideoId, changes, true, options);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaVideos = async (criteria, changes, options = {}) => {
    try {
      const cmpMediaVideos = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaVideo = async (cmpMediaVideoId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaVideo = await updateById(cmpMediaVideoId, changes, true, options);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaVideos = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaVideos = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaVideo = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaVideo = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaVideos = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpMediaVideos = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaVideos,

    createMediaVideo,
    createMediaVideoBatch,

    readMediaVideo,

    updateMediaVideo,
    updateMediaVideos,

    deleteMediaVideo,
    deleteMediaVideos,

    findMediaVideo,
    findMediaVideos,
  };
};
