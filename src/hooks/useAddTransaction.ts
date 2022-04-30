import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation } from 'react-query';

const addTransaction = async (values: definitions['transaction']) => {
  const { data, error } = await supabase
    .from<definitions['transaction']>('transaction')
    .insert(values);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useAddTransaction(
  onSuccessHandler: () => void,
  onErrorHandler: () => void
) {
  return useMutation(
    (transaction: definitions['transaction']) => addTransaction(transaction),
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
