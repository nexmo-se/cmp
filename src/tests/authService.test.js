import assert from 'assert';
import MockContainer from './mockContainer';
import AuthService from '../services/auth';
import AuthenticationError from '../errors/authError';

describe('Authentication Service', () => {
  it('basic - should authenticate properly', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.base64Service = {
        decode: a => Promise.resolve(a),
      };
      container.hashService = {
        hash: () => Promise.resolve('pwdHash'),
      };
      container.persistenceService = {
        User: {
          getUserByUsername: () => Promise.resolve({ id: 'userId', passwordHash: 'pwdHash', passwordSalt: 'pwdSalt' }),
        },
      };

      const authService = AuthService(container);

      const user = await authService.authenticateBasic('username', 'password');
      assert.equal(user.id, 'userId');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });

  it('basic - should not authenticate properly (wrong username)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.base64Service = {
        decode: a => Promise.resolve(a),
      };
      container.hashService = {
        hash: () => Promise.resolve('pwdHash'),
      };
      container.persistenceService = {
        User: {
          getUserByUsername: () => Promise.resolve(null),
        },
      };

      const authService = AuthService(container);

      await authService.authenticateBasic('username2', 'password');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('basic - should not authenticate properly (wrong password)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.base64Service = {
        decode: a => Promise.resolve(a),
      };
      container.hashService = {
        hash: () => Promise.resolve('pwdHash2'),
      };
      container.persistenceService = {
        User: {
          getUserByUsername: () => Promise.resolve({ id: 'userId', passwordHash: 'pwdHash', passwordSalt: 'pwdSalt' }),
        },
      };

      const authService = AuthService(container);

      await authService.authenticateBasic('username', 'password');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('bearer - should not authenticate properly (null token)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();

      const authService = AuthService(container);

      await authService.authenticateBearer(null);
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('bearer - should not authenticate properly (empty token)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();

      const authService = AuthService(container);

      await authService.authenticateBearer('');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('bearer - should not authenticate properly (invalid token)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();

      const authService = AuthService(container);
      container.jwtService = {
        decode: () => Promise.reject(AuthenticationError('test')),
      };

      await authService.authenticateBearer('token');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('bearer - should authenticate properly (valid token)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();

      const authService = AuthService(container);
      container.jwtService = {
        decode: () => Promise.resolve({ userId: 'userId' }),
      };
      container.persistenceService = {
        User: {
          readUser: () => Promise.resolve({ id: 'userId' }),
        },
      };

      const user = await authService.authenticateBearer('token');
      assert.equal(user.id, 'userId');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });
});
