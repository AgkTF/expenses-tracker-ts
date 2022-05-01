import { Button, MonthIcon } from 'components/UIElements';
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { MonthPlanForm, TotalCards } from './components';
import { IMonthPlanForm } from 'types/forms';
import useCreateMonthPlan from 'hooks/useCreateMonthPlan';
import { useStore } from 'store/useStore';
import toast from 'react-hot-toast';

type Props = {};

const MonthPlanPage = (props: Props) => {
  const defaultCurrency = useStore(state => state.currency);
  const onSuccessHandler = () => {
    toast.success('Plan created successfully');
  };

  const onErrorHandler = () => {
    toast.error('Failed to add month plan');
  };

  const { mutate, isLoading } = useCreateMonthPlan(
    onSuccessHandler,
    onErrorHandler
  );

  const onSubmit = async (values: IMonthPlanForm) => {
    console.log(values);
    // mutate(values);
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
          expensesCategories: [
            { planned_amount: '' },
            { planned_amount: '' },
            { planned_amount: '' },
          ],
          incomeCategories: [{ planned_amount: '' }, { planned_amount: '' }],
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
                      name="openingBalance"
                      component="input"
                      className="mt-1 w-full bg-transparent focus:bg-slate-50 focus:border-none focus:outline-none text-2xl text-center text-slate-600 font-semibold rounded-md"
                      format={value =>
                        value && !isNaN(value)
                          ? moneyFormatter(+value, defaultCurrency)
                          : value
                      }
                      parse={value =>
                        value &&
                        +value
                          .replace(defaultCurrency, '')
                          .replaceAll(',', '')
                          .trim()
                      }
                    />
                  </div>
                </div>

                <TotalCards
                  expensesCategories={values.expensesCategories}
                  incomeCategories={values.incomeCategories}
                />

                <MonthPlanForm push={push} />

                <div className="mt-5 pb-6 mx-auto flex items-center justify-center gap-x-16">
                  <Button
                    type="button"
                    className="bg-slate-400 font-semibold text-gray-50 text-sm rounded-md tracking-wide py-1 px-5"
                    label="Cancel"
                    isDisabled={isLoading}
                  />

                  <Button
                    type="submit"
                    label="Save"
                    className="bg-green-500 font-semibold text-gray-50 text-sm rounded-md tracking-wide py-1 px-6 flex justify-center min-w-[84px]"
                    isDisabled={submitting || pristine || isLoading}
                    isLoading={isLoading}
                  />
                </div>
              </form>
            </div>
          );
        }}
      />
    </div>
  );
};

export default MonthPlanPage;
