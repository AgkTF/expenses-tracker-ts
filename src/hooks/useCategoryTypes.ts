import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';

const fetchCategoryTypes = async () => {
  const { data, error } = await supabase
    .from<definitions['category_type']>('category_type')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useCategoryTypes() {
  return useQuery('category_types', () => fetchCategoryTypes());
}
