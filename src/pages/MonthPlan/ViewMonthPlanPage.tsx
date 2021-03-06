import { Button, MonthIcon } from 'components/UIElements';
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { moneyFormatter } from 'utils/helpers/numbers.helpers';
import { MonthPlanForm, TotalCards } from './components';
import { IMonthPlanForm } from 'types/forms';
import { useFetchMonthPlan, useUpdateMonthPlan } from 'hooks/useMonthPlan';
import { useStore } from 'store/useStore';
import toast from 'react-hot-toast';
import { InputField } from 'components/form';
import { required } from 'utils/helpers/validation.helpers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';

type Props = {};

const INIT_VALUES = {
  expensesCategories: [
    { planned_amount: '' },
    { planned_amount: '' },
    { planned_amount: '' },
  ],
  incomeCategories: [{ planned_amount: '' }, { planned_amount: '' }],
  openingBalance: '',
};

const ViewMonthPlanPage = (props: Props) => {
  const defaultCurrency = useStore(state => state.currency);
  const navigate = useNavigate();

  const {
    isLoading: isPlanLoading,
    isError,
    error,
    data: monthPlan,
    isSuccess,
  } = useFetchMonthPlan(new Date());

  useEffect(() => {
    if (
      isSuccess &&
      isEmpty(monthPlan?.expensesCategories) &&
      isEmpty(monthPlan?.incomeCategories)
    ) {
      console.log(' ㊙️ ');
      navigate('/create-month-plan', {
        replace: true,
      });
    }
  }, [isSuccess, monthPlan, navigate]);

  const onSuccessHandler = () => {
    toast.success('Month plan updated successfully');
  };

  const onErrorHandler = () => {
    toast.error('Failed to add month plan');
  };

  const updateMonthPlanMutation = useUpdateMonthPlan(
    onSuccessHandler,
    onErrorHandler
  );

  const onSubmit = async (values: IMonthPlanForm) => {
    // console.log(values);

    if (monthPlan) {
      updateMonthPlanMutation.mutate({
        newValues: values,
        oldValues: monthPlan,
      });
    }
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
        keepDirtyOnReinitialize
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={isSuccess && monthPlan ? monthPlan : INIT_VALUES}
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
                      validate={required}
                      render={({ input, meta }) => (
                        <InputField
                          isDisabled
                          input={input}
                          meta={meta}
                          type="text"
                          inputClassNames="mt-2 w-full bg-transparent focus:bg-slate-50 focus:border-none focus:outline-none text-2xl text-center text-slate-600 font-semibold rounded-md"
                        />
                      )}
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

                <MonthPlanForm push={push} formPage="view" />

                <div className="mt-5 pb-6 mx-auto flex items-center justify-center gap-x-16">
                  <Button
                    type="button"
                    className="bg-slate-400 font-semibold text-gray-50 text-sm rounded-md tracking-wide py-1 px-5"
                    label="Cancel"
                    // isDisabled={isLoading}
                  />

                  <Button
                    type="submit"
                    label="Save"
                    className="bg-green-500 font-semibold text-gray-50 text-sm rounded-md tracking-wide py-1 px-6 flex justify-center min-w-[84px]"
                    isDisabled={submitting || pristine}
                    // isDisabled={submitting || pristine || isLoading}
                    // isLoading={isLoading}
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

export default ViewMonthPlanPage;
