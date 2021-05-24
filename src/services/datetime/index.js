/**
 * DateTime Service
 * To do date manipulation, especially across timezones
 */

export default (container) => {
  const { L } = container.defaultLogger('DateTime Service');
  const tzUTC = 'Etc/UTC';

  const sanitizeTimezone = (timezone) => {
    if (timezone == null || timezone === '') {
      L.warn('Invalid Timezone', timezone);
      L.warn('Using Default Timezone (Etc/UTC)');
      return tzUTC;
    }

    const trimmedTimezone = timezone.toString().trim();
    if (trimmedTimezone === '') {
      L.warn('Invalid Trimmed Timezone (empty)', trimmedTimezone);
      L.warn('Using Default Timezone (Etc/UTC)');
      return tzUTC;
    }

    if (trimmedTimezone.toString() === 'Asia/Saigon') {
      L.warn('Changing Timezone Asia/Saigon -> Asia/Ho_Chi_Minh');
      return 'Asia/Ho_Chi_Minh';
    }

    // L.debug(`Using Timezone: ${trimmedTimezone}`);
    return trimmedTimezone;
  };

  const getLocalMomentDate = (hours, minutes, timezone) => {
    const sanitizedHours = `0${hours}`.slice(-2);
    const sanitizedMinutes = `0${minutes}`.slice(-2);
    const dateText = `2019-01-01 ${sanitizedHours}:${sanitizedMinutes}`;
    const sanitizedTimezone = sanitizeTimezone(timezone);
    const momentDate = container.momentTimezone.tz(dateText, sanitizedTimezone);
    return momentDate;
  };

  const getDateInUtc = (hours, minutes, timezone) => {
    const localMomentDate = getLocalMomentDate(hours, minutes, timezone);
    const utcMomentDate = localMomentDate.clone().tz(tzUTC);
    const utcDate = utcMomentDate.toDate();
    return utcDate;
  };

  const getCurrentTimeInUtc = (currentTime) => {
    const localMomentDate = container.moment(currentTime);
    const utcMomentDate = localMomentDate.clone().tz(tzUTC);
    const utcDate = utcMomentDate.toDate();
    return utcDate;
  };

  return {
    getDateInUtc, // Get Date Object of given time and timezone converted to UTC
    getCurrentTimeInUtc, // Get curent time in UTC timezone
    tzUTC,
  };
};
