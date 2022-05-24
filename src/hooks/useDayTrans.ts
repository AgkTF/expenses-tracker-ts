import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';

const fetchDayTransactions = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<
      definitions['transaction'] & {
        money_category: Partial<definitions['money_category']>;
      }
    >('transaction')
    .select(
      `
    *,
    money_category (
      name
    )
    `
    )
    .gte('date', startOfDay(parseISO(isoDate)).toISOString())
    .lte('date', endOfDay(parseISO(isoDate)).toISOString())
    .order('date');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No transactions recorded for this day!');
  }

  const expenseTransactions = data.filter(tr => tr.trans_type === 1);
  const incomeTransactions = data.filter(tr => tr.trans_type === 2);

  return { expenseTransactions, incomeTransactions };
};

export function useFetchDayTransactions(date: Date) {
  const formatted = format(date, 'd-LLLL-yyyy');

  return useQuery(['day_trans', formatted], () => fetchDayTransactions(date));
}
