import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { ResultsContainer, TransCard } from 'components/UIElements';
import { useFetchDayTransactions } from 'hooks/useDayTrans';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import isToday from 'date-fns/isToday';
import ViewOptionsMenu from './components/ViewOptionsMenu/ViewOptionsMenu';
import { LayersIconC } from 'components/Icons';
import { isEmpty } from 'lodash';

type Props = {};

const DailyBreakdownPage = (props: Props) => {
  const [viewOption, setViewOption] = useState('combined');
  const [currentDay, setCurrentDay] = useState('');
  let navigate = useNavigate();
  const { day } = useParams();

  useEffect(() => {
    if (day) {
      setCurrentDay(day);
    } else {
      setCurrentDay(format(new Date(), 'yyyy-LL-dd'));
    }
  }, [day]);

  const getPrevDay = () => {
    const prevDay = subDays(currentDay ? new Date(currentDay) : new Date(), 1);
    return format(prevDay, 'yyyy-LL-dd');
  };

  const getNextDay = () => {
    const nextDay = addDays(currentDay ? new Date(currentDay) : new Date(), 1);
    return format(nextDay, 'yyyy-LL-dd');
  };

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

          <ViewOptionsMenu
            viewOption={viewOption}
            onValueChangeHandler={setViewOption}
          />
        </section>
      </div>

      <div className="p-4 mt-8 mb-4 w-full bg-slate-100 shadow flex items-center justify-between">
        <button
          type="button"
          className="p-1 bg-white rounded-full shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            const prevDay = getPrevDay();
            navigate(`/daily-breakdown/${prevDay}`);
          }}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold text-slate-600">
          {currentDay
            ? format(new Date(currentDay), 'EEEE, d LLLL yyyy')
            : format(new Date(), 'EEEE, d LLLL yyyy')}
        </h3>
        <button
          type="button"
          className="p-1 bg-white rounded-full shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            const nextDay = getNextDay();
            navigate(`/daily-breakdown/${nextDay}`);
          }}
          disabled={isToday(new Date(currentDay))}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <section className="px-4 w-full">
        {viewOption === 'combined' ? (
          <section className="w-full">
            <h3 className="mt-8 mb-2 font-medium text-lg text-slate-600 flex items-center gap-2">
              <LayersIconC className="w-5 h-5" />
              Transaction Breakdown
            </h3>

            <ResultsContainer
              error={error}
              isError={isError}
              isLoading={isLoading}
              isEmptyData={isEmpty(data?.allTransactions)}
              emptyMessage="No Transactions found!"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                {data?.allTransactions.map(trans => (
                  <TransCard
                    key={trans.id}
                    amount={trans.amount || 0}
                    categoryName={trans.money_category.name || 'Category'}
                    date={trans.date ? new Date(trans.date) : new Date()}
                    description={trans.description || `Transaction ${trans.id}`}
                    categoryId={trans.category_id || 0}
                    transType={trans.trans_type || 0}
                  />
                ))}
              </div>
            </ResultsContainer>
          </section>
        ) : (
          <>
            <section className="pb-1 w-full relative overflow-y-auto transactions__container">
              <div className="py-2 sticky top-0 z-20 bg-white w-full flex items-center justify-between">
                <h3 className="font-medium text-lg text-slate-600">
                  💸 Expenses
                </h3>
              </div>

              <ResultsContainer
                error={error}
                isError={isError}
                isLoading={isLoading}
                isEmptyData={isEmpty(data?.expenseTransactions)}
                emptyMessage="No Transactions found!"
              >
                <div className="w-full flex flex-wrap items-center justify-between gap-2">
                  {data?.expenseTransactions.map(trans => (
                    <TransCard
                      key={trans.id}
                      amount={trans.amount || 0}
                      categoryName={trans.money_category.name || 'Category'}
                      date={trans.date ? new Date(trans.date) : new Date()}
                      description={
                        trans.description || `Transaction ${trans.id}`
                      }
                      categoryId={trans.category_id || 0}
                      transType={trans.trans_type || 0}
                    />
                  ))}
                </div>
              </ResultsContainer>
            </section>

            <section className="mt-4 pb-1 w-full relative overflow-y-auto transactions__container">
              <div className="py-2 sticky top-0 z-20 bg-white w-full flex items-center justify-between">
                <h3 className="font-medium text-lg text-slate-600">
                  💰 Income
                </h3>
              </div>

              <ResultsContainer
                error={error}
                isError={isError}
                isLoading={isLoading}
                isEmptyData={isEmpty(data?.incomeTransactions)}
                emptyMessage="No Transactions found!"
              >
                <div className="w-full flex flex-wrap items-center justify-between gap-2">
                  {data?.incomeTransactions.map(trans => (
                    <TransCard
                      key={trans.id}
                      amount={trans.amount || 0}
                      categoryName={trans.money_category.name || 'Category'}
                      date={trans.date ? new Date(trans.date) : new Date()}
                      description={
                        trans.description || `Transaction ${trans.id}`
                      }
                      categoryId={trans.category_id || 0}
                      transType={trans.trans_type || 0}
                    />
                  ))}
                </div>
              </ResultsContainer>
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default DailyBreakdownPage;
