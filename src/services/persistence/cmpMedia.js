export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Persistence Accessor');

  const mapMedia = (media) => {
    let mediaData = {};
    if (media.mediaType === 'text') {
      mediaData = media.cmpMediaText;
    } else if (media.mediaType === 'image') {
      mediaData = media.cmpMediaImage;
    } else if (media.mediaType === 'audio') {
      mediaData = media.cmpMediaAudio;
    } else if (media.mediaType === 'video') {
      mediaData = media.cmpMediaVideo;
    } else if (media.mediaType === 'file') {
      mediaData = media.cmpMediaFile;
    } else if (media.mediaType === 'location') {
      mediaData = media.cmpMediaLocation;
    } else if (media.mediaType === 'viber_template') {
      mediaData = media.cmpMediaViberTemplate;
    }

    mediaData.typeId = mediaData.id;
    mediaData.id = media.id;
    mediaData.type = media.mediaType;

    return mediaData;
  };

  const listMedias = async () => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedias = await CmpMedia.listMedias();
      const mappedCmpMedias = cmpMedias.map(mapMedia);
      return Promise.resolve(mappedCmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMedia = async (
    type, text, url, caption, fileName, latitude, longitude, name, address, actionUrl,
  ) => {
    try {
      let media;
      if (type === 'text') {
        media = await createMediaText(text);
      } else if (type === 'image') {
        media = await createMediaImage(url, caption);
      } else if (type === 'audio') {
        media = await createMediaAudio(url);
      } else if (type === 'video') {
        media = await createMediaVideo(url, caption);
      } else if (type === 'file') {
        media = await createMediaFile(url, caption, fileName);
      } else if (type === 'location') {
        media = await createMediaLocation(latitude, longitude, name, address);
      } else if (type === 'viber_template') {
        media = await createMediaViberTemplate(url, caption, actionUrl);
      } else {
        throw new container.BadRequestError('Unknown Media Type');
      }

      return Promise.resolve(media);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaText = async (text) => {
    try {
      const { CmpMedia, CmpMediaText } = container.databaseService.accessors;

      // Create Media Text
      const cmpMediaText = await CmpMediaText.createMediaText(text);
      const cmpMediaTextId = cmpMediaText.id;

      // Create Media
      const cmpMedia = await CmpMedia.createMedia(
        'text',
        cmpMediaTextId,
        null,
        null,
        null,
        null,
        null,
        null,
      );
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaImage = async (url, caption) => {
    try {
      const { CmpMedia, CmpMediaImage } = container.databaseService.accessors;

      // Create Media Text
      const cmpMediaImage = await CmpMediaImage.createMediaImage(url, caption);
      const cmpMediaImageId = cmpMediaImage.id;

      // Create Media
      const cmpMedia = await CmpMedia.createMedia(
        'image',
        null,
        cmpMediaImageId,
        null,
        null,
        null,
        null,
        null,
      );
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaAudio = async (url) => {
    try {
      const { CmpMedia, CmpMediaAudio } = container.databaseService.accessors;

      // Create Media Text
      const cmpMediaAudio = await CmpMediaAudio.createMediaAudio(url);
      const cmpMediaAudioId = cmpMediaAudio.id;

      // Create Media
      const cmpMedia = await CmpMedia.createMedia(
        'audio',
        null,
        null,
        cmpMediaAudioId,
        null,
        null,
        null,
        null,
      );
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaVideo = async (url, caption) => {
    try {
      const { CmpMedia, CmpMediaVideo } = container.databaseService.accessors;

      // Create Media Text
      const cmpMediaVideo = await CmpMediaVideo.createMediaVideo(url, caption);
      const cmpMediaVideoId = cmpMediaVideo.id;

      // Create Media
      const cmpMedia = await CmpMedia.createMedia(
        'video',
        null,
        null,
        null,
        cmpMediaVideoId,
        null,
        null,
        null,
      );
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaFile = async (url, caption, fileName) => {
    try {
      const { CmpMedia, CmpMediaFile } = container.databaseService.accessors;

      // Create Media Text
      const cmpMediaFile = await CmpMediaFile.createMediaFile(url, caption, fileName);
      const cmpMediaFileId = cmpMediaFile.id;

      // Create Media
      const cmpMedia = await CmpMedia.createMedia(
        'file',
        null,
        null,
        null,
        null,
        cmpMediaFileId,
        null,
        null,
      );
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaLocation = async (
    latitude, longitude, name, address,
  ) => {
    try {
      const { CmpMedia, CmpMediaLocation } = container.databaseService.accessors;

      // Create Media Text
      const cmpMediaLocation = await CmpMediaLocation.createMediaLocation(
        latitude, longitude, name, address,
      );
      const cmpMediaLocationId = cmpMediaLocation.id;

      // Create Media
      const cmpMedia = await CmpMedia.createMedia(
        'location',
        null,
        null,
        null,
        null,
        null,
        cmpMediaLocationId,
        null,
      );
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaViberTemplate = async (url, caption, actionUrl) => {
    try {
      const { CmpMedia, CmpMediaViberTemplate } = container.databaseService.accessors;

      // Create Media Text
      const cmpMediaViberTemplate = await CmpMediaViberTemplate.createMediaViberTemplate(
        url, caption, actionUrl,
      );
      const cmpMediaViberTemplateId = cmpMediaViberTemplate.id;

      // Create Media
      const cmpMedia = await CmpMedia.createMedia(
        'viber_template',
        null,
        null,
        null,
        null,
        null,
        null,
        cmpMediaViberTemplateId,
      );
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readMedia = async (cmpMediaId) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedia = await CmpMedia.readMedia(cmpMediaId);
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMedia = async (cmpMediaId) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedia = await CmpMedia.deleteMedia(cmpMediaId);
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMedias = async (criteria) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedias = await CmpMedia.deleteMedias(criteria);
      const mappedCmpMedias = cmpMedias.map(mapMedia);
      return Promise.resolve(mappedCmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listMedias,

    createMedia,
    readMedia,

    deleteMedia,
    deleteMedias,
  };
};
