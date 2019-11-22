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
        L.debug('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaText = mapCmpMediaText(rawCmpMediaText);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpMediaText,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaTexts = await CmpMediaText.findAll(query);
      const cmpMediaTexts = rawCmpMediaTexts
        .map(cmpMediaText => mapCmpMediaText(cmpMediaText));
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaTexts = await getByCriteria(criteria, excludeDeleted);
      if (cmpMediaTexts == null || cmpMediaTexts.length === 0) {
        L.debug('Empty result when trying to Get One by Criteria, returning null');
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
      L.debug('CmpMediaText Update Result', result);

      const cmpMedia = await getById(cmpMediaTextId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
  ) => {
    try {
      const { CmpMediaText } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaText.update(changes, query);
      L.debug('CmpMediaText Update Result', result);

      const cmpMediaTexts = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
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

  const listMediaTexts = async () => {
    try {
      const cmpMediaTexts = await getByCriteria({}, true);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
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

  const updateMediaText = async (cmpMediaTextId, changes) => {
    try {
      const cmpMediaText = await updateById(cmpMediaTextId, changes, true);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaTexts = async (criteria, changes) => {
    try {
      const cmpMediaTexts = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaText = async (cmpMediaTextId) => {
    try {
      const changes = { deleted: true };
      const cmpMediaText = await updateById(cmpMediaTextId, changes, true);
      return Promise.resolve(cmpMediaText);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaTexts = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMediaTexts = await updateByCriteria(criteria, changes, true);
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

  const findMediaTexts = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaTexts = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaTexts);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaTexts,

    createMediaText,
    readMediaText,

    updateMediaText,
    updateMediaTexts,

    deleteMediaText,
    deleteMediaTexts,

    findMediaText,
    findMediaTexts,
  };
};
