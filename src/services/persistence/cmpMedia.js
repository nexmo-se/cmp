/**
 * Persistence Service for CMP Media (Whatsapp/Viber/Facebook Messenger)
 * Create, Read, Delete and List Media (Whatsapp/Viber/Facebook Messenger)
 */

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

  const listMedias = async (options = {}) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedias = await CmpMedia.listMedias(options);
      const mappedCmpMedias = cmpMedias.map(mapMedia);
      return Promise.resolve(mappedCmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaBatch = async (mediaList) => {
    try {
      const mediaTextList = [];
      const mediaImageList = [];
      const mediaAudioList = [];
      const mediaVideoList = [];
      const mediaFileList = [];
      const mediaLocationList = [];
      const mediaViberTemplateList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];
        const { type } = mediaItem;
        if (type === 'text') {
          mediaTextList.push(mediaItem);
        } else if (type === 'image') {
          mediaImageList.push(mediaItem);
        } else if (type === 'audio') {
          mediaAudioList.push(mediaItem);
        } else if (type === 'video') {
          mediaVideoList.push(mediaItem);
        } else if (type === 'file') {
          mediaFileList.push(mediaItem);
        } else if (type === 'location') {
          mediaLocationList.push(mediaItem);
        } else if (type === 'viber_template') {
          mediaViberTemplateList.push(mediaItem);
        }
      }

      if (mediaTextList.length > 0) {
        L.trace(`Batch Creating Text Media [${mediaTextList.length}]`);
        await createMediaTextBatch(mediaTextList);
      }

      if (mediaImageList.length > 0) {
        L.trace(`Batch Creating Image Media [${mediaImageList.length}]`);
        await createMediaImageBatch(mediaImageList);
      }

      if (mediaAudioList.length > 0) {
        L.trace(`Batch Creating Audio Media [${mediaAudioList.length}]`);
        await createMediaAudioBatch(mediaAudioList);
      }

      if (mediaVideoList.length > 0) {
        L.trace(`Batch Creating Video Media [${mediaVideoList.length}]`);
        await createMediaVideoBatch(mediaVideoList);
      }

      if (mediaFileList.length > 0) {
        L.trace(`Batch Creating File Media [${mediaFileList.length}]`);
        await createMediaFileBatch(mediaFileList);
      }

      if (mediaLocationList.length > 0) {
        L.trace(`Batch Creating Location Media [${mediaLocationList.length}]`);
        await createMediaLocationBatch(mediaLocationList);
      }

      if (mediaViberTemplateList.length > 0) {
        L.trace(`Batch Creating Viber Template Media [${mediaViberTemplateList.length}]`);
        await createMediaViberTemplateBatch(mediaViberTemplateList);
      }

      return Promise.resolve();
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

  const createMediaTextBatch = async (mediaList) => {
    try {
      const { CmpMedia, CmpMediaText } = container.databaseService.accessors;
      const creatableMediaList = [];
      const creatableMediaTextList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];

        const cmpMediaId = mediaItem.id || container.uuid();
        const cmpMediaTextId = container.uuid();

        creatableMediaTextList.push({
          id: cmpMediaTextId,
          text: mediaItem.text,
        });

        creatableMediaList.push({
          id: cmpMediaId,
          mediaType: 'text',
          cmpMediaTextId,
          cmpMediaImageId: null,
          cmpMediaAudioId: null,
          cmpMediaVideoId: null,
          cmpMediaFileId: null,
          cmpMediaLocationId: null,
          cmpMediaViberTemplateId: null,
        });
      }

      await CmpMediaText.createMediaTextBatch(creatableMediaTextList);
      await CmpMedia.createMediaBatch(creatableMediaList);
      return Promise.resolve();
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

  const createMediaImageBatch = async (mediaList) => {
    try {
      const { CmpMedia, CmpMediaImage } = container.databaseService.accessors;
      const creatableMediaList = [];
      const creatableMediaImageList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];

        const cmpMediaId = mediaItem.id || container.uuid();
        const cmpMediaImageId = container.uuid();

        creatableMediaImageList.push({
          id: cmpMediaImageId,
          url: mediaItem.url,
          caption: mediaItem.caption,
        });

        creatableMediaList.push({
          id: cmpMediaId,
          mediaType: 'image',
          cmpMediaTextId: null,
          cmpMediaImageId,
          cmpMediaAudioId: null,
          cmpMediaVideoId: null,
          cmpMediaFileId: null,
          cmpMediaLocationId: null,
          cmpMediaViberTemplateId: null,
        });
      }

      await CmpMediaImage.createMediaImageBatch(creatableMediaImageList);
      await CmpMedia.createMediaBatch(creatableMediaList);
      return Promise.resolve();
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

  const createMediaAudioBatch = async (mediaList) => {
    try {
      const { CmpMedia, CmpMediaAudio } = container.databaseService.accessors;
      const creatableMediaList = [];
      const creatableMediaAudioList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];

        const cmpMediaId = mediaItem.id || container.uuid();
        const cmpMediaAudioId = container.uuid();

        creatableMediaAudioList.push({
          id: cmpMediaAudioId,
          url: mediaItem.url,
        });

        creatableMediaList.push({
          id: cmpMediaId,
          mediaType: 'audio',
          cmpMediaTextId: null,
          cmpMediaImageId: null,
          cmpMediaAudioId,
          cmpMediaVideoId: null,
          cmpMediaFileId: null,
          cmpMediaLocationId: null,
          cmpMediaViberTemplateId: null,
        });
      }

      await CmpMediaAudio.createMediaAudioBatch(creatableMediaAudioList);
      await CmpMedia.createMediaBatch(creatableMediaList);
      return Promise.resolve();
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

  const createMediaVideoBatch = async (mediaList) => {
    try {
      const { CmpMedia, CmpMediaVideo } = container.databaseService.accessors;
      const creatableMediaList = [];
      const creatableMediaVideoList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];

        const cmpMediaId = mediaItem.id || container.uuid();
        const cmpMediaVideoId = container.uuid();

        creatableMediaVideoList.push({
          id: cmpMediaVideoId,
          url: mediaItem.url,
          caption: mediaItem.caption,
        });

        creatableMediaList.push({
          id: cmpMediaId,
          mediaType: 'video',
          cmpMediaTextId: null,
          cmpMediaImageId: null,
          cmpMediaAudioId: null,
          cmpMediaVideoId,
          cmpMediaFileId: null,
          cmpMediaLocationId: null,
          cmpMediaViberTemplateId: null,
        });
      }

      await CmpMediaVideo.createMediaVideoBatch(creatableMediaVideoList);
      await CmpMedia.createMediaBatch(creatableMediaList);
      return Promise.resolve();
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

  const createMediaFileBatch = async (mediaList) => {
    try {
      const { CmpMedia, CmpMediaFile } = container.databaseService.accessors;
      const creatableMediaList = [];
      const creatableMediaFileList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];

        const cmpMediaId = mediaItem.id || container.uuid();
        const cmpMediaFileId = container.uuid();

        creatableMediaFileList.push({
          id: cmpMediaFileId,
          url: mediaItem.url,
          caption: mediaItem.caption,
          fileName: mediaItem.fileName,
        });

        creatableMediaList.push({
          id: cmpMediaId,
          mediaType: 'file',
          cmpMediaTextId: null,
          cmpMediaImageId: null,
          cmpMediaAudioId: null,
          cmpMediaVideoId: null,
          cmpMediaFileId,
          cmpMediaLocationId: null,
          cmpMediaViberTemplateId: null,
        });
      }

      await CmpMediaFile.createMediaFileBatch(creatableMediaFileList);
      await CmpMedia.createMediaBatch(creatableMediaList);
      return Promise.resolve();
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

  const createMediaLocationBatch = async (mediaList) => {
    try {
      const { CmpMedia, CmpMediaLocation } = container.databaseService.accessors;
      const creatableMediaList = [];
      const creatableMediaLocationList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];

        const cmpMediaId = mediaItem.id || container.uuid();
        const cmpMediaLocationId = container.uuid();

        creatableMediaLocationList.push({
          id: cmpMediaLocationId,
          latitude: mediaItem.latitude,
          longitude: mediaItem.longitude,
          name: mediaItem.name,
          address: mediaItem.address,
        });

        creatableMediaList.push({
          id: cmpMediaId,
          mediaType: 'location',
          cmpMediaTextId: null,
          cmpMediaImageId: null,
          cmpMediaAudioId: null,
          cmpMediaVideoId: null,
          cmpMediaFileId: null,
          cmpMediaLocationId,
          cmpMediaViberTemplateId: null,
        });
      }

      await CmpMediaLocation.createMediaLocationBatch(creatableMediaLocationList);
      await CmpMedia.createMediaBatch(creatableMediaList);
      return Promise.resolve();
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

  const createMediaViberTemplateBatch = async (mediaList) => {
    try {
      const { CmpMedia, CmpMediaViberTemplate } = container.databaseService.accessors;
      const creatableMediaList = [];
      const creatableMediaViberTemplateList = [];

      for (let i = 0; i < mediaList.length; i += 1) {
        const mediaItem = mediaList[i];

        const cmpMediaId = mediaItem.id || container.uuid();
        const cmpMediaViberTemplateId = container.uuid();

        creatableMediaViberTemplateList.push({
          id: cmpMediaViberTemplateId,
          url: mediaItem.url,
          caption: mediaItem.caption,
          actionUrl: mediaItem.actionUrl,
        });

        creatableMediaList.push({
          id: cmpMediaId,
          mediaType: 'viber_template',
          cmpMediaTextId: null,
          cmpMediaImageId: null,
          cmpMediaAudioId: null,
          cmpMediaVideoId: null,
          cmpMediaFileId: null,
          cmpMediaLocationId: null,
          cmpMediaViberTemplateId,
        });
      }

      await CmpMediaViberTemplate.createMediaViberTemplateBatch(creatableMediaViberTemplateList);
      await CmpMedia.createMediaBatch(creatableMediaList);
      return Promise.resolve();
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

  const deleteMedia = async (cmpMediaId, options = { noGet: true }) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedia = await CmpMedia.deleteMedia(cmpMediaId, options);
      const mappedCmpMedia = mapMedia(cmpMedia);
      return Promise.resolve(mappedCmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMedias = async (criteria, options = { noGet: true }) => {
    try {
      const { CmpMedia } = container.databaseService.accessors;
      const cmpMedias = await CmpMedia.deleteMedias(criteria, options);
      const mappedCmpMedias = cmpMedias.map(mapMedia);
      return Promise.resolve(mappedCmpMedias);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listMedias,

    createMedia,
    createMediaBatch,

    readMedia,

    deleteMedia,
    deleteMedias,
  };
};
