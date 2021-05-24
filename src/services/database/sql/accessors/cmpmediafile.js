/**
 * Accessor Service for CMP Media (File)
 * Create, Read, Update, Delete and List File Media
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Media File Model Accessor');

  const getById = async (cmpMediaFileId, excludeDeleted = true) => {
    try {
      const {
        CmpMediaFile,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaFileId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaFile = await CmpMediaFile.findOne(query);
      if (rawCmpMediaFile == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaFile = mapCmpMediaFile(rawCmpMediaFile);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpMediaFileId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpMediaFile,
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

      const rawCmpMediaFiles = await CmpMediaFile.findAll(query);
      const cmpMediaFiles = rawCmpMediaFiles
        .map(cmpMediaFile => mapCmpMediaFile(cmpMediaFile));
      return Promise.resolve(cmpMediaFiles);
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
      const cmpMediaFiles = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpMediaFiles == null || cmpMediaFiles.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaFile = cmpMediaFiles[0];
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaFileId, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaFile } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaFileId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaFile.update(changes, query);
      L.trace('CmpMediaFile Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpMediaFileId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpMediaFileId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaFile } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaFile.update(changes, query);
      L.trace('CmpMediaFile Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMediaFiles = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpMediaFile = (cmpMediaFile) => {
    const mappedCmpMediaFile = cmpMediaFile.dataValues;

    delete mappedCmpMediaFile.deleted;
    delete mappedCmpMediaFile.createdAt;
    delete mappedCmpMediaFile.updatedAt;

    return mappedCmpMediaFile;
  };

  const listMediaFiles = async (options = {}) => {
    try {
      const cmpMediaFiles = await getByCriteria({}, true, options);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaFileBatch = async (mediaList) => {
    try {
      const { CmpMediaFile } = container.databaseService.models;
      const creatableMediaList = mediaList.map(mediaItem => ({
        id: mediaItem.id || container.uuid(),
        url: mediaItem.url,
        caption: mediaItem.caption,
        fileName: mediaItem.fileName,
        deleted: false,
      }));
      const rawCmpMediaFiles = await CmpMediaFile.bulkCreate(creatableMediaList);
      const cmpMediaFiles = rawCmpMediaFiles.map(mapCmpMediaFile);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaFileBatch(mediaList);
      }
      return Promise.reject(error);
    }
  };

  const createMediaFile = async (
    url, caption, fileName,
  ) => {
    try {
      const { CmpMediaFile } = container.databaseService.models;
      const rawCmpMediaFile = await CmpMediaFile.create({
        id: container.uuid(),
        url,
        caption,
        fileName,
        deleted: false,
      });

      const cmpMediaFile = mapCmpMediaFile(rawCmpMediaFile);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaFile(url, caption, fileName);
      }
      return Promise.reject(error);
    }
  };

  const readMediaFile = async (cmpMediaFileId) => {
    try {
      const cmpMediaFile = await getById(cmpMediaFileId, false);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaFile = async (cmpMediaFileId, changes, options = {}) => {
    try {
      const cmpMediaFile = await updateById(cmpMediaFileId, changes, true, options);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaFiles = async (criteria, changes, options = {}) => {
    try {
      const cmpMediaFiles = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaFile = async (cmpMediaFileId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaFile = await updateById(cmpMediaFileId, changes, true, options);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaFiles = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaFiles = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaFile = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaFile = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaFiles = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpMediaFiles = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaFiles,

    createMediaFile,
    createMediaFileBatch,

    readMediaFile,

    updateMediaFile,
    updateMediaFiles,

    deleteMediaFile,
    deleteMediaFiles,

    findMediaFile,
    findMediaFiles,
  };
};
