import { DayIcon, UpdateTransModal } from 'components/UIElements';
import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { useStore } from 'store/useStore';
import { Link } from 'react-router-dom';
import CN from 'classnames';
import format from 'date-fns/format';
import { useState } from 'react';

type Props = {
  id: number;
  date: Date;
  description: string;
  categoryName: string;
  amount: number;
  categoryId: number;
  transType: number;
};

const TransCard = ({
  id,
  date,
  description,
  categoryName,
  amount,
  categoryId,
  transType,
}: Props) => {
  const defaultCurrency = useStore(state => state.currency);
  const moneyClasses = CN('font-semibold text-xl', {
    'text-red-500': transType === 1,
    'text-green-600': transType === 2,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <>
      <div
        className="px-3 py-4 w-full bg-gray-100 flex items-center justify-between gap-x-5 rounded-xl shadow cursor-pointer"
        onClick={toggleModal}
      >
        <div className="flex items-center gap-x-3">
          <div>
            <DayIcon date={date} />
          </div>

          <div>
            <p className="text-slate-500 font-medium text-base">
              {description}
            </p>

            <Link
              to={`/categories/${encodeURIComponent(
                categoryName
              )}/${categoryId}/${format(date, 'yyyy-LL-dd')}`}
            >
              <p className="px-1 mt-1 w-fit bg-white text-slate-400 font-light text-xs shadow rounded text-center">
                {categoryName}
              </p>
            </Link>
          </div>
        </div>

        <div className={moneyClasses}>
          {moneyFormatter(amount, defaultCurrency)}
        </div>
      </div>

      <UpdateTransModal
        transId={id}
        toggleModal={toggleModal}
        isOpen={isModalOpen}
      />
    </>
  );
};

export default TransCard;
