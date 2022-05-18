import parseISO from 'date-fns/parseISO';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import { useQuery } from 'react-query';
import { supabase } from 'supabaseClient';
import { definitions } from 'types/supabase';
import format from 'date-fns/format';
import { groupBy } from 'lodash';

type TransWithFormattedDate = {
  [key: string]: {
    expenses: number;
    day: string;
    trans: (definitions['transaction'] & { formattedDate: string })[];
  };
};

const fetchCategoryTrans = async (
  date: Date,
  categoryId: string | undefined
) => {
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
  const groupedWithSum = {} as TransWithFormattedDate;
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

    chartData.push({ day: _key, expenses });
  });

  return { groupedWithSum, chartData };
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
