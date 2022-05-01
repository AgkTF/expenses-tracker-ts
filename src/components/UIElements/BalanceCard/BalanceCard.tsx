import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { useStore } from 'store/useStore';
import { ProgressBar } from 'components/UIElements';

type Props = {
  availableBalance: number;
  totalSpent: number;
  budget: number;
  percentage: number;
};

const BalanceCard = ({
  availableBalance,
  budget,
  totalSpent,
  percentage,
}: Props) => {
  const defaultCurrency = useStore(state => state.currency);

  return (
    <div className="p-4 w-80 bg-gray-100 rounded-md shadow-sm">
      <p className="text-slate-400 font-medium text-sm tracking-wider">
        Available Balance
      </p>

      <p className="mt-1 text-slate-600 text-xl font-bold">
        {moneyFormatter(availableBalance, defaultCurrency)}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <p>
          <span className="font-light">Spent </span>
          <span className="font-semibold">
            {moneyFormatter(totalSpent, defaultCurrency)}
          </span>
        </p>

        <p>
          <span className="font-light">Budget </span>
          <span className="font-semibold">
            {moneyFormatter(budget, defaultCurrency)}
          </span>
        </p>
      </div>

      <div className="mt-1">
        <ProgressBar percentage={percentage} height={8} />
      </div>
    </div>
  );
};

export default BalanceCard;
