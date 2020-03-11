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
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpMediaImage,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaImages = await CmpMediaImage.findAll(query);
      const cmpMediaImages = rawCmpMediaImages
        .map(cmpMediaImage => mapCmpMediaImage(cmpMediaImage));
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaImages = await getByCriteria(criteria, excludeDeleted);
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
    cmpMediaImageId, changes = {}, excludeDeleted = true,
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

      const cmpMedia = await getById(cmpMediaImageId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
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

      const cmpMediaImages = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
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

  const listMediaImages = async () => {
    try {
      const cmpMediaImages = await getByCriteria({}, true);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
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

  const updateMediaImage = async (cmpMediaImageId, changes) => {
    try {
      const cmpMediaImage = await updateById(cmpMediaImageId, changes, true);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaImages = async (criteria, changes) => {
    try {
      const cmpMediaImages = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaImage = async (cmpMediaImageId) => {
    try {
      const changes = { deleted: true };
      const cmpMediaImage = await updateById(cmpMediaImageId, changes, true);
      return Promise.resolve(cmpMediaImage);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaImages = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMediaImages = await updateByCriteria(criteria, changes, true);
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

  const findMediaImages = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaImages = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaImages);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaImages,

    createMediaImage,
    readMediaImage,

    updateMediaImage,
    updateMediaImages,

    deleteMediaImage,
    deleteMediaImages,

    findMediaImage,
    findMediaImages,
  };
};
