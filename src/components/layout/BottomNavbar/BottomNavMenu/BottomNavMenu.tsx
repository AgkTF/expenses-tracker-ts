import { DayIcon, MonthIcon } from 'components/UIElements';

import { Link } from 'react-router-dom';
import { XIcon, PencilIcon } from '@heroicons/react/solid';
import format from 'date-fns/format';

type Props = {
  setIsNavMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const todaysDate = format(new Date(), 'yyyy-LL-dd');

const BottomNavMenu = ({ setIsNavMenuOpen }: Props) => {
  return (
    <div className="pt-2 py-1 px-3 flex flex-col bg-gray-600 rounded-lg">
      <Link
        to="/view-month-plan"
        className="py-1 px-3 rounded-full text-gray-200 hover:bg-gray-50 hover:text-gray-600 font-medium text-sm flex gap-x-2 items-center"
      >
        <PencilIcon className="h-5 w-5" />
        <span>Your month plan</span>
      </Link>

      <hr className="my-2 text-gray-400" />
      <div className="space-y-2">
        <Link
          to={`/month-breakdown/${todaysDate}`}
          className="group py-1 px-3 rounded-full text-gray-200 hover:bg-gray-50 hover:text-gray-600 font-medium text-sm flex gap-x-2 items-center"
        >
          <MonthIcon />
          <span>Month Breakdown</span>
        </Link>

        <Link
          to={`/daily-breakdown/${todaysDate}`}
          className="group py-1 px-3 rounded-full text-gray-200 hover:bg-gray-50 hover:text-gray-600 font-medium text-sm flex gap-x-2 items-center"
        >
          <DayIcon />
          <span>Daily Breakdown</span>
        </Link>
      </div>

      <button
        type="button"
        className="p-2 self-end rounded-full text-gray-200 hover:bg-gray-50 hover:text-gray-500"
        onClick={() => setIsNavMenuOpen(false)}
      >
        <XIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default BottomNavMenu;
