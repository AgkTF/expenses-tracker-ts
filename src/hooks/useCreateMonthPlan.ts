// TODO: update this type "IMonthPlanForm" below.

import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation } from 'react-query';
import { IMonthPlanForm } from 'types/forms';

const createMonthPlan = async (values: IMonthPlanForm) => {
  const { expensesCategories, incomeCategories, openingBalance } = values;

  const expensesArray = expensesCategories.map(entry => ({
    type: 1,
    name: entry.name,
    planned_amount: entry.planned_amount,
  }));

  const incomeArray = incomeCategories.map(entry => ({
    type: 2,
    name: entry.name,
    planned_amount: entry.planned_amount,
  }));

  const valuesToInsert = [
    ...expensesArray,
    ...incomeArray,
    {
      type: 3,
      name: 'Opening Balance',
      planned_amount: openingBalance,
    },
  ];

  console.log({ valuesToInsert });

  const { data, error } = await supabase
    .from<definitions['money_category']>('money_category')
    .insert(valuesToInsert);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useCreateMonthPlan(
  onSuccessHandler: () => void,
  onErrorHandler: () => void
) {
  return useMutation(
    (monthPlan: IMonthPlanForm) => createMonthPlan(monthPlan),
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
