import { moneyFormatter } from 'utils/helpers/numbers.helpers';

type Props = {
  availableBalance: number;
  totalSpent: number;
  budget: number;
};

const BalanceCard = ({ availableBalance, budget, totalSpent }: Props) => {
  return (
    <div className="p-4 w-72 bg-gray-100 rounded-md shadow-air77">
      <p className="text-slate-400 font-medium text-sm tracking-wider">
        Available Balance
      </p>

      <p className="mt-1 text-slate-600 text-xl font-bold">
        {moneyFormatter(availableBalance, 'USD')}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <p>
          <span className="font-light">Spent </span>
          <span className="font-semibold">
            {moneyFormatter(totalSpent, 'USD')}
          </span>
        </p>

        <p>
          <span className="font-light">Budget </span>
          <span className="font-semibold">{moneyFormatter(budget, 'USD')}</span>
        </p>
      </div>
    </div>
  );
};

export default BalanceCard;
