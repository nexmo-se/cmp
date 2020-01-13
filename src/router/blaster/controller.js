export default (container) => {
  const { L } = container.defaultLogger('Blaster Controller');

  const blast = async (recordId) => {
    try {
      const { CmpRecord } = container.persistenceService;
      const record = await CmpRecord.readRecord(recordId, false);
      const {
        recipient, cmpTemplate, cmpParameters, cmpMedia,
      } = record;
      const { type } = cmpMedia || {};
      const {
        whatsappTemplateNamespace, whatsappTemplateName, body, cmpChannel,
      } = cmpTemplate;
      const {
        channel, senderId, cmpApiKey, cmpApplication, smsUseSignature,
      } = cmpChannel;
      const { applicationId, privateKey } = cmpApplication || {};
      const {
        apiKey, apiSecret, signatureSecret, signatureMethod,
      } = cmpApiKey;

      let result;
      if (channel === 'sms') {
        const parameters = cmpParameters
          .sort((a, b) => a.order - b.order)
          .map(cmpParameter => cmpParameter.parameter);
        const text = container.templateService.getText(body, parameters);
        result = await container.nexmoService.sms.sendText(
          recipient, text, 'text', senderId, apiKey, apiSecret,
          smsUseSignature, signatureSecret, signatureMethod,
        );
      } else if (channel === 'whatsapp') {
        const parameters = cmpParameters
          .sort((a, b) => a.order - b.order)
          .map(cmpParameter => cmpParameter.parameter);
        result = await container.nexmoService.whatsapp.sendTemplate(
          senderId, recipient, whatsappTemplateNamespace, whatsappTemplateName,
          type || 'text', cmpMedia, parameters, `rec_${recordId}`,
          applicationId, privateKey,
        );
      }

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const blastBatch = async (req, res, next) => {
    try {
      const { recordIds } = req.body;
      const promises = recordIds.map(recordId => blast(recordId));
      const results = await Promise.all(promises);
      res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  };

  const blastSingle = async (req, res, next) => {
    try {
      const { recordId } = req.body;
      const result = await blast(recordId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  return {
    blastBatch,
    blastSingle,
  };
};
