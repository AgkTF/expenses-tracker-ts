import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryTrans from 'hooks/useCategoryTrans';
import format from 'date-fns/format';
import { TransCard } from 'components/UIElements';
import useMonthTrans from 'hooks/useMonthTrans';

type Props = {};

const MonthBreakdown = (props: Props) => {
  let navigate = useNavigate();
  const { month } = useParams();

  const {
    data,
    isLoading: isMonthTransLoading,
    isError: isMonthTransError,
    error: monthTransError,
  } = useMonthTrans(month ? new Date(month) : new Date());

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <section className="px-4 mt-8 w-full flex items-center">
          <button
            type="button"
            className="p-2 text-slate-700 bg-slate-100 rounded-md shadow"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <h1 className="w-full font-bold text-xl text-slate-600 text-center">
            Month Breakdown
          </h1>
        </section>
      </div>

      <section className="px-4 mt-10 w-full">
        <h3 className="font-semibold text-slate-500">
          {month
            ? format(new Date(month), 'LLLL yyyy')
            : format(new Date(), 'LLLL yyyy')}
        </h3>

        <div className="mt-3 space-y-3">
          {/* {data?.monthTrans.map(trans => (
           
          ))} */}
        </div>
      </section>
    </>
  );
};

export default MonthBreakdown;
