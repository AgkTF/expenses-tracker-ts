import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryTrans from 'hooks/useCategoryTrans';
import format from 'date-fns/format';
import {
  MonthSwitcher,
  ResultsContainer,
  TransCard,
} from 'components/UIElements';
import { useEffect, useState } from 'react';
import { LayersIconC } from 'components/Icons';
import { isEmpty } from 'lodash';

type Props = {};

const CategoryPage = (props: Props) => {
  const [currentMonth, setCurrentMonth] = useState('');
  let navigate = useNavigate();
  const { categoryName, categoryId, month } = useParams();

  const { isLoading, isError, error, data } = useCategoryTrans(
    month ? new Date(month) : new Date(),
    categoryId
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
            {categoryName}
          </h1>
        </section>
      </div>

      <MonthSwitcher
        currentMonth={currentMonth}
        route={`categories/${encodeURIComponent(
          categoryName || ''
        )}/${categoryId}`}
      />

      <section className="px-4 w-full">
        <h3 className="mb-2 font-medium text-lg text-slate-600 flex items-center gap-2">
          <LayersIconC className="w-5 h-5" />
          Transactions
        </h3>

        <ResultsContainer
          error={error}
          isError={isError}
          isLoading={isLoading}
          isEmptyData={isEmpty(data?.allTransactions)}
          emptyMessage="No Transactions found!"
        >
          <div className="mt-3 space-y-3">
            {data?.allTransactions?.map(trans => (
              <TransCard
                key={trans.id}
                id={trans.id}
                amount={trans.amount || 0}
                categoryName={categoryName || 'Category'}
                date={trans.date ? new Date(trans.date) : new Date()}
                description={trans.description || `Transaction ${trans.id}`}
                categoryId={trans.category_id || 0}
                transType={trans.trans_type || 0}
              />
            ))}
          </div>
        </ResultsContainer>
      </section>
    </>
  );
};

export default CategoryPage;
