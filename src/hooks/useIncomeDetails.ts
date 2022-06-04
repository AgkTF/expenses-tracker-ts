import endOfMonth from 'date-fns/endOfMonth';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';

function calculateTotalIncome(transArray: definitions['transaction'][]) {
  return transArray.map(trans => trans.amount || 0).reduce((a, b) => a + b, 0);
}

const fetchIncomeDetails = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<
      definitions['month_category'] & {
        transaction: definitions['transaction'][];
      }
    >('month_category')
    .select(
      `id,
       name,
       planned_amount, 
       transaction (
        category_id,
        amount,
        date
      )
    `
    )
    .eq('type', '2')
    .gte('created_at', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('created_at', endOfMonth(parseISO(isoDate)).toISOString());

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No income details available for this month!');
  }

  const totalIncome = data
    .map(category => category.planned_amount || 0)
    .reduce((a, b) => a + b, 0);

  const categories = data.map(entry => ({
    id: entry.id,
    name: entry.name,
    budget: entry.planned_amount,
    totalCollected: calculateTotalIncome(entry.transaction),
  }));

  return { totalIncome, categories };
};

export default function useIncomeDetails(date = new Date()) {
  return useQuery('income_details', () => fetchIncomeDetails(date));
}
