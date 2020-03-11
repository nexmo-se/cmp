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
      return Promise.reject(error);
    }
  };

  const getByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const {
        CmpMediaLocation,
      } = container.databaseService.models;
      const query = {
        where: criteria,
      };

      // Check Deleted
      if (excludeDeleted) {
        query.where.deleted = false;
      }

      const rawCmpMediaLocations = await CmpMediaLocation.findAll(query);
      const cmpMediaLocations = rawCmpMediaLocations
        .map(cmpMediaLocation => mapCmpMediaLocation(cmpMediaLocation));
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const getOneByCriteria = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaLocations = await getByCriteria(criteria, excludeDeleted);
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

      const cmpMedia = await getById(cmpMediaLocationId, excludeDeleted);
      return Promise.resolve(cmpMedia);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateByCriteria = async (
    criteria = {}, changes = {}, excludeDeleted = true,
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

      const cmpMediaLocations = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
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

  const listMediaLocations = async () => {
    try {
      const cmpMediaLocations = await getByCriteria({}, true);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
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

  const updateMediaLocation = async (cmpMediaLocationId, changes) => {
    try {
      const cmpMediaLocation = await updateById(cmpMediaLocationId, changes, true);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const updateMediaLocations = async (criteria, changes) => {
    try {
      const cmpMediaLocations = await updateByCriteria(criteria, changes, true);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaLocation = async (cmpMediaLocationId) => {
    try {
      const changes = { deleted: true };
      const cmpMediaLocation = await updateById(cmpMediaLocationId, changes, true);
      return Promise.resolve(cmpMediaLocation);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const deleteMediaLocations = async (criteria = {}) => {
    try {
      const changes = { deleted: true };
      const cmpMediaLocations = await updateByCriteria(criteria, changes, true);
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

  const findMediaLocations = async (criteria = {}, excludeDeleted = true) => {
    try {
      const cmpMediaLocations = await getByCriteria(criteria, excludeDeleted);
      return Promise.resolve(cmpMediaLocations);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    listMediaLocations,

    createMediaLocation,
    readMediaLocation,

    updateMediaLocation,
    updateMediaLocations,

    deleteMediaLocation,
    deleteMediaLocations,

    findMediaLocation,
    findMediaLocations,
  };
};
