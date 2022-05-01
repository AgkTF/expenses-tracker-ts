import { Link } from 'react-router-dom';
import numberFormatter, { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { useStore } from 'store/useStore';

type Props = {
  category: string;
  collected: number;
  budget: number;
  categoryId: number;
};

const IncomeCard = ({ budget, category, collected, categoryId }: Props) => {
  const defaultCurrency = useStore(state => state.currency);

  return (
    <div className="p-3 w-full bg-gray-100 rounded-xl shadow">
      <div className="flex items-center justify-between">
        <Link to={`categories/${encodeURIComponent(category)}-${categoryId}`}>
          <p className="font-medium text-base text-slate-500">{category}</p>
        </Link>

        <div>
          <p className="text-[10px] font-normal text-gray-400">collected</p>
          <p className="text-gray-600 font-semibold text-xl">
            {moneyFormatter(collected, defaultCurrency)}
            <span className="font-medium text-xs">
              /{numberFormatter(budget)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default IncomeCard;
