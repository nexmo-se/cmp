export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Persistence Accessor');

  const listMedias = async () => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedias = await CmpMedia.listMedias();
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
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedia = await CmpMedia.createMedia(
        mediaType,
        text,
        url,
        caption,
        fileName,
        latitude,
        longitude,
        name,
        address,
      );
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readMedia = async (cmpMediaId) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedia = await CmpMedia.readMedia(cmpMediaId);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMedia = async (cmpMediaId, changes) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedia = await CmpMedia.updateMedia(
        cmpMediaId, changes,
      );
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMedias = async (criteria, changes) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedias = await CmpMedia.updateMedias(criteria, changes);
      return Promise.resolve(cmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMedia = async (cmpMediaId) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedia = await CmpMedia.deleteMedia(cmpMediaId);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMedias = async (criteria) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedias = await CmpMedia.deleteMedias(criteria);
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
  };
};
