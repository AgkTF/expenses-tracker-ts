import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { TransCard } from 'components/UIElements';
import { useAllMonthTransactions } from 'hooks/useMonthTrans';

type Props = {};

const DailyBreakdownPage = (props: Props) => {
  let navigate = useNavigate();
  const { day } = useParams();

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
            Daily Breakdown
          </h1>
        </section>
      </div>

      <section className="px-4 mt-10 w-full">
        <h3 className="text-lg font-semibold text-slate-600">
          {day
            ? format(new Date(day), 'EEEE, d LLLL yyyy')
            : format(new Date(), 'EEEE, d LLLL yyyy')}
        </h3>
      </section>
    </>
  );
};

export default DailyBreakdownPage;
