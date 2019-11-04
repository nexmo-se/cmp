import assert from 'assert';
import bcrypt from 'bcrypt';
import MockContainer from './mockContainer';
import HashService from '../services/hash';

describe('HashService', () => {
  it('should generate salt properly', async () => {
    const container = MockContainer();
    container.bcrypt = bcrypt;
    container.config = {
      hash: {
        saltRounds: 10,
      },
    };
    const hashService = HashService(container);
    const salt = await hashService.generateSalt();

    assert.equal(salt.length, 29);
  });

  it('should generate different salt everytime', async () => {
    const container = MockContainer();
    container.bcrypt = bcrypt;
    container.config = {
      hash: {
        saltRounds: 10,
      },
    };
    const hashService = HashService(container);
    const salt1 = await hashService.generateSalt();
    const salt2 = await hashService.generateSalt();

    assert.notEqual(salt1, salt2);
  });

  it('should hash properly', async () => {
    const container = MockContainer();
    container.bcrypt = bcrypt;
    container.config = {
      hash: {
        saltRounds: 10,
      },
    };
    const hashService = HashService(container);
    const plaintext = 'hello';
    const salt = '$2b$10$bbNBgZHf3q6f40MX4miTJu';
    const hash = await hashService.hash(plaintext, salt);

    assert.equal(hash, '$2b$10$bbNBgZHf3q6f40MX4miTJuMkwaSf7xjztyfQT2TLB5CMRk5/nfJvC');
  });
});
