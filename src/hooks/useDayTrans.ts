import format from 'date-fns/format';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';

const fetchDayTransactions = async (date: Date) => {
  const dayStart = format(date, 'yyyy-LL-dd') + 'T00:00';
  const dayEnd = format(date, 'yyyy-LL-dd') + 'T23:59';

  const { data, error } = await supabase
    .from<
      definitions['transaction'] & {
        category: Partial<definitions['category']>;
      }
    >('transaction')
    .select(
      `
    *,
    category (
      description
    )
    `
    )
    .gte('date', dayStart)
    .lte('date', dayEnd)
    .order('date');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No transactions recorded for this day!');
  }

  const expenseTransactions = data.filter(tr => tr.trans_type === 1);
  const incomeTransactions = data.filter(tr => tr.trans_type === 2);

  return { allTransactions: data, expenseTransactions, incomeTransactions };
};

export function useFetchDayTransactions(date: Date) {
  const formatted = format(date, 'd-LLLL-yyyy');

  return useQuery(['day_trans', formatted], () => fetchDayTransactions(date));
}
