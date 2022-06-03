// TODO: check the query keys below.

import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';

const fetchAvailableBalance = async (date: Date) => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<definitions['balance']>('balance')
    .select('id, new_balance, created_at')
    .gte('created_at', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('created_at', endOfMonth(parseISO(isoDate)).toISOString())
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
  const queryClient = useQueryClient();

  return useMutation(
    (values: Partial<definitions['balance']>) => addBalanceRecord(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('available_balance');
        queryClient.invalidateQueries('month_trans');
        queryClient.invalidateQueries('expenses_categories_details');
        queryClient.invalidateQueries('income_details');
        queryClient.invalidateQueries('all_month_transactions');
        queryClient.invalidateQueries('day_trans');
      },
    }
  );
}

export function useAvailableBalance(date = new Date()) {
  const formatted = format(date, 'LLL');

  return useQuery(['available_balance', formatted], () =>
    fetchAvailableBalance(date)
  );
}
