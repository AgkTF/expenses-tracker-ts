import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { TransCard } from 'components/UIElements';
import { useFetchDayTransactions } from 'hooks/useDayTrans';

type Props = {};

const DailyBreakdownPage = (props: Props) => {
  let navigate = useNavigate();
  const { day } = useParams();

  const { data, isLoading, isError, error } = useFetchDayTransactions(
    day ? new Date(day) : new Date()
  );

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

        <section className="mt-2 pb-1 w-full relative overflow-y-auto transactions__container">
          <div className="py-2 sticky top-0 z-20 bg-white w-full flex items-center justify-between">
            <h3 className="font-medium text-lg text-slate-600">💸 Expenses</h3>
          </div>

          <div className="w-full flex flex-wrap items-center justify-between gap-2">
            {data?.expenseTransactions.map(trans => (
              <TransCard
                key={trans.id}
                amount={trans.amount || 0}
                categoryName={trans.money_category.name || 'Category'}
                date={trans.date ? new Date(trans.date) : new Date()}
                description={trans.description || `Transaction ${trans.id}`}
                categoryId={trans.category_id || 0}
              />
            ))}
          </div>
        </section>

        <section className="mt-4 pb-1 w-full relative overflow-y-auto transactions__container">
          <div className="py-2 sticky top-0 z-20 bg-white w-full flex items-center justify-between">
            <h3 className="font-medium text-lg text-slate-600">💰 Income</h3>
          </div>

          <div className="w-full flex flex-wrap items-center justify-between gap-2">
            {data?.incomeTransactions.map(trans => (
              <TransCard
                key={trans.id}
                amount={trans.amount || 0}
                categoryName={trans.money_category.name || 'Category'}
                date={trans.date ? new Date(trans.date) : new Date()}
                description={trans.description || `Transaction ${trans.id}`}
                categoryId={trans.category_id || 0}
              />
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default DailyBreakdownPage;
