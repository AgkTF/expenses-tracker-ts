import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { definitions } from 'types/supabase';
import { useStore } from 'store/useStore';

type Props = {
  expensesCategories: definitions['month_category'][];
  incomeCategories: definitions['month_category'][];
};

function sumOfCategories(categoriesArray: definitions['month_category'][]) {
  return categoriesArray
    .map(category => {
      let amountToReturn: number | undefined;
      if (category.planned_amount && isNaN(category.planned_amount)) {
        amountToReturn = 0;
      } else if (category.planned_amount) {
        amountToReturn = category.planned_amount;
      }

      return amountToReturn || 0;
    })
    .reduce((a, b) => a + b, 0);
}

const TotalCards = ({ expensesCategories, incomeCategories }: Props) => {
  const defaultCurrency = useStore(state => state.currency);

  return (
    <div className="mt-6 text-center flex items-center justify-center gap-x-10">
      <article className="min-w-[7rem] py-4 px-5 rounded-md bg-green-100 shadow-sm">
        <p className="text-green-400 font-medium text-sm">Income</p>
        <p className="text-green-600 font-semibold text-2xl">
          {incomeCategories &&
            moneyFormatter(sumOfCategories(incomeCategories), defaultCurrency)}
        </p>
      </article>

      <article className="min-w-[7rem] py-4 px-5 rounded-md bg-red-100 shadow-sm">
        <p className="text-red-400 font-medium text-sm">Expense</p>
        <p className="text-red-600 font-semibold text-2xl">
          {expensesCategories &&
            moneyFormatter(
              sumOfCategories(expensesCategories),
              defaultCurrency
            )}
        </p>
      </article>
    </div>
  );
};

export default TotalCards;
