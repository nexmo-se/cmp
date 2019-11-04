import assert from 'assert';
import MockContainer from './mockContainer';
import AuthService from '../services/auth';
import AuthenticationError from '../errors/authError';

describe('Authentication Service', () => {
  it('should authenticate properly', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.config = {
        user: {
          username: 'username',
          passwordHash: 'pwdHash',
          passwordSalt: 'pwdSalt',
        },
      };
      container.base64Service = {
        decode: a => Promise.resolve(a),
      };
      container.hashService = {
        hash: () => Promise.resolve('pwdHash'),
      };

      const authService = AuthService(container);

      await authService.authenticate('username', 'password');
    } catch (error) {
      console.log(error);
      rejected = true;
    }

    assert.equal(rejected, false);
  });

  it('should not authenticate properly (wrong username)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.config = {
        user: {
          username: 'username',
          passwordHash: 'pwdHash',
          passwordSalt: 'pwdSalt',
        },
      };
      container.base64Service = {
        decode: a => Promise.resolve(a),
      };
      container.hashService = {
        hash: () => Promise.resolve('pwdHash'),
      };

      const authService = AuthService(container);

      await authService.authenticate('username2', 'password');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });

  it('should not authenticate properly (wrong password)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.config = {
        user: {
          username: 'username',
          passwordHash: 'pwdHash',
          passwordSalt: 'pwdSalt',
        },
      };
      container.base64Service = {
        decode: a => Promise.resolve(a),
      };
      container.hashService = {
        hash: () => Promise.resolve('pwdHash2'),
      };

      const authService = AuthService(container);

      await authService.authenticate('username', 'password');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, true);
  });
});
