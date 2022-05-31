import { Link } from 'react-router-dom';
import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { useStore } from 'store/useStore';
import ProgressBar from '../ProgressBar/ProgressBar';
import format from 'date-fns/format';

type Props = {
  category: string;
  categoryId: number;
  spent: number;
  transCount: number;
  percentage: number;
  remaining: number;
  budget: number;
  date: Date;
};

const ExpenseCard = ({
  category,
  categoryId,
  spent,
  transCount,
  percentage,
  remaining,
  budget,
  date,
}: Props) => {
  const defaultCurrency = useStore(state => state.currency);

  return (
    <div className="p-3 w-full bg-gray-100 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <Link
          to={`/categories/${encodeURIComponent(
            category
          )}/${categoryId}/${format(date, 'yyyy-LL-dd')}`}
        >
          <p className="font-medium text-base text-slate-500">{category}</p>
        </Link>
        <p className="font-semibold text-slate-600 text-xl">
          {moneyFormatter(spent, defaultCurrency)}
        </p>
      </div>

      <div className="mt-4 flex flex-col">
        <div className="flex items-center justify-between">
          <p className="font-medium text-xs text-slate-400 tracking-wide">
            {transCount} transactions
          </p>
          <p className="font-light text-xs text-slate-500 tracking-wide">
            <span className={`${percentage > 100 ? 'text-red-500' : ''}`}>
              {moneyFormatter(remaining, defaultCurrency)}
            </span>{' '}
            Left of {moneyFormatter(budget, defaultCurrency)}
          </p>
        </div>

        <div className="w-full mt-1">
          <ProgressBar percentage={percentage} height={8} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
