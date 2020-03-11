export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Model Accessor');

  const getById = async (cmpMediaId, excludeDeleted = true) => {
    try {
      const {
        CmpMedia, CmpMediaText, CmpMediaImage,
        CmpMediaAudio, CmpMediaVideo, CmpMediaFile,
        CmpMediaLocation, CmpMediaViberTemplate,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaId,
        },
        include: [
          {
            model: CmpMediaText,
            as: 'cmpMediaText',
            foreignKey: 'cmpMediaTextId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaImage,
            as: 'cmpMediaImage',
            foreignKey: 'cmpMediaImageId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaAudio,
            as: 'cmpMediaAudio',
            foreignKey: 'cmpMediaAudioId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaVideo,
            as: 'cmpMediaVideo',
            foreignKey: 'cmpMediaVideoId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaFile,
            as: 'cmpMediaFile',
            foreignKey: 'cmpMediaFileId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaLocation,
            as: 'cmpMediaLocation',
            foreignKey: 'cmpMediaLocationId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaViberTemplate,
            as: 'cmpMediaViberTemplate',
            foreignKey: 'cmpMediaViberTemplateId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMedia = await CmpMedia.findOne(query);
      if (rawCmpMedia == null) {
        L.trace('Null result for Get By Id, returning null');
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
        CmpMedia, CmpMediaText, CmpMediaImage,
        CmpMediaAudio, CmpMediaVideo, CmpMediaFile,
        CmpMediaLocation, CmpMediaViberTemplate,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpMediaText,
            as: 'cmpMediaText',
            foreignKey: 'cmpMediaTextId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaImage,
            as: 'cmpMediaImage',
            foreignKey: 'cmpMediaImageId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaAudio,
            as: 'cmpMediaAudio',
            foreignKey: 'cmpMediaAudioId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaVideo,
            as: 'cmpMediaVideo',
            foreignKey: 'cmpMediaVideoId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaFile,
            as: 'cmpMediaFile',
            foreignKey: 'cmpMediaFileId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaLocation,
            as: 'cmpMediaLocation',
            foreignKey: 'cmpMediaLocationId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMediaViberTemplate,
            as: 'cmpMediaViberTemplate',
            foreignKey: 'cmpMediaViberTemplateId',
            where: {
              deleted: false,
            },
            required: false,
          },
        ],
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
        L.trace('Empty result when trying to Get One by Criteria, returning null');
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
      L.trace('CmpMedia Update Result', result);

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
      L.trace('CmpMedia Update Result', result);

      const cmpMedias = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpMediaText = (cmpMediaText) => {
    const mappedCmpMediaText = cmpMediaText.dataValues;

    delete mappedCmpMediaText.deleted;
    delete mappedCmpMediaText.createdAt;
    delete mappedCmpMediaText.updatedAt;

    return mappedCmpMediaText;
  };

  const mapCmpMediaImage = (cmpMediaImage) => {
    const mappedCmpMediaImage = cmpMediaImage.dataValues;

    delete mappedCmpMediaImage.deleted;
    delete mappedCmpMediaImage.createdAt;
    delete mappedCmpMediaImage.updatedAt;

    return mappedCmpMediaImage;
  };

  const mapCmpMediaAudio = (cmpMediaAudio) => {
    const mappedCmpMediaAudio = cmpMediaAudio.dataValues;

    delete mappedCmpMediaAudio.deleted;
    delete mappedCmpMediaAudio.createdAt;
    delete mappedCmpMediaAudio.updatedAt;

    return mappedCmpMediaAudio;
  };

  const mapCmpMediaVideo = (cmpMediaVideo) => {
    const mappedCmpMediaVideo = cmpMediaVideo.dataValues;

    delete mappedCmpMediaVideo.deleted;
    delete mappedCmpMediaVideo.createdAt;
    delete mappedCmpMediaVideo.updatedAt;

    return mappedCmpMediaVideo;
  };

  const mapCmpMediaFile = (cmpMediaFile) => {
    const mappedCmpMediaFile = cmpMediaFile.dataValues;

    delete mappedCmpMediaFile.deleted;
    delete mappedCmpMediaFile.createdAt;
    delete mappedCmpMediaFile.updatedAt;

    return mappedCmpMediaFile;
  };

  const mapCmpMediaLocation = (cmpMediaLocation) => {
    const mappedCmpMediaLocation = cmpMediaLocation.dataValues;

    delete mappedCmpMediaLocation.deleted;
    delete mappedCmpMediaLocation.createdAt;
    delete mappedCmpMediaLocation.updatedAt;

    return mappedCmpMediaLocation;
  };

  const mapCmpMediaViberTemplate = (cmpMediaViberTemplate) => {
    const mappedCmpMediaViberTemplate = cmpMediaViberTemplate.dataValues;

    delete mappedCmpMediaViberTemplate.deleted;
    delete mappedCmpMediaViberTemplate.createdAt;
    delete mappedCmpMediaViberTemplate.updatedAt;

    return mappedCmpMediaViberTemplate;
  };

  const mapCmpMedia = (cmpMedia) => {
    const mappedCmpMedia = cmpMedia.dataValues;

    if (mappedCmpMedia.cmpMediaText) {
      mappedCmpMedia.cmpMediaText = mapCmpMediaText(mappedCmpMedia.cmpMediaText);
    }
    if (mappedCmpMedia.cmpMediaImage) {
      mappedCmpMedia.cmpMediaImage = mapCmpMediaImage(mappedCmpMedia.cmpMediaImage);
    }
    if (mappedCmpMedia.cmpMediaAudio) {
      mappedCmpMedia.cmpMediaAudio = mapCmpMediaAudio(mappedCmpMedia.cmpMediaAudio);
    }
    if (mappedCmpMedia.cmpMediaVideo) {
      mappedCmpMedia.cmpMediaVideo = mapCmpMediaVideo(mappedCmpMedia.cmpMediaVideo);
    }
    if (mappedCmpMedia.cmpMediaFile) {
      mappedCmpMedia.cmpMediaFile = mapCmpMediaFile(mappedCmpMedia.cmpMediaFile);
    }
    if (mappedCmpMedia.cmpMediaLocation) {
      mappedCmpMedia.cmpMediaLocation = mapCmpMediaLocation(mappedCmpMedia.cmpMediaLocation);
    }
    if (mappedCmpMedia.cmpMediaViberTemplate) {
      mappedCmpMedia.cmpMediaViberTemplate = mapCmpMediaViberTemplate(
        mappedCmpMedia.cmpMediaViberTemplate,
      );
    }
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
    cmpMediaTextId,
    cmpMediaImageId,
    cmpMediaAudioId,
    cmpMediaVideoId,
    cmpMediaFileId,
    cmpMediaLocationId,
    cmpMediaViberTemplateId,
  ) => {
    try {
      const { CmpMedia } = container.databaseService.models;
      const createdCmpMedia = await CmpMedia.create({
        id: container.uuid(),
        mediaType,
        cmpMediaTextId,
        cmpMediaImageId,
        cmpMediaAudioId,
        cmpMediaVideoId,
        cmpMediaFileId,
        cmpMediaLocationId,
        cmpMediaViberTemplateId,
        deleted: false,
      });

      const { id } = createdCmpMedia;
      const cmpMedia = await getById(id, true);
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
