import Typography from '@mui/material/Typography';
import { DateTime, Interval } from 'luxon';

import type { DurationObjectUnits } from 'luxon';

type Props = {
  datetime: string;
};

const isWithin = (
  dt: DateTime,
  value: NonNullable<DurationObjectUnits[keyof DurationObjectUnits]>,
  unit: keyof DurationObjectUnits,
  base: DateTime,
) => {
  const interval = Interval.fromDateTimes(
    base.minus({ [unit]: value }),
    base.plus({ [unit]: value }),
  );
  return interval.contains(dt);
};

const format: {
  [k: string]: (dt: DateTime, base?: DateTime) => string | null;
} = {
  relative: (dt, base) => dt.toRelative({ base }),
  withoutYear: (dt) =>
    dt.toLocaleString({
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }),
  withYear: (dt) =>
    dt.toLocaleString({
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }),
};

export const getDisplayText = (dt: DateTime, base: DateTime) => {
  if (isWithin(dt, 24, 'hours', base)) {
    return format.relative(dt, base);
  }

  if (dt.hasSame(base, 'year')) {
    return format.withoutYear(dt);
  }

  return format.withYear(dt);
};

export const Time = ({ datetime }: Props) => {
  const dt = DateTime.fromISO(datetime);
  const now = DateTime.now();
  const isoString = dt.toISO();
  const text = getDisplayText(dt, now);
  return (
    <Typography variant="caption">
      <time dateTime={isoString}>{text}</time>
    </Typography>
  );
};
