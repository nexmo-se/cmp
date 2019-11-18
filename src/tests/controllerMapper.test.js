import assert from 'assert';
import MockContainer from './mockContainer';
import ControllerMapper from '../services/controllerMapper';

describe('Authenticator', () => {
  it('should use next (no user)', async () => {
    let rejected = false;
    let isNext = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [];
      const req = {};
      await controllerMapper.map(configs)(req, {}, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
    assert.equal(isNext, true);
  });

  it('should use next (user has no roles (null roles))', async () => {
    let rejected = false;
    let isNext = false;
    let isUsingCorrectController = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [
        { roles: ['user'], controller: (_, res) => res.send() },
      ];
      const req = {
        user: {},
      };
      const res = {
        send: () => {
          isUsingCorrectController = true;
        },
      };
      await controllerMapper.map(configs)(req, res, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
    assert.equal(isNext, true);
    assert.equal(isUsingCorrectController, false);
  });

  it('should use next (user has no roles (empty roles))', async () => {
    let rejected = false;
    let isNext = false;
    let isUsingCorrectController = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [
        { roles: ['user'], controller: (_, res) => res.send() },
      ];
      const req = {
        user: {
          roles: [],
        },
      };
      const res = {
        send: () => {
          isUsingCorrectController = true;
        },
      };
      await controllerMapper.map(configs)(req, res, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
    assert.equal(isNext, true);
    assert.equal(isUsingCorrectController, false);
  });

  it('should use next (user has wrong roles)', async () => {
    let rejected = false;
    let isNext = false;
    let isUsingCorrectController = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [
        { roles: ['user'], controller: (_, res) => res.send() },
      ];
      const req = {
        user: {
          roles: [{ role: 'abc' }],
        },
      };
      const res = {
        send: () => {
          isUsingCorrectController = true;
        },
      };
      await controllerMapper.map(configs)(req, res, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
    assert.equal(isNext, true);
    assert.equal(isUsingCorrectController, false);
  });

  it('should use sync controller (user has correct roles)', async () => {
    let rejected = false;
    let isNext = false;
    let isUsingCorrectController = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [
        { roles: ['user'], controller: (_, res) => res.send() },
      ];
      const req = {
        user: {
          roles: [{ role: 'user' }],
        },
      };
      const res = {
        send: () => {
          isUsingCorrectController = true;
        },
      };
      await controllerMapper.map(configs)(req, res, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
    assert.equal(isNext, false);
    assert.equal(isUsingCorrectController, true);
  });

  it('should use async controller (user has correct roles)', async () => {
    let rejected = false;
    let isNext = false;
    let isUsingCorrectController = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [
        {
          roles: ['user'],
          controller: async (_, res) => {
            res.send();
          },
        },
      ];
      const req = {
        user: {
          roles: [{ role: 'user' }],
        },
      };
      const res = {
        send: () => {
          isUsingCorrectController = true;
        },
      };
      await controllerMapper.map(configs)(req, res, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
    assert.equal(isNext, false);
    assert.equal(isUsingCorrectController, true);
  });

  it('should use next (user has not all roles)', async () => {
    let rejected = false;
    let isNext = false;
    let isUsingCorrectController = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [
        {
          roles: ['user', 'admin'],
          controller: async (_, res) => {
            res.send();
          },
        },
      ];
      const req = {
        user: {
          roles: [{ role: 'user' }],
        },
      };
      const res = {
        send: () => {
          isUsingCorrectController = true;
        },
      };
      await controllerMapper.map(configs)(req, res, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
    assert.equal(isNext, true);
    assert.equal(isUsingCorrectController, false);
  });

  it('should use controller (user has more roles)', async () => {
    let rejected = false;
    let isNext = false;
    let isUsingCorrectController = false;
    try {
      const container = MockContainer();
      const controllerMapper = ControllerMapper(container);

      const configs = [
        {
          roles: ['user', 'admin'],
          controller: async (_, res) => {
            res.send();
          },
        },
      ];
      const req = {
        user: {
          roles: [
            { role: 'user' },
            { role: 'admin' },
            { role: 'sysadmin' },
          ],
        },
      };
      const res = {
        send: () => {
          isUsingCorrectController = true;
        },
      };
      await controllerMapper.map(configs)(req, res, (err) => {
        isNext = true;
        if (err) {
          rejected = true;
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
    assert.equal(isNext, false);
    assert.equal(isUsingCorrectController, true);
  });
});
