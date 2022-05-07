import endOfMonth from 'date-fns/endOfMonth';
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

export default function useMonthTrans(date = new Date()) {
  return useQuery('month_trans', () => fetchMonthTransactions(date));
}
