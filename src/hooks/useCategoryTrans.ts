import parseISO from 'date-fns/parseISO';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';

const fetchCategoryTrans = async (
  date: Date,
  categoryId: string | undefined
) => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<definitions['transaction']>('transaction')
    .select()
    .eq('category_id', categoryId)
    .gte('date', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('date', endOfMonth(parseISO(isoDate)).toISOString());

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No transactions recorded for this category this month!');
  }

  return data;
};

export default function useCategoryTrans(
  date: Date,
  categoryId: string | undefined
) {
  return useQuery(
    ['category_trans', categoryId],
    () => fetchCategoryTrans(date, categoryId),
    {
      enabled: !!categoryId,
    }
  );
}
