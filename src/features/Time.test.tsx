import { DateTime, Settings } from 'luxon';

import { getDisplayText } from './Time';

Settings.defaultZone = 'utc';

describe('Time', () => {
  const sut = getDisplayText;
  const base = DateTime.fromISO('2022-08-07T00:00:00.000Z');

  it('The text is relative time if the time was within 24 hours from now', () => {
    const expectedList = {
      '2022-08-05T23:59:59.999Z': 'Aug 5, 23:59',
      '2022-08-06T00:00:00.000Z': '1 day ago',
      '2022-08-06T00:00:00.001Z': '23 hours ago',
      '2022-08-06T23:59:59.999Z': '0 seconds ago',
    };

    Object.entries(expectedList).forEach(([isoString, expected]) => {
      const dt = DateTime.fromISO(isoString);
      expect(sut(dt, base)).toBe(expected);
    });
  });

  it('The text omits year if the time was the same year', () => {
    const expectedList = {
      '2021-12-31T23:59:59.999Z': 'Dec 31, 2021, 23:59',
      '2022-01-01T00:00:00.000Z': 'Jan 1, 00:00',
    };

    Object.entries(expectedList).forEach(([isoString, expected]) => {
      const dt = DateTime.fromISO(isoString);
      expect(sut(dt, base)).toBe(expected);
    });
  });
});
