import assert from 'assert';
import LoggerContainer from './loggerContainer';

describe('Sample', () => {
  it('should add properly', async () => {
    let rejected = false;
    try {
      const container = LoggerContainer();
      assert.equal(Object.keys(container).length, 1);
      assert.equal(1 + 1, 2);
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });
});
