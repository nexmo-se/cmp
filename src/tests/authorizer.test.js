import assert from 'assert';
import MockContainer from './mockContainer';
import Authorizer from '../services/authorizer';

describe('Authorizer', () => {
  it('should not authorize properly (Missing User)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {};

      const allowedRoles = ['user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('should not authorize properly (Null User ID)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {},
      };

      const allowedRoles = ['user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('should not authorize properly (Empty User ID)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: '',
        },
      };

      const allowedRoles = ['user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('should not authorize properly (user does not have any roles)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: 'a',
          roles: [],
        },
      };

      const allowedRoles = ['user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('should not authorize properly (user does not have correct roles)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: 'a',
          roles: [{
            id: 'rid',
            role: 'admin',
          }],
        },
      };

      const allowedRoles = ['user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('should authorize properly (user have correct roles)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: 'a',
          roles: [{
            id: 'rid',
            role: 'user',
          }],
        },
      };

      const allowedRoles = ['user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });

  it('should authorize properly (user have one of the roles)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: 'a',
          roles: [{
            id: 'rid',
            role: 'user',
          }],
        },
      };

      const allowedRoles = ['admin', 'user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });

  it('should authorize properly (user have additional roles)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: 'a',
          roles: [{
            id: 'rid',
            role: 'user',
          }, {
            id: 'rid2',
            role: 'admin',
          }],
        },
      };

      const allowedRoles = ['user'];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });

  it('should not authorize properly (empty allowed roles)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: 'a',
          roles: [{
            id: 'rid',
            role: 'user',
          }],
        },
      };

      const allowedRoles = [];
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('should not authorize properly (null allowed roles)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authorizer = Authorizer(container);

      const req = {
        user: {
          id: 'a',
          roles: [{
            id: 'rid',
            role: 'user',
          }],
        },
      };

      const allowedRoles = null;
      await authorizer.authorize(allowedRoles)(req, {}, (err) => {
        if (err) {
          rejected = true;
          return Promise.resolve();
        }
        return Promise.resolve();
      });
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });
});
