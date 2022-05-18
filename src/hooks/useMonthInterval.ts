import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import { chunk } from 'lodash';

export function useMonthInterval(date: Date) {
  if (!date) return;

  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const days = eachDayOfInterval({
    start,
    end,
  });

  const chunks = chunk(days, 7);
  // console.log(chunks);
  const options = chunks.map((chunk, i) => {
    const len = chunk.length;
    const startDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(chunk[0]);
    const endDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(chunk[len - 1]);
    return { id: i.toString(), name: `Between (${startDate}) - (${endDate})` };
  });

  // console.log(options);

  return {
    chunks,
    options,
  };
}
