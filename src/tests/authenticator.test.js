import assert from 'assert';
import MockContainer from './mockContainer';
import Authenticator from '../services/authenticator';

describe('Authenticator', () => {
  it('should not authenticate properly (Missing Header)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authenticator = Authenticator(container);

      const req = {};

      await authenticator.checkAuthentication(req, {}, (err) => {
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

  it('should not authenticate properly (Missing Header Value)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const authenticator = Authenticator(container);

      const req = {
        headers: {},
      };

      await authenticator.checkAuthentication(req, {}, (err) => {
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

  it('should authenticate properly (Valid auth)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.authService = {
        authenticateBasic: async () => Promise.resolve(),
      };
      container.base64Service = {
        decode: async () => Promise.resolve('abc:def'),
      };
      const authenticator = Authenticator(container);

      const req = {
        headers: {
          Authorization: 'Basic aaa',
        },
      };

      await authenticator.checkAuthentication(req, {}, (err) => {
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

  it('should not authenticate properly (Invalid auth scheme)', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      container.authService = {
        authenticate: async () => Promise.resolve(),
      };
      container.base64Service = {
        decode: async () => Promise.resolve('abc:def'),
      };
      const authenticator = Authenticator(container);

      const req = {
        headers: {
          Authorization: 'Basics aaa',
        },
      };

      await authenticator.checkAuthentication(req, {}, (err) => {
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
