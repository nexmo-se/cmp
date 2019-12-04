import assert from 'assert';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

import MockContainer from './mockContainer';
import DateTimeService from '../services/datetime';

describe('DateTimeService', () => {
  it('should be start of day Singapore time', () => {
    const container = MockContainer();
    container.moment = moment;
    container.momentTimezone = momentTimezone;
    const dateTimeService = DateTimeService(container);

    const utcDate = dateTimeService.getDateInUtc(0, 0, 'Asia/Singapore');
    assert.equal(utcDate.getUTCHours(), 16);
    assert.equal(utcDate.getUTCMinutes(), 0);
  });

  it('should be start of day San Francisco time', () => {
    const container = MockContainer();
    container.moment = moment;
    container.momentTimezone = momentTimezone;
    const dateTimeService = DateTimeService(container);

    const utcDate = dateTimeService.getDateInUtc(0, 0, 'America/Los_Angeles');
    assert.equal(utcDate.getUTCHours(), 8);
    assert.equal(utcDate.getUTCMinutes(), 0);
  });

  it('should be correct for Jakarta time', () => {
    const container = MockContainer();
    container.moment = moment;
    container.momentTimezone = momentTimezone;
    const dateTimeService = DateTimeService(container);

    const utcDate = dateTimeService.getDateInUtc(14, 11, 'Asia/Jakarta');
    assert.equal(utcDate.getUTCHours(), 7);
    assert.equal(utcDate.getUTCMinutes(), 11);
  });

  it('should be correct for Rangoon time', () => {
    const container = MockContainer();
    container.moment = moment;
    container.momentTimezone = momentTimezone;
    const dateTimeService = DateTimeService(container);

    const utcDate = dateTimeService.getDateInUtc(13, 23, 'Asia/Rangoon');
    assert.equal(utcDate.getUTCHours(), 6);
    assert.equal(utcDate.getUTCMinutes(), 53);
  });

  it('should be correct for Antarctica/Troll time', () => {
    const container = MockContainer();
    container.moment = moment;
    container.momentTimezone = momentTimezone;
    const dateTimeService = DateTimeService(container);

    const utcDate = dateTimeService.getDateInUtc(13, 23, 'Antarctica/Troll');
    assert.equal(utcDate.getUTCHours(), 13);
    assert.equal(utcDate.getUTCMinutes(), 23);
  });

  it('should be correct current time', () => {
    const container = MockContainer();
    container.moment = moment;
    container.momentTimezone = momentTimezone;
    const dateTimeService = DateTimeService(container);

    const date = new Date();
    date.setFullYear(2019, 11, 23);
    date.setHours(15, 24, 38, 21);

    const utcDate = dateTimeService.getCurrentTimeInUtc(date);
    assert.equal(utcDate.getUTCFullYear(), 2019);
    assert.equal(utcDate.getUTCMonth(), 11);
    assert.equal(utcDate.getUTCDate(), 23);
    assert.equal(utcDate.getUTCHours(), 7);
    assert.equal(utcDate.getUTCMinutes(), 24);
    assert.equal(utcDate.getUTCSeconds(), 38);
    assert.equal(utcDate.getUTCMilliseconds(), 21);
  });

  it('should be correct current time (one day earlier)', () => {
    const container = MockContainer();
    container.moment = moment;
    container.momentTimezone = momentTimezone;
    const dateTimeService = DateTimeService(container);

    const date = new Date();
    date.setFullYear(2019, 11, 23);
    date.setHours(5, 24, 38, 21);

    const utcDate = dateTimeService.getCurrentTimeInUtc(date);
    assert.equal(utcDate.getUTCFullYear(), 2019);
    assert.equal(utcDate.getUTCMonth(), 11);
    assert.equal(utcDate.getUTCDate(), 22);
    assert.equal(utcDate.getUTCHours(), 21);
    assert.equal(utcDate.getUTCMinutes(), 24);
    assert.equal(utcDate.getUTCSeconds(), 38);
    assert.equal(utcDate.getUTCMilliseconds(), 21);
  });
});
