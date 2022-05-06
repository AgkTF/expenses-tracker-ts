import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation, useQuery } from 'react-query';

const fetchAvailableBalance = async () => {
  const { data, error } = await supabase
    .from<definitions['balance']>('balance')
    .select('id, new_balance, created_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const addBalanceRecord = async (values: Partial<definitions['balance']>) => {
  const { data, error } = await supabase
    .from<definitions['balance']>('balance')
    .insert(values, {
      returning: 'minimal',
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export function useAddBalanceRecord() {
  return useMutation((values: Partial<definitions['balance']>) =>
    addBalanceRecord(values)
  );
}

export function useAvailableBalance() {
  return useQuery('available_balance', () => fetchAvailableBalance());
}
