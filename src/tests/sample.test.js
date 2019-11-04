import assert from 'assert';
import MockContainer from './mockContainer';

describe('Sample', () => {
  it('should add properly', async () => {
    let rejected = false;
    try {
      const container = MockContainer();
      assert.notEqual(Object.keys(container).length, 0);
      assert.equal(1 + 1, 2);
    } catch (error) {
      rejected = true;
    }

    assert.equal(rejected, false);
  });
});
