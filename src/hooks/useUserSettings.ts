import { ICategoriesSettings } from 'types/forms';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation, useQuery } from 'react-query';

const addCategories = async (values: ICategoriesSettings) => {
  const { categories } = values;

  const { data, error } = await supabase
    .from<definitions['category']>('category')
    .insert(categories);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// ---------- hooks🪝---------- //
export function useAddCategories(
  onSuccessHandler: () => void,
  onErrorHandler: () => void
) {
  return useMutation((values: ICategoriesSettings) => addCategories(values), {
    onSuccess: data => {
      console.log(data);
      onSuccessHandler();
    },
    onError: error => {
      console.log(error);
      onErrorHandler();
    },
  });
}
