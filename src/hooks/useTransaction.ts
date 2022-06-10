// TODO: make the useAddTransaction a named-export instead of default one.

import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation, useQuery } from 'react-query';
import toast from 'react-hot-toast';

const addTransaction = async (values: definitions['transaction']) => {
  const { data, error } = await supabase
    .from<definitions['transaction']>('transaction')
    .insert(values);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateTransaction = async (values: definitions['transaction']) => {
  const { data, error } = await supabase
    .from<definitions['transaction']>('transaction')
    .update(values)
    .eq('id', values.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const fetchTrans = async (id: number) => {
  let { data: transaction, error } = await supabase
    .from<definitions['transaction']>('transaction')
    .select('*')
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return transaction;
};

// ---- 🪝 Hooks

export default function useAddTransaction(
  onSuccessHandler: (data: definitions['transaction'][]) => void,
  onErrorHandler: () => void
) {
  return useMutation(
    (transaction: definitions['transaction']) => addTransaction(transaction),
    {
      onSuccess: data => {
        console.log(data);
        onSuccessHandler(data);
      },
      onError: error => {
        console.log(error);
        onErrorHandler();
      },
    }
  );
}

export function useUpdateTrans(
  onSuccessHandler: (data: definitions['transaction'][]) => void
) {
  return useMutation(
    (values: definitions['transaction']) => updateTransaction(values),
    {
      onSuccess: data => {
        console.log(data);
        onSuccessHandler(data);
      },
      onError: error => {
        console.log(error);
        toast.error('Failed to update transaction');
      },
    }
  );
}

export function useFetchTrans(id: number) {
  return useQuery(['trans', id], () => fetchTrans(id));
}
