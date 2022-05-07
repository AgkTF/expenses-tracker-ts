import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryTrans from 'hooks/useCategoryTrans';
import { TransCard } from 'components/UIElements';

const testDate = new Date();

type Props = {};

const CategoryPage = (props: Props) => {
  let navigate = useNavigate();
  const { categoryName, categoryId } = useParams();

  const { isLoading, isError, error, data } = useCategoryTrans(
    testDate,
    categoryId
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <section className="px-4 mt-8 w-full flex items-center">
          <button
            type="button"
            className="p-1 text-slate-700 bg-slate-100 rounded"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <h1 className="w-full font-bold text-xl text-slate-600 text-center">
            {categoryName}
          </h1>
        </section>
      </div>

      <section className="px-4 mt-10 w-full space-y-3">
        {data?.map(trans => (
          <TransCard
            key={trans.id}
            amount={trans.amount || 0}
            categoryName={categoryName || 'Category'}
            date={trans.date ? new Date(trans.date) : new Date()}
            description={trans.description || `Transaction ${trans.id}`}
          />
        ))}
      </section>
    </>
  );
};

export default CategoryPage;
