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
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpMediaVideo,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaVideos = await CmpMediaVideo.findAll(query);
      const cmpMediaVideos = rawCmpMediaVideos
        .map(cmpMediaVideo => mapCmpMediaVideo(cmpMediaVideo));
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaVideos = await getByCriteria(criteria, excludeDeleted);
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
    cmpMediaVideoId, changes = {}, excludeDeleted = true,
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

      const cmpMedia = await getById(cmpMediaVideoId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
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

      const cmpMediaVideos = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
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

  const listMediaVideos = async () => {
    try {
      const cmpMediaVideos = await getByCriteria({}, true);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
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

  const updateMediaVideo = async (cmpMediaVideoId, changes) => {
    try {
      const cmpMediaVideo = await updateById(cmpMediaVideoId, changes, true);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaVideos = async (criteria, changes) => {
    try {
      const cmpMediaVideos = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaVideo = async (cmpMediaVideoId) => {
    try {
      const changes = { deleted: true };
      const cmpMediaVideo = await updateById(cmpMediaVideoId, changes, true);
      return Promise.resolve(cmpMediaVideo);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaVideos = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMediaVideos = await updateByCriteria(criteria, changes, true);
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

  const findMediaVideos = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaVideos = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaVideos);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaVideos,

    createMediaVideo,
    readMediaVideo,

    updateMediaVideo,
    updateMediaVideos,

    deleteMediaVideo,
    deleteMediaVideos,

    findMediaVideo,
    findMediaVideos,
  };
};
