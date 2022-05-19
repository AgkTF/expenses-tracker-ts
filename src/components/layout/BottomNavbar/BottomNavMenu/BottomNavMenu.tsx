import { DayIcon, MonthIcon } from 'components/UIElements';

import { Link } from 'react-router-dom';
import { XIcon, PencilIcon } from '@heroicons/react/solid';

type Props = {
  setIsNavMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

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

      <Link
        to="/month-breakdown/2022-05-01"
        className="group py-1 px-3 rounded-full text-gray-200 hover:bg-gray-50 hover:text-gray-600 font-medium text-sm flex gap-x-2 items-center"
      >
        <MonthIcon />
        <span>Month Breakdown</span>
      </Link>

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
