export default (container) => {
  const generateCreatableRecord = (cmpRecordId, cmpMediaId, record) => {
    const {
      recipient,
      cmpCampaignId, cmpTemplateId, cmpMedia,
      activeStartHour, activeStartMinute,
      activeEndHour, activeEndMinute,
      activeOnWeekends, timezone,
    } = record;
    const sanitizedStart = container.dateTimeService
      .getDateInUtc(activeStartHour, activeStartMinute, timezone);
    const sanitizedEnd = container.dateTimeService
      .getDateInUtc(activeEndHour, activeEndMinute, timezone);

    const creatableRecord = {
      id: cmpRecordId,
      recipient,
      cmpCampaignId,
      cmpTemplateId,
      activeStartHour: sanitizedStart.getUTCHours(),
      activeStartMinute: sanitizedStart.getUTCMinutes(),
      activeEndHour: sanitizedEnd.getUTCHours(),
      activeEndMinute: sanitizedEnd.getUTCMinutes(),
      activeOnWeekends,
      timezone: container.dateTimeService.tzUTC,
      status: 'pending',
      statusTime: new Date(),
    };
    if (cmpMedia) {
      creatableRecord.cmpMediaId = cmpMediaId;
    }

    return creatableRecord;
  };

  const generateCreatableParameters = (cmpRecordId, record) => {
    const { cmpParameters } = record;

    const creatableParameters = [];

    for (let i = 0; i < cmpParameters.length; i += 1) {
      const creatableParameter = {
        cmpRecordId,
        parameter: cmpParameters[i],
        order: i,
      };

      creatableParameters.push(creatableParameter);
    }

    return creatableParameters;
  };

  const generateCreatableMedia = (cmpMediaId, record) => {
    const { cmpMedia } = record;

    if (cmpMedia) {
      const creatableMedia = {
        id: cmpMediaId,
        type: cmpMedia.type,
        text: cmpMedia.text,
        url: cmpMedia.url,
        caption: cmpMedia.caption,
        fileName: cmpMedia.fileName,
        latitude: cmpMedia.latitude,
        longitude: cmpMedia.longitude,
        name: cmpMedia.name,
        address: cmpMedia.address,
        actionUrl: cmpMedia.actionUrl,
      };

      return creatableMedia;
    }

    return null;
  };

  const generateCreatableMediaRaw = (cmpMediaId, cmpMediaTypeId, record) => {
    const { cmpMedia } = record;

    if (cmpMedia) {
      const creatableMedia = {
        id: cmpMediaId,
        mediaType: cmpMedia.type,
      };


      if (cmpMedia.type === 'text') {
        creatableMedia.cmpMediaTextId = cmpMediaTypeId;
      }
      if (cmpMedia.type === 'image') {
        creatableMedia.cmpMediaImageId = cmpMediaTypeId;
      }
      if (cmpMedia.type === 'audio') {
        creatableMedia.cmpMediaAudioId = cmpMediaTypeId;
      }
      if (cmpMedia.type === 'video') {
        creatableMedia.cmpMediaVideoId = cmpMediaTypeId;
      }
      if (cmpMedia.type === 'file') {
        creatableMedia.cmpMediaFileId = cmpMediaTypeId;
      }
      if (cmpMedia.type === 'location') {
        creatableMedia.cmpMediaLocationId = cmpMediaTypeId;
      }
      if (cmpMedia.type === 'viber_template') {
        creatableMedia.cmpMediaViberTemplateId = cmpMediaTypeId;
      }

      return creatableMedia;
    }

    return null;
  };

  const generateCreatableMediaAudio = (cmpMediaAudioId, record) => {
    const { cmpMedia } = record;
    return {
      id: cmpMediaAudioId,
      url: cmpMedia.url,
    };
  };

  const generateCreatableMediaFile = (cmpMediaFileId, record) => {
    const { cmpMedia } = record;
    return {
      id: cmpMediaFileId,
      url: cmpMedia.url,
      caption: cmpMedia.caption,
      fileName: cmpMedia.fileName,
    };
  };

  const generateCreatableMediaImage = (cmpMediaImageId, record) => {
    const { cmpMedia } = record;
    return {
      id: cmpMediaImageId,
      url: cmpMedia.url,
      caption: cmpMedia.caption,
    };
  };

  const generateCreatableMediaLocation = (cmpMediaLocationId, record) => {
    const { cmpMedia } = record;
    return {
      id: cmpMediaLocationId,
      latitude: cmpMedia.latitude,
      longitude: cmpMedia.longitude,
      name: cmpMedia.name,
      address: cmpMedia.address,
    };
  };

  const generateCreatableMediaText = (cmpMediaTextId, record) => {
    const { cmpMedia } = record;
    return {
      id: cmpMediaTextId,
      text: cmpMedia.text,
    };
  };

  const generateCreatableMediaViberTemplate = (cmpMediaViberTemplateId, record) => {
    const { cmpMedia } = record;
    return {
      id: cmpMediaViberTemplateId,
      url: cmpMedia.url,
      caption: cmpMedia.caption,
      actionUrl: cmpMedia.actionUrl,
    };
  };

  const generateCreatableMediaVideo = (cmpMediaVideoId, record) => {
    const { cmpMedia } = record;
    return {
      id: cmpMediaVideoId,
      url: cmpMedia.url,
      caption: cmpMedia.caption,
    };
  };

  return {
    generateCreatableRecord,
    generateCreatableParameters,
    generateCreatableMedia,

    generateCreatableMediaRaw,
    generateCreatableMediaAudio,
    generateCreatableMediaFile,
    generateCreatableMediaImage,
    generateCreatableMediaLocation,
    generateCreatableMediaText,
    generateCreatableMediaViberTemplate,
    generateCreatableMediaVideo,
  };
};
