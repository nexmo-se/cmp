/**
 * Generate Simple Objects that can be saved into the database directly
 */

export default (container) => {
  const generateCreatableRecord = (cmpRecordId, cmpMediaId, cmpVoiceId, record) => {
    const {
      recipient,
      cmpCampaignId, cmpTemplateId, cmpMedia, cmpVoice,
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
    if (cmpVoice) {
      creatableRecord.cmpVoiceId = cmpVoiceId;
    }

    return creatableRecord;
  };

  const generateCreatableParameters = (cmpRecordId, record) => {
    const { cmpParameters } = record;

    const creatableParameters = [];

    for (let i = 0; i < cmpParameters.length; i += 1) {
      const id = container.uuid();
      const creatableParameter = {
        id,
        cmpRecordId,
        parameter: cmpParameters[i],
        order: i,
      };

      creatableParameters.push(creatableParameter);
    }

    return creatableParameters;
  };

  const generateCreatableVoice = (cmpVoiceId, record) => {
    const { cmpVoice } = record;

    if (cmpVoice) {
      const creatableVoice = {
        id: cmpVoiceId,
        voiceType: cmpVoice.voiceType,
        language: cmpVoice.language,
        style: cmpVoice.style,
        streamUrl: cmpVoice.streamUrl,
        answerUrl: cmpVoice.answerUrl,
      };

      return creatableVoice;
    }

    return null;
  };

  const generateCreatableMedia = (cmpMediaId, record) => {
    const { cmpMedia } = record;

    if (cmpMedia) {
      const creatableMedia = {
        id: cmpMediaId,
        type: cmpMedia.mediaType,
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
        mediaType: cmpMedia.mediaType,
      };


      if (cmpMedia.mediaType === 'text') {
        creatableMedia.cmpMediaTextId = cmpMediaTypeId;
      }
      if (cmpMedia.mediaType === 'image') {
        creatableMedia.cmpMediaImageId = cmpMediaTypeId;
      }
      if (cmpMedia.mediaType === 'audio') {
        creatableMedia.cmpMediaAudioId = cmpMediaTypeId;
      }
      if (cmpMedia.mediaType === 'video') {
        creatableMedia.cmpMediaVideoId = cmpMediaTypeId;
      }
      if (cmpMedia.mediaType === 'file') {
        creatableMedia.cmpMediaFileId = cmpMediaTypeId;
      }
      if (cmpMedia.mediaType === 'location') {
        creatableMedia.cmpMediaLocationId = cmpMediaTypeId;
      }
      if (cmpMedia.mediaType === 'viber_template') {
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
    generateCreatableVoice,
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
