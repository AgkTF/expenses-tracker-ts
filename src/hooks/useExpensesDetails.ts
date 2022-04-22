import endOfMonth from 'date-fns/endOfMonth';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';

const fetchExpensesDetails = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data: expenses, error } = await supabase
    .from('money_category')
    .select('id, name, planned_amount')
    .eq('type', '1')
    .gte('created_at', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('created_at', endOfMonth(parseISO(isoDate)).toISOString());

  if (error) {
    throw new Error(error.message);
  }

  if (!expenses) {
    throw new Error('No expenses details available for this month!');
  }

  return expenses;
};

export default function useExpensesDetails(date = new Date()) {
  return useQuery('expenses_details', () => fetchExpensesDetails(date));
}
