/**
 * Persistence Service for CMP Voices
 * Create, Read, Delete and List Voices
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Voice Persistence Accessor');

  const listVoices = async (options = {}) => {
    try {
      const { CmpVoice } = container.databaseService.accessors;
      const cmpVoices = await CmpVoice.listVoices(options);
      const mappedCmpVoices = cmpVoices.map(mapVoice);
      return Promise.resolve(mappedCmpVoices);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createVoiceBatch = async (voiceList) => {
    try {
      const { CmpVoice } = container.databaseService.accessors;
      const creatableVoiceList = [];
      const creatableVoiceTextList = [];

      for (let i = 0; i < voiceList.length; i += 1) {
        const voiceItem = voiceList[i];

        const cmpVoiceId = voiceItem.id || container.uuid();

        creatableVoiceList.push({
          id: cmpVoiceId,
          voiceType: voiceItem.voiceType,
          language: voiceItem.language,
          style: voiceItem.style,
          streamUrl: voiceItem.streamUrl,
          answerUrl: voiceItem.answerUrl,
        });
      }

      await CmpVoice.createVoiceBatch(creatableVoiceList);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createVoice = async (
    voiceType, language, style,
    streamUrl, answerUrl,
  ) => {
    try {
      const { CmpVoice } = container.databaseService.accessors;

      // Create Voice
      const cmpVoice = await CmpVoice.createVoice(
        voiceType, language, style,
        streamUrl, answerUrl,
      );
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readVoice = async (cmpVoiceId) => {
    try {
      const { CmpVoice } = container.databaseService.accessors;
      const cmpVoice = await CmpVoice.readVoice(cmpVoiceId);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteVoice = async (cmpVoiceId, options = { noGet: true }) => {
    try {
      const { CmpVoice } = container.databaseService.accessors;
      const cmpVoice = await CmpVoice.deleteVoice(cmpVoiceId, options);
      return Promise.resolve(cmpVoice);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteVoices = async (criteria, options = { noGet: true }) => {
    try {
      const { CmpVoice } = container.databaseService.accessors;
      const cmpVoices = await CmpVoice.deleteVoices(criteria, options);
      return Promise.resolve(cmpVoices);
    } catch (error) {
      return Promise.reject(error);
    }
  };


  return {
    listVoices,

    createVoice,
    createVoiceBatch,

    readVoice,

    deleteVoice,
    deleteVoices,
  };
};
