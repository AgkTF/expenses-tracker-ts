import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import { useMutation, useQuery } from 'react-query';
import { IMonthPlanForm } from 'types/forms';
import parseISO from 'date-fns/parseISO';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import getMonth from 'date-fns/getMonth';
import { differenceWith, isEqual } from 'lodash';

type Params = {
  newValues: IMonthPlanForm;
  oldValues: IMonthPlanForm;
};

function categoriesCreator(values: IMonthPlanForm) {
  const { expensesCategories, incomeCategories, openingBalance } = values;

  const expensesArray = expensesCategories.map(entry => ({
    id: entry.id,
    type: 1,
    name: entry.name,
    planned_amount: entry.planned_amount,
    created_at: entry.created_at,
  }));

  const incomeArray = incomeCategories.map(entry => ({
    id: entry.id,
    type: 2,
    name: entry.name,
    planned_amount: entry.planned_amount,
    created_at: entry.created_at,
  }));

  const valuesToInsert = [...expensesArray, ...incomeArray];

  return valuesToInsert;
}

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

const fetchMonthPlan = async (
  date: Date
): Promise<IMonthPlanForm | undefined> => {
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<definitions['money_category']>('money_category')
    .select()
    .gte('created_at', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('created_at', endOfMonth(parseISO(isoDate)).toISOString());

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No plan found for this month!');
  }

  let dataToReturn: IMonthPlanForm | undefined;

  if (data) {
    const openingBalance =
      data.find(trans => trans.type === 3)?.planned_amount || 0;
    const expensesCategories = data.filter(trans => trans.type === 1);
    const incomeCategories = data.filter(trans => trans.type === 2);

    dataToReturn = {
      openingBalance,
      expensesCategories,
      incomeCategories,
    };
  }

  return dataToReturn;
};

const updateMonthPlan = async ({ newValues, oldValues }: Params) => {
  const valuesToInsert = categoriesCreator(newValues);
  // const modifiedOldValues = categoriesCreator(oldValues);
  // const diff = differenceWith(valuesToInsert, modifiedOldValues, isEqual);

  // console.log({ modifiedOldValues });
  // console.log({ valuesToInsert });
  // console.log({
  //   diff,
  // });

  const { data, error } = await supabase
    .from<definitions['money_category']>('money_category')
    .upsert(valuesToInsert);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useMonthPlan(
  onSuccessHandler: (data: definitions['money_category'][]) => void,
  onErrorHandler: () => void
) {
  return useMutation(
    (monthPlan: IMonthPlanForm) => createMonthPlan(monthPlan),
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

export function useFetchMonthPlan(date: Date) {
  const month = getMonth(date);

  return useQuery(['month_plan', month], () => fetchMonthPlan(date));
}

export function useUpdateMonthPlan(
  onSuccessHandler: () => void,
  onErrorHandler: () => void
) {
  return useMutation((params: Params) => updateMonthPlan(params), {
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
