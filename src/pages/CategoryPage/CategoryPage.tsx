import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryTrans from 'hooks/useCategoryTrans';
import { BarChart, TransCard } from 'components/UIElements';
import { Field, Form } from 'react-final-form';
import { SelectField } from 'components/form';
import { useMonthInterval } from 'hooks/useMonthInterval';

const testDate = new Date();

type Props = {};

const CategoryPage = (props: Props) => {
  let navigate = useNavigate();
  const { categoryName, categoryId } = useParams();
  const intervals = useMonthInterval(new Date());

  const { isLoading, isError, error, data } = useCategoryTrans(
    testDate,
    categoryId
  );

  const onSubmit = () => {};

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

      <section className="px-4 mt-10 w-full">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="type"
                render={({ input, meta }) => (
                  <SelectField
                    input={input}
                    meta={meta}
                    label="Interval"
                    firstOption="Select Interval"
                    options={intervals?.options}
                    displayNameProperty="name"
                  />
                )}
              />
            </form>
          )}
        />
      </section>

      <section className="h-56">
        {/* <BarChart data={data?.chartData || []} /> */}
        {!isLoading && data && data.chartData ? (
          <BarChart data={data.chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section className="px-4 mt-10 w-full">
        <h3 className="text-sm font-medium text-slate-500">
          Tuesday, 06 July 2021
        </h3>

        {/* <div className="mt-3 space-y-3">
          {data?.map(trans => (
            <TransCard
              key={trans.id}
              amount={trans.amount || 0}
              categoryName={categoryName || 'Category'}
              date={trans.date ? new Date(trans.date) : new Date()}
              description={trans.description || `Transaction ${trans.id}`}
            />
          ))}
        </div> */}
      </section>
    </>
  );
};

export default CategoryPage;
