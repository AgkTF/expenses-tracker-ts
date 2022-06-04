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

const addCategoryType = async (values: Partial<definitions['category']>) => {
  const { data, error } = await supabase
    .from<definitions['category']>('category')
    .insert([values]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateCategories = async (values: ICategoriesSettings) => {
  const { categories } = values;

  const { data, error } = await supabase
    .from<definitions['category']>('category')
    .upsert(categories);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const fetchCategories = async () => {
  const { data, error } = await supabase
    .from<definitions['category']>('category')
    .select();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No categories found!');
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

export function useAddCategoryType(
  onSuccessHandler: () => void,
  onErrorHandler: () => void
) {
  return useMutation(
    (values: Partial<definitions['category']>) => addCategoryType(values),
    {
      onSuccess: data => {
        console.log(data);
        onSuccessHandler();
      },
      onError: error => {
        console.log(error);
        onErrorHandler();
      },
    }
  );
}

export function useUpdateCategories(
  onSuccessHandler: () => void,
  onErrorHandler: () => void
) {
  return useMutation(
    (values: ICategoriesSettings) => updateCategories(values),
    {
      onSuccess: data => {
        console.log(data);
        onSuccessHandler();
      },
      onError: error => {
        console.log(error);
        onErrorHandler();
      },
    }
  );
}

export function useCategories() {
  return useQuery(['user-settings', 'categories'], () => fetchCategories());
}
