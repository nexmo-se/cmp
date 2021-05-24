/**
 * Accessor Service for CMP Media (Image)
 * Create, Read, Update, Delete and List Image Media
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Image Model Accessor');

  const getById = async (cmpMediaImageId, excludeDeleted = true) => {
    try {
      const {
        CmpMediaImage,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaImageId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaImage = await CmpMediaImage.findOne(query);
      if (rawCmpMediaImage == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaImage = mapCmpMediaImage(rawCmpMediaImage);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpMediaImageId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpMediaImage,
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

      const rawCmpMediaImages = await CmpMediaImage.findAll(query);
      const cmpMediaImages = rawCmpMediaImages
        .map(cmpMediaImage => mapCmpMediaImage(cmpMediaImage));
      return Promise.resolve(cmpMediaImages);
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
      const cmpMediaImages = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpMediaImages == null || cmpMediaImages.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaImage = cmpMediaImages[0];
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaImageId, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaImage } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaImageId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaImage.update(changes, query);
      L.trace('CmpMediaImage Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpMediaImageId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpMediaImageId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaImage } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaImage.update(changes, query);
      L.trace('CmpMediaImage Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMediaImages = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpMediaImage = (cmpMediaImage) => {
    const mappedCmpMediaImage = cmpMediaImage.dataValues;

    delete mappedCmpMediaImage.deleted;
    delete mappedCmpMediaImage.createdAt;
    delete mappedCmpMediaImage.updatedAt;

    return mappedCmpMediaImage;
  };

  const listMediaImages = async (options = {}) => {
    try {
      const cmpMediaImages = await getByCriteria({}, true, options);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaImageBatch = async (mediaList) => {
    try {
      const { CmpMediaImage } = container.databaseService.models;
      const creatableMediaList = mediaList.map(mediaItem => ({
        id: mediaItem.id || container.uuid(),
        url: mediaItem.url,
        caption: mediaItem.caption,
        deleted: false,
      }));
      const rawCmpMediaImages = await CmpMediaImage.bulkCreate(creatableMediaList);
      const cmpMediaImages = rawCmpMediaImages.map(mapCmpMediaImage);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaImageBatch(mediaList);
      }
      return Promise.reject(error);
    }
  };

  const createMediaImage = async (
    url, caption,
  ) => {
    try {
      const { CmpMediaImage } = container.databaseService.models;
      const rawCmpMediaImage = await CmpMediaImage.create({
        id: container.uuid(),
        url,
        caption,
        deleted: false,
      });

      const cmpMediaImage = mapCmpMediaImage(rawCmpMediaImage);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaImage(url, caption);
      }
      return Promise.reject(error);
    }
  };

  const readMediaImage = async (cmpMediaImageId) => {
    try {
      const cmpMediaImage = await getById(cmpMediaImageId, false);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaImage = async (cmpMediaImageId, changes, options = {}) => {
    try {
      const cmpMediaImage = await updateById(cmpMediaImageId, changes, true, options);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaImages = async (criteria, changes, options = {}) => {
    try {
      const cmpMediaImages = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaImage = async (cmpMediaImageId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaImage = await updateById(cmpMediaImageId, changes, true, options);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaImages = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaImages = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaImage = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaImage = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaImages = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpMediaImages = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaImages,

    createMediaImage,
    createMediaImageBatch,

    readMediaImage,

    updateMediaImage,
    updateMediaImages,

    deleteMediaImage,
    deleteMediaImages,

    findMediaImage,
    findMediaImages,
  };
};
