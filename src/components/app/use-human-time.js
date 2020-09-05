import { useEffect, useState } from 'react';

/**
 * Transform start and end angle values to human readable time,
 * as these angles on the clock face.
 *
 * @example
 * {startTime, endTime, diffTime, diffTimeFormatted} = useHumanTime({ start: 0, end: 90 });
 * startTime: { hours: 12, minutes: 0 },
 * endTime: { hours: 3, minutes: 0 },
 * diffTime: 3,
 * diffTimeFormatted: '3h 0m'
 */
export default function useHumanTime({ start, end }) {
  const [startTime, setStartTime] = useState({});
  const [endTime, setEndTime] = useState({});
  const [diffTime, setDiffTime] = useState(0);

  useEffect(() => {
    setStartTime(formatTime(getTimeFromDegrees(start)));
    setEndTime(formatTime(getTimeFromDegrees(end)));

    const diffHoursRaw = getTimeFromDegrees(end) - getTimeFromDegrees(start);
    setDiffTime(diffHoursRaw < 0 ? 12 + diffHoursRaw : diffHoursRaw);
  }, [start, end]);

  return {
    startTime,
    endTime,
    diffTime,
    diffTimeFormatted: `${Math.floor(diffTime)}h ${Math.round((diffTime % 1) * 60)}m`
  };
}

function formatTime(time) {
  return {
    hours: `${Math.floor(time) === 0 ? 12 : Math.floor(time)}`,
    minutes: `${
      Math.round((time % 1) * 60) < 10
        ? `0${Math.round((time % 1) * 60)}`
        : Math.round((time % 1) * 60)
    }`
  };
}

function getTimeFromDegrees(deg) {
  const hours = deg / 30;
  if (hours > 12) return hours - 12;
  if (hours <= 0) return hours + 12;

  return hours;
}
