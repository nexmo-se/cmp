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
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaFile = mapCmpMediaFile(rawCmpMediaFile);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpMediaFile,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaFiles = await CmpMediaFile.findAll(query);
      const cmpMediaFiles = rawCmpMediaFiles
        .map(cmpMediaFile => mapCmpMediaFile(cmpMediaFile));
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaFiles = await getByCriteria(criteria, excludeDeleted);
      if (cmpMediaFiles == null || cmpMediaFiles.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaFile = cmpMediaFiles[0];
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaFileId, changes = {}, excludeDeleted = true,
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
      L.debug('CmpMediaFile Update Result', result);

      const cmpMedia = await getById(cmpMediaFileId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpMediaFile } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaFile.update(changes, query);
      L.debug('CmpMediaFile Update Result', result);

      const cmpMediaFiles = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
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

  const listMediaFiles = async () => {
    try {
      const cmpMediaFiles = await getByCriteria({}, true);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
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

  const updateMediaFile = async (cmpMediaFileId, changes) => {
    try {
      const cmpMediaFile = await updateById(cmpMediaFileId, changes, true);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaFiles = async (criteria, changes) => {
    try {
      const cmpMediaFiles = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaFile = async (cmpMediaFileId) => {
    try {
      const changes = { deleted: true };
      const cmpMediaFile = await updateById(cmpMediaFileId, changes, true);
      return Promise.resolve(cmpMediaFile);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaFiles = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMediaFiles = await updateByCriteria(criteria, changes, true);
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

  const findMediaFiles = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaFiles = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaFiles);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaFiles,

    createMediaFile,
    readMediaFile,

    updateMediaFile,
    updateMediaFiles,

    deleteMediaFile,
    deleteMediaFiles,

    findMediaFile,
    findMediaFiles,
  };
};
