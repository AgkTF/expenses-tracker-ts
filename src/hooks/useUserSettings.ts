import { ICategoriesSettings } from 'types/forms';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

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

const deleteCategory = async (id: number) => {
  const { data, error } = await supabase
    .from<definitions['category']>('category')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No category found for this id!');
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

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation((id: number) => deleteCategory(id), {
    onSuccess: data => {
      console.log(data);
      queryClient.invalidateQueries(['user-settings', 'categories']);
    },
    onError: error => {
      console.log(error);
      toast.error('Failed to delete category type!');
    },
  });
}
