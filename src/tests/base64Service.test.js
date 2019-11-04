import assert from 'assert';
import MockContainer from './mockContainer';
import Base64Service from '../services/base64';

describe('Base64 Service', () => {
  it('should encode properly', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const base64Service = Base64Service(container);
      const plaintext = 'abcdef';
      const encodedText = await base64Service.encode(plaintext);

      assert.equal(encodedText, 'YWJjZGVm');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });

  it('should decode properly', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      const base64Service = Base64Service(container);
      const encodedText = 'YWJjZGVm';
      const plaintext = await base64Service.decode(encodedText);

      assert.equal(plaintext, 'abcdef');
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });
});
