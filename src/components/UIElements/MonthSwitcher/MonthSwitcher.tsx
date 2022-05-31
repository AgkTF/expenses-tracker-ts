import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import format from 'date-fns/format';
import isThisMonth from 'date-fns/isThisMonth';
import { useNavigate } from 'react-router-dom';
import { getNextMonth, getPrevMonth } from 'utils/helpers/date.helpers';

type Props = {
  currentMonth: string;
  route: string;
};

const MonthSwitcher = ({ currentMonth, route }: Props) => {
  let navigate = useNavigate();

  return (
    <div className="p-4 mt-8 mb-4 w-full bg-slate-100 shadow flex items-center justify-between">
      <button
        type="button"
        className="p-1 bg-white rounded-full shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => {
          const prevMonth = getPrevMonth(new Date(currentMonth), 'yyyy-LL-dd');
          navigate(`/${route}/${prevMonth}`);
        }}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <h3 className="text-lg font-semibold text-slate-600">
        {currentMonth
          ? format(new Date(currentMonth), 'LLLL yyyy')
          : format(new Date(), 'LLLL yyyy')}
      </h3>

      <button
        type="button"
        className="p-1 bg-white rounded-full shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => {
          const nextMonth = getNextMonth(new Date(currentMonth), 'yyyy-LL-dd');
          navigate(`/${route}/${nextMonth}`);
        }}
        disabled={isThisMonth(new Date(currentMonth))}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MonthSwitcher;
