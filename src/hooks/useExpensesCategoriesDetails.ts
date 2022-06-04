import endOfMonth from 'date-fns/endOfMonth';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';

function calculateTotalSpent(transArray: definitions['transaction'][]) {
  return transArray.map(trans => trans.amount || 0).reduce((a, b) => a + b, 0);
}

const fetchExpensesDetails = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data: expenses, error } = await supabase
    .from<
      definitions['month_category'] & {
        transaction: definitions['transaction'][];
        category: definitions['category'];
      }
    >('month_category')
    .select(
      `
        *,
        category(*),
        transaction(*)
    `
    )
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

  const categories = expenses.map(entry => ({
    id: entry.id,
    name: entry.category.description,
    plannedAmount: entry.planned_amount,
    transCount: entry.transaction.length,
    totalSpent: calculateTotalSpent(entry.transaction),
    percentage: entry.planned_amount
      ? (calculateTotalSpent(entry.transaction) / entry.planned_amount) * 100
      : 0,
  }));

  return { totalExpenses, categories };
};

export default function useExpensesCategoriesDetails(date = new Date()) {
  return useQuery('expenses_categories_details', () =>
    fetchExpensesDetails(date)
  );
}
