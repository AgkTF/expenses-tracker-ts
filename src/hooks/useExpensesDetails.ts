import endOfMonth from 'date-fns/endOfMonth';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';

const fetchExpensesDetails = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data: expenses, error } = await supabase
    .from<definitions['money_category']>('money_category')
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

  const totalExpenses = expenses
    .map(category => category.planned_amount || 0)
    .reduce((a, b) => a + b, 0);

  return { totalExpenses, categories: expenses };
};

export default function useExpensesDetails(date = new Date()) {
  return useQuery('expenses_details', () => fetchExpensesDetails(date));
}
