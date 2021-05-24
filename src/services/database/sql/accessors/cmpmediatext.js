/**
 * Accessor Service for CMP Media (Header Text)
 * Create, Read, Update, Delete and List Header Text Media
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Text Model Accessor');

  const getById = async (cmpMediaTextId, excludeDeleted = true) => {
    try {
      const {
        CmpMediaText,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaTextId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaText = await CmpMediaText.findOne(query);
      if (rawCmpMediaText == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaText = mapCmpMediaText(rawCmpMediaText);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpMediaTextId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpMediaText,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['createdAt', 'DESC'],
        ],
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      if (options && options.limit && options.limit > 0) {
        query.limit = options.limit;
      }

      if (options && options.offset && options.offset > 0) {
        query.offset = options.offset;
      }

      const rawCmpMediaTexts = await CmpMediaText.findAll(query);
      const cmpMediaTexts = rawCmpMediaTexts
        .map(cmpMediaText => mapCmpMediaText(cmpMediaText));
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getByCriteria(criteria, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const options = { limit: 1, offset: 0 };
      const cmpMediaTexts = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpMediaTexts == null || cmpMediaTexts.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaText = cmpMediaTexts[0];
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaTextId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpMediaText } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaTextId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaText.update(changes, query);
      L.trace('CmpMediaText Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpMediaTextId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpMediaTextId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaText } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaText.update(changes, query);
      L.trace('CmpMediaText Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMediaTexts = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
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

  const listMediaTexts = async (options = {}) => {
    try {
      const cmpMediaTexts = await getByCriteria({}, true, options);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaTextBatch = async (mediaList) => {
    try {
      const { CmpMediaText } = container.databaseService.models;
      const creatableMediaList = mediaList.map(mediaItem => ({
        id: mediaItem.id || container.uuid(),
        text: mediaItem.text,
        deleted: false,
      }));
      const rawCmpMediaTexts = await CmpMediaText.bulkCreate(creatableMediaList);
      const cmpMediaTexts = rawCmpMediaTexts.map(mapCmpMediaText);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaTextBatch(mediaList);
      }
      return Promise.reject(error);
    }
  };

  const createMediaText = async (
    text,
  ) => {
    try {
      const { CmpMediaText } = container.databaseService.models;
      const rawCmpMediaText = await CmpMediaText.create({
        id: container.uuid(),
        text,
        deleted: false,
      });

      const cmpMediaText = mapCmpMediaText(rawCmpMediaText);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaText(text);
      }
      return Promise.reject(error);
    }
  };

  const readMediaText = async (cmpMediaTextId) => {
    try {
      const cmpMediaText = await getById(cmpMediaTextId, false);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaText = async (cmpMediaTextId, changes, options = {}) => {
    try {
      const cmpMediaText = await updateById(cmpMediaTextId, changes, true, options);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaTexts = async (criteria, changes, options = {}) => {
    try {
      const cmpMediaTexts = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaText = async (cmpMediaTextId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaText = await updateById(cmpMediaTextId, changes, true, options);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaTexts = async (criteria = {}, options = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMediaTexts = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaText = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaText = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaTexts = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpMediaTexts = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaTexts,

    createMediaText,
    createMediaTextBatch,

    readMediaText,

    updateMediaText,
    updateMediaTexts,

    deleteMediaText,
    deleteMediaTexts,

    findMediaText,
    findMediaTexts,
  };
};
