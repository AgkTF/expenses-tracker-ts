import parseISO from 'date-fns/parseISO';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import format from 'date-fns/format';
import { chunk, groupBy, merge } from 'lodash';
import { createDaysWithExpenses } from 'utils/helpers/date.helpers';

type TransWithFormattedDate = {
  [key: string]: {
    expenses: number;
    day: string;
    trans: (definitions['transaction'] & { formattedDate: string })[];
  };
};

type GroupedWithExpenses = {
  [key: string]: {
    expenses: number;
    day: string;
  };
};

const fetchCategoryTrans = async (
  date: Date,
  categoryId: string | undefined
) => {
  const daysObj = createDaysWithExpenses(date);
  const isoDate = date.toISOString();

  const { data, error } = await supabase
    .from<definitions['transaction']>('transaction')
    .select()
    .eq('category_id', categoryId)
    .gte('date', startOfMonth(parseISO(isoDate)).toISOString())
    .lte('date', endOfMonth(parseISO(isoDate)).toISOString());

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error('No transactions recorded for this category this month!');
  }

  const mapped = data.map(e => ({
    ...e,
    formattedDate: format(parseISO(e.date), 'yyyy-MM-dd'),
  }));

  const grouped = groupBy(mapped, 'formattedDate');

  const entries = Object.entries(grouped);

  const groupedWithSum: TransWithFormattedDate = {};
  const groupedWithoutTrans: GroupedWithExpenses = {};

  const chartData = [] as {
    expenses: number;
    day: string;
  }[];

  entries.forEach(entry => {
    const _key = entry[0];
    const _value = entry[1];
    const expenses = _value.reduce(
      (accumulator, curValue) =>
        curValue && curValue.amount ? accumulator + curValue.amount : 0,
      0
    );

    groupedWithSum[_key] = {
      expenses,
      day: format(new Date(_key), 'eee dd'),
      trans: _value,
    };
    groupedWithoutTrans[_key] = {
      expenses,
      day: _key,
    };
  });

  const merged = merge(daysObj, groupedWithoutTrans);
  const mergedEntries = Object.entries(merged);
  mergedEntries.forEach(ent => {
    const _values = ent[1];
    chartData.push(_values);
  });
  const chartDataChunks = chunk(chartData.flat(), 7);

  return { allTransactions: data, groupedWithSum, chartData: chartDataChunks };
};

export default function useCategoryTrans(
  date: Date,
  categoryId: string | undefined
) {
  return useQuery(
    ['category_trans', categoryId],
    () => fetchCategoryTrans(date, categoryId),
    {
      enabled: !!categoryId,
    }
  );
}
