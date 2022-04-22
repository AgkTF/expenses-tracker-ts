import endOfMonth from 'date-fns/endOfMonth';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';

const fetchOpeningBalance = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from('money_category')
    .select('planned_amount')
    .eq('type', '3')
    .gte('created_at', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('created_at', endOfMonth(parseISO(isoDate)).toISOString());

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No opening balance for this month!');
  }

  return data;
};

export default function useFetchOpeningBalance(date = new Date()) {
  return useQuery('opening_balance', () => fetchOpeningBalance(date));
}
