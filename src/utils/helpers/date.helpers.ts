import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import subMonths from 'date-fns/subMonths';
import { addMonths } from 'date-fns';

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

export function getPrevMonth(date: Date, dateFormat: string) {
  const prevMonth = subMonths(date, 1);
  return format(prevMonth, dateFormat);
}

export function getNextMonth(date: Date, dateFormat: string) {
  const nextMonth = addMonths(date, 1);
  return format(nextMonth, dateFormat);
}
