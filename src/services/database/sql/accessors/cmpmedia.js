export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Model Accessor');

  const getById = async (cmpMediaId, excludeDeleted = true) => {
    try {
      const {
        CmpMedia,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMedia = await CmpMedia.findOne(query);
      if (rawCmpMedia == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMedia = mapCmpMedia(rawCmpMedia);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpMedia,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMedias = await CmpMedia.findAll(query);
      const cmpMedias = rawCmpMedias
        .map(cmpMedia => mapCmpMedia(cmpMedia));
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMedias = await getByCriteria(criteria, excludeDeleted);
      if (cmpMedias == null || cmpMedias.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMedia = cmpMedias[0];
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaId, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpMedia } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMedia.update(changes, query);
      L.debug('CmpMedia Update Result', result);

      const cmpMedia = await getById(cmpMediaId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpMedia } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMedia.update(changes, query);
      L.debug('CmpMedia Update Result', result);

      const cmpMedias = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpMedia = (cmpMedia) => {
    const mappedCmpMedia = cmpMedia.dataValues;

    delete mappedCmpMedia.deleted;
    delete mappedCmpMedia.createdAt;
    delete mappedCmpMedia.updatedAt;

    return mappedCmpMedia;
  };

  const listMedias = async () => {
    try {
      const cmpMedias = await getByCriteria({}, true);
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMedia = async (
    mediaType,
    text,
    url,
    caption,
    fileName,
    latitude,
    longitude,
    name,
    address,
  ) => {
    try {
      const { CmpMedia } = container.databaseService.models;
      const rawCmpMedia = await CmpMedia.create({
        id: container.uuid(),
        mediaType,
        text,
        url,
        caption,
        fileName,
        latitude,
        longitude,
        name,
        address,
        deleted: false,
      });

      const cmpMedia = mapCmpMedia(rawCmpMedia);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readMedia = async (cmpMediaId) => {
    try {
      const cmpMedia = await getById(cmpMediaId, false);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMedia = async (cmpMediaId, changes) => {
    try {
      const cmpMedia = await updateById(cmpMediaId, changes, true);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMedias = async (criteria, changes) => {
    try {
      const cmpMedias = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMedia = async (cmpMediaId) => {
    try {
      const changes = { deleted: true };
      const cmpMedia = await updateById(cmpMediaId, changes, true);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMedias = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMedias = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMedia = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMedia = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMedias = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMedias = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMedias,

    createMedia,
    readMedia,

    updateMedia,
    updateMedias,

    deleteMedia,
    deleteMedias,

    findMedia,
    findMedias,
  };
};
