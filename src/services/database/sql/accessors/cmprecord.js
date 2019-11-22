export default (container) => {
  const { L } = container.defaultLogger('Cmp Record Model Accessor');

  const getById = async (cmpRecordId, excludeDeleted = true) => {
    try {
      const {
        CmpRecord, CmpCampaign, CmpChannel, CmpMedia, CmpParameter,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordId,
        },
        include: [
          {
            model: CmpCampaign,
            as: 'cmpCampaign',
            foreignKey: 'cmpCampaignId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpChannel,
            as: 'cmpChannel',
            foreignKey: 'cmpChannelId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMedia,
            as: 'cmpMedia',
            foreignKey: 'cmpMediaId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpParameter,
            as: 'cmpParameters',
            foreignKey: 'cmpParameterId',
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

      const rawCmpRecord = await CmpRecord.findOne(query);
      if (rawCmpRecord == null) {
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpRecord = mapCmpRecord(rawCmpRecord);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpRecord, CmpCampaign, CmpChannel, CmpMedia, CmpParameter,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        include: [
          {
            model: CmpCampaign,
            as: 'cmpCampaign',
            foreignKey: 'cmpCampaignId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpChannel,
            as: 'cmpChannel',
            foreignKey: 'cmpChannelId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpMedia,
            as: 'cmpMedia',
            foreignKey: 'cmpMediaId',
            where: {
              deleted: false,
            },
            required: false,
          },
          {
            model: CmpParameter,
            as: 'cmpParameters',
            foreignKey: 'cmpParameterId',
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

      const rawCmpRecords = await CmpRecord.findAll(query);
      const cmpRecords = rawCmpRecords
        .map(cmpRecord => mapCmpRecord(cmpRecord));
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecords = await getByCriteria(criteria, excludeDeleted);
      if (cmpRecords == null || cmpRecords.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpRecord = cmpRecords[0];
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpRecordId, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const query = {
        where: {
          id: cmpRecordId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecord.update(changes, query);
      L.debug('CmpRecord Update Result', result);

      const cmpRecord = await getById(cmpRecordId, excludeDeleted);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpRecord.update(changes, query);
      L.debug('CmpRecord Update Result', result);

      const cmpRecords = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const mapCmpCampaign = (cmpCampaign) => {

  };

  const mapCmpChannel = (cmpChannel) => {

  };

  const mapCmpMedia = (cmpMedia) => {

  };

  const mapCmpParameter = (cmpParameter) => {

  };

  const mapCmpRecord = (cmpRecord) => {
    const mappedCmpRecord = cmpRecord.dataValues;

    delete mappedCmpRecord.deleted;
    delete mappedCmpRecord.createdAt;
    delete mappedCmpRecord.updatedAt;

    return mappedCmpRecord;
  };

  const listRecords = async () => {
    try {
      const cmpRecords = await getByCriteria({}, true);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createRecord = async (
    recipient,
    cmpCampaignId,
    cmpChannelId,
    cmpMediaId,
    activeStartHour,
    activeStartMinute,
    activeEndHour,
    activeEndMinute,
    activeOnWeekends,
    timezone,
  ) => {
    try {
      const { CmpRecord } = container.databaseService.models;
      const rawCmpRecord = await CmpRecord.create({
        id: container.uuid(),
        recipient,
        cmpCampaignId,
        cmpChannelId,
        cmpMediaId,
        activeStartHour,
        activeStartMinute,
        activeEndHour,
        activeEndMinute,
        activeOnWeekends,
        timezone,
        status: 'draft',
        statusTime: new Date(),
        deleted: false,
      });

      const cmpRecord = mapCmpRecord(rawCmpRecord);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const readRecord = async (cmpRecordId) => {
    try {
      const cmpRecord = await getById(cmpRecordId, false);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecord = async (cmpRecordId, changes) => {
    try {
      const cmpRecord = await updateById(cmpRecordId, changes, true);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateRecords = async (criteria, changes) => {
    try {
      const cmpRecords = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecord = async (cmpRecordId) => {
    try {
      const changes = { deleted: true };
      const cmpRecord = await updateById(cmpRecordId, changes, true);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteRecords = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpRecords = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecord = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecord = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecord);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findRecords = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpRecords = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpRecords);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listRecords,

    createRecord,
    readRecord,

    updateRecord,
    updateRecords,

    deleteRecord,
    deleteRecords,

    findRecord,
    findRecords,
  };
};
