import { DayIcon } from 'components/UIElements';
import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { useStore } from 'store/useStore';
import { Link } from 'react-router-dom';

type Props = {
  date: Date;
  description: string;
  categoryName: string;
  amount: number;
  categoryId: number;
};

const TransCard = ({
  date,
  description,
  categoryName,
  amount,
  categoryId,
}: Props) => {
  const defaultCurrency = useStore(state => state.currency);

  return (
    <div className="px-3 py-4 w-full bg-gray-100 flex items-center justify-between gap-x-5 rounded-xl shadow">
      <div className="flex items-center gap-x-3">
        <div>
          <DayIcon date={date} />
        </div>

        <div>
          <p className="text-slate-500 font-medium text-base">{description}</p>

          <Link
            to={`/categories/${encodeURIComponent(categoryName)}/${categoryId}`}
          >
            <p className="px-1 mt-1 w-fit bg-white text-slate-400 font-light text-xs shadow rounded text-center">
              {categoryName}
            </p>
          </Link>
        </div>
      </div>

      <div className="text-slate-600 font-semibold text-xl">
        {moneyFormatter(amount, defaultCurrency)}
      </div>
    </div>
  );
};

export default TransCard;
