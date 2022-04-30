import { MonthIcon } from 'components/UIElements';
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { MonthPlanForm } from './components';

type Props = {};

const MonthPlanPage = (props: Props) => {
  const onSubmit = (values: any) => {
    console.log(values);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-8 flex items-center justify-center">
        <MonthIcon />
        <h1 className="ml-3 font-bold text-xl text-slate-600">
          Plan Your Month
        </h1>
      </div>

      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={{
          expensesCategories: [{}, {}],
          incomeCategories: [{}, {}, {}],
          openingBalance: '',
        }}
        validateOnBlur={true}
        render={({
          handleSubmit,
          form: {
            mutators: { push },
          },
          pristine,
          // form, if your need to add a reset button call form.reset()
          submitting,
          values,
        }) => {
          return (
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="my-5 mx-auto w-48 py-4 px-3 text-center rounded-md bg-slate-100 shadow-sm">
                  <p className="text-slate-400 font-medium text-sm">
                    Opening Balance
                  </p>

                  <div className="flex text-slate-600 font-semibold text-2xl">
                    <Field
                      formatOnBlur
                      name="openingBalance"
                      component="input"
                      className="mt-1 w-full bg-transparent focus:bg-slate-50 focus:border-none focus:outline-none text-2xl text-center text-slate-600 font-semibold rounded-md"
                      format={value =>
                        value && !isNaN(value)
                          ? moneyFormatter(+value, 'USD')
                          : value
                      }
                    />
                  </div>
                </div>

                <MonthPlanForm />
              </form>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MonthPlanPage;
