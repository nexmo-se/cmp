export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Controller');

  const listAllMedias = async (req, res, next) => {
    try {
      const { CmpMedia } = container.persistenceService;
      const cmpMedias = await CmpMedia.listMedias();
      res.status(200).json(cmpMedias);
    } catch (error) {
      next(error);
    }
  };

  const listMyMedias = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Medias');
      const { CmpMedia } = container.persistenceService;
      const cmpMedias = await CmpMedia.listMedias();
      res.status(200).json(cmpMedias);
    } catch (error) {
      next(error);
    }
  };

  const deleteAllMedias = async (req, res, next) => {
    try {
      const { CmpMedia } = container.persistenceService;
      const cmpMedias = await CmpMedia.deleteMedias({});
      res.status(200).json(cmpMedias);
    } catch (error) {
      next(error);
    }
  };

  const createMedia = async (req, res, next) => {
    try {
      const {
        type, text, url, caption, fileName, latitude, longitude, name, address, actionUrl,
      } = req.body;
      const { CmpMedia } = container.persistenceService;

      const cmpMedia = await CmpMedia.createMedia(
        type, text, url, caption, fileName, latitude, longitude, name, address, actionUrl,
      );
      res.status(200).json(cmpMedia);
    } catch (error) {
      next(error);
    }
  };

  const readMedia = async (req, res, next) => {
    try {
      const { cmpMediaId } = req.params;
      const { CmpMedia } = container.persistenceService;

      const cmpMedia = await CmpMedia.readMedia(cmpMediaId);
      res.status(200).json(cmpMedia);
    } catch (error) {
      next(error);
    }
  };

  const readMyMedia = async (req, res, next) => {
    try {
      L.warn('Temporary: User can read all Medias');
      const { cmpMediaId } = req.params;
      const { CmpMedia } = container.persistenceService;

      const cmpMedia = await CmpMedia.readMedia(cmpMediaId);
      res.status(200).json(cmpMedia);
    } catch (error) {
      next(error);
    }
  };

  const deleteMedia = async (req, res, next) => {
    try {
      const { cmpMediaId } = req.params;
      const { CmpMedia } = container.persistenceService;
      const cmpMedia = await CmpMedia.deleteMedia(cmpMediaId);
      res.status(200).json(cmpMedia);
    } catch (error) {
      next(error);
    }
  };

  return {
    listAllMedias,
    listMyMedias,
    deleteAllMedias,

    createMedia,
    readMedia,
    readMyMedia,
    deleteMedia,
  };
};
