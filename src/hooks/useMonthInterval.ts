import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import { chunk } from 'lodash';
import format from 'date-fns/format';

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
    // const startDate = format(chunk[0], 'MMM ee');
    // const endDate = format(chunk[len - 1], 'MMM ee');
    const startDate = chunk[0].toDateString();
    const endDate = chunk[len - 1].toDateString();

    return { id: i.toString(), name: `Between (${startDate}) - (${endDate})` };
  });

  // console.log(options);

  return {
    chunks,
    options,
  };
}
