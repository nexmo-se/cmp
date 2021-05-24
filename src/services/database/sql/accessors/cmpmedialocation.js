/**
 * Accessor Service for CMP Media (Location)
 * Create, Read, Update, Delete and List Location Media
 */

 export default (container) => {
  const { L } = container.defaultLogger('Cmp Media Location Model Accessor');

  const getById = async (cmpMediaLocationId, excludeDeleted = true) => {
    try {
      const {
        CmpMediaLocation,
      } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaLocationId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaLocation = await CmpMediaLocation.findOne(query);
      if (rawCmpMediaLocation == null) {
        L.trace('Null result for Get By Id, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaLocation = mapCmpMediaLocation(rawCmpMediaLocation);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return getById(cmpMediaLocationId, excludeDeleted);
      }
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const {
        CmpMediaLocation,
      } = container.databaseService.models;
      const query = {
        where: criteria,
        order: [
          ['name', 'ASC'],
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

      const rawCmpMediaLocations = await CmpMediaLocation.findAll(query);
      const cmpMediaLocations = rawCmpMediaLocations
        .map(cmpMediaLocation => mapCmpMediaLocation(cmpMediaLocation));
      return Promise.resolve(cmpMediaLocations);
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
      const cmpMediaLocations = await getByCriteria(criteria, excludeDeleted, options);
      if (cmpMediaLocations == null || cmpMediaLocations.length === 0) {
        L.trace('Empty result when trying to Get One by Criteria, returning null');
        return Promise.resolve(null);
      }

      const cmpMediaLocation = cmpMediaLocations[0];
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateById = async (
    cmpMediaLocationId, changes = {}, excludeDeleted = true,
    options = {},
  ) => {
    try {
      const { CmpMediaLocation } = container.databaseService.models;
      const query = {
        where: {
          id: cmpMediaLocationId,
        },
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaLocation.update(changes, query);
      L.trace('CmpMediaLocation Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMedia = await getById(cmpMediaLocationId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateById(cmpMediaLocationId, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true, options = {},
  ) => {
    try {
      const { CmpMediaLocation } = container.databaseService.models;
      const query = { where: criteria };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const result = await CmpMediaLocation.update(changes, query);
      L.trace('CmpMediaLocation Update Result', result);

      if (options && options.noGet) {
        return Promise.resolve();
      }

      const cmpMediaLocations = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return updateByCriteria(criteria, changes, excludeDeleted, options);
      }
      return Promise.reject(error);
    }
  };

  const mapCmpMediaLocation = (cmpMediaLocation) => {
    const mappedCmpMediaLocation = cmpMediaLocation.dataValues;

    delete mappedCmpMediaLocation.deleted;
    delete mappedCmpMediaLocation.createdAt;
    delete mappedCmpMediaLocation.updatedAt;

    return mappedCmpMediaLocation;
  };

  const listMediaLocations = async (options = {}) => {
    try {
      const cmpMediaLocations = await getByCriteria({}, true, options);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const createMediaLocationBatch = async (mediaList) => {
    try {
      const { CmpMediaLocation } = container.databaseService.models;
      const creatableMediaList = mediaList.map(mediaItem => ({
        id: mediaItem.id || container.uuid(),
        latitude: mediaItem.latitude,
        longitude: mediaItem.longitude,
        name: mediaItem.name,
        address: mediaItem.address,
        deleted: false,
      }));
      const rawCmpMediaLocations = await CmpMediaLocation.bulkCreate(creatableMediaList);
      const cmpMediaLocations = rawCmpMediaLocations.map(mapCmpMediaLocation);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaLocationBatch(mediaList);
      }
      return Promise.reject(error);
    }
  };

  const createMediaLocation = async (
    latitude, longitude, name, address,
  ) => {
    try {
      const { CmpMediaLocation } = container.databaseService.models;
      const rawCmpMediaLocation = await CmpMediaLocation.create({
        id: container.uuid(),
        latitude,
        longitude,
        name,
        address,
        deleted: false,
      });

      const cmpMediaLocation = mapCmpMediaLocation(rawCmpMediaLocation);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      if (error.name === 'SequelizeConnectionAcquireTimeoutError') {
        return createMediaLocation(latitude, longitude, name, address);
      }
      return Promise.reject(error);
    }
  };

  const readMediaLocation = async (cmpMediaLocationId) => {
    try {
      const cmpMediaLocation = await getById(cmpMediaLocationId, false);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaLocation = async (cmpMediaLocationId, changes, options = {}) => {
    try {
      const cmpMediaLocation = await updateById(cmpMediaLocationId, changes, true, options);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaLocations = async (criteria, changes, options = {}) => {
    try {
      const cmpMediaLocations = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaLocation = async (cmpMediaLocationId, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaLocation = await updateById(cmpMediaLocationId, changes, true, options);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaLocations = async (criteria = {}, options = { noGet: true }) => {
    try {
      const changes = { deleted: true };
      const cmpMediaLocations = await updateByCriteria(criteria, changes, true, options);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaLocation = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaLocation = await getOneByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const findMediaLocations = async (criteria = {}, excludeDeleted = true, options = {}) => {
    try {
      const cmpMediaLocations = await getByCriteria(criteria, excludeDeleted, options);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaLocations,

    createMediaLocation,
    createMediaLocationBatch,

    readMediaLocation,

    updateMediaLocation,
    updateMediaLocations,

    deleteMediaLocation,
    deleteMediaLocations,

    findMediaLocation,
    findMediaLocations,
  };
};
