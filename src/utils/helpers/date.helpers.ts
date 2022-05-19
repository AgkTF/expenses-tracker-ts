import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';

export function createDaysWithExpenses(date: Date) {
  if (!date) return;

  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const days = eachDayOfInterval({
    start,
    end,
  });

  const daysObj: {
    [key: string]: {
      expenses: number;
      day: string;
    };
  } = {};
  days.forEach(d => {
    const formattedWithDashes = format(d, 'yyyy-MM-dd');
    const formattedDay = format(d, 'eee dd');
    daysObj[formattedWithDashes] = {
      // day: formattedDay,
      day: formattedWithDashes,
      expenses: 0,
    };
  });

  return daysObj;
}
