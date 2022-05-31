import { ArrowLeftIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useNavigate, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { ResultsContainer, TransCard } from 'components/UIElements';
import { useAllMonthTransactions } from 'hooks/useMonthTrans';
import { getNextMonth, getPrevMonth } from 'utils/helpers/date.helpers';
import { useEffect, useState } from 'react';
import isThisMonth from 'date-fns/isThisMonth';
import { isEmpty } from 'lodash';

type Props = {};

const MonthBreakdown = (props: Props) => {
  let navigate = useNavigate();
  const { month } = useParams();
  const [currentMonth, setCurrentMonth] = useState('');

  const { data, isLoading, isError, error } = useAllMonthTransactions(
    month ? new Date(month) : new Date()
  );

  useEffect(() => {
    if (month) {
      setCurrentMonth(month);
    } else {
      setCurrentMonth(format(new Date(), 'yyyy-LL-dd'));
    }
  }, [month]);

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

      <div className="p-4 mt-8 mb-4 w-full bg-slate-100 shadow flex items-center justify-between">
        <button
          type="button"
          className="p-1 bg-white rounded-full shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            const prevMonth = getPrevMonth(new Date(currentMonth), 'LLLL yyyy');
            navigate(`/month-breakdown/${prevMonth}`);
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
            const nextMonth = getNextMonth(new Date(currentMonth), 'LLLL yyyy');
            navigate(`/month-breakdown/${nextMonth}`);
          }}
          disabled={isThisMonth(new Date(currentMonth))}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      <section className="px-4 w-full">
        <section className="pb-1 w-full relative overflow-y-auto transactions__container">
          <div className="py-2 sticky top-0 z-20 bg-white w-full flex items-center justify-between">
            <h3 className="font-medium text-lg text-slate-600">💸 Expenses</h3>
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
                  description={trans.description || `Transaction ${trans.id}`}
                  categoryId={trans.category_id || 0}
                  transType={trans.trans_type || 0}
                />
              ))}
            </div>
          </ResultsContainer>
        </section>

        <section className="mt-4 pb-1 w-full relative overflow-y-auto transactions__container">
          <div className="py-2 sticky top-0 z-20 bg-white w-full flex items-center justify-between">
            <h3 className="font-medium text-lg text-slate-600">💰 Income</h3>
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
                  description={trans.description || `Transaction ${trans.id}`}
                  categoryId={trans.category_id || 0}
                  transType={trans.trans_type || 0}
                />
              ))}
            </div>
          </ResultsContainer>
        </section>
      </section>
    </>
  );
};

export default MonthBreakdown;
