import endOfMonth from 'date-fns/endOfMonth';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';

const fetchMonthTransactions = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<definitions['transaction']>('transaction')
    .select()
    .eq('trans_type', 1)
    .gte('date', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('date', endOfMonth(parseISO(isoDate)).toISOString());

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No transactions recorded this month!');
  }

  const totalSpent = data
    .map(trans => trans.amount || 0)
    .reduce((a, b) => a + b, 0);

  return { monthTrans: data, totalSpent };
};

const fetchAllMonthTransactions = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<
      definitions['transaction'] & {
        month_category: Partial<definitions['month_category']>;
      }
    >('transaction')
    .select(
      `
    *,
    month_category (
      name
    )
    `
    )
    .gte('date', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('date', endOfMonth(parseISO(isoDate)).toISOString())
    .order('date');

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No transactions recorded this month!');
  }

  const expenseTransactions = data.filter(tr => tr.trans_type === 1);
  const incomeTransactions = data.filter(tr => tr.trans_type === 2);

  return { expenseTransactions, incomeTransactions };
};

export default function useMonthTrans(date = new Date()) {
  return useQuery('month_trans', () => fetchMonthTransactions(date));
}

export function useAllMonthTransactions(date = new Date()) {
  const formatted = format(date, 'yyyy-MM-dd');
  return useQuery(['all_month_transactions', formatted], () =>
    fetchAllMonthTransactions(date)
  );
}
