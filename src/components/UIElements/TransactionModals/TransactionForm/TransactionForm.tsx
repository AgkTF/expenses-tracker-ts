import { Checkbox, InputField, SelectField } from 'components/form';
import Button from 'components/UIElements/Button/Button';
import useCategoryTypes from 'hooks/useCategoryTypes';
import useExpensesCategoriesDetails from 'hooks/useExpensesCategoriesDetails';
import useIncomeDetails from 'hooks/useIncomeDetails';
import { Field } from 'react-final-form';
import { definitions } from 'types/supabase';
import numberFormatter from 'utils/helpers/numbers.helpers';
import { required } from 'utils/helpers/validation.helpers';

const testDate = new Date();

type Props = {
  toggleModal: () => void;
  isLoading: boolean;
  values: definitions['transaction'];
  pristine?: boolean;
};

const TransactionForm = ({
  toggleModal,
  isLoading,
  values,
  pristine,
}: Props) => {
  const {
    isLoading: isExpensesLoading,
    isError: isExpensesError,
    error: expensesError,
    data: expensesData,
  } = useExpensesCategoriesDetails(testDate);

  const {
    isLoading: isTypesLoading,
    isError: isTypesError,
    error: typesError,
    data: typesData,
  } = useCategoryTypes();

  const {
    isLoading: isIncomeLoading,
    isError: isIncomeError,
    error: incomeError,
    data: incomeData,
  } = useIncomeDetails(testDate);

  return (
    <>
      <Field
        name="date"
        render={({ input, meta }) => (
          <InputField
            input={input}
            meta={meta}
            type="datetime-local"
            containerClasses="mb-2"
            label="Date"
          />
        )}
      />
      <Field
        name="amount"
        render={({ input, meta }) => (
          <InputField
            input={input}
            meta={meta}
            type="text"
            containerClasses="mb-2"
            label="Amount"
            placeholder="Amount"
            rhs="currency"
          />
        )}
        format={value =>
          value && !isNaN(value) ? numberFormatter(+value) : value
        }
        parse={value => value && +value.replaceAll(',', '')}
        validate={required}
      />
      <Field
        name="trans_type"
        render={({ input, meta }) => (
          <SelectField
            input={input}
            meta={meta}
            containerClasses="mb-2"
            label="Transaction Type"
            firstOption="Select Type"
            options={typesData}
            displayNameProperty="name"
            isLoading={isTypesLoading}
          />
        )}
        parse={value => +value}
        validate={required}
      />
      {/* //! two naming conventions are used here. I know it's not ideal but it's saving me from changing the key later when I submit the form */}
      {values.trans_type && values.trans_type === 1 && (
        <Field
          name="category_id"
          render={({ input, meta }) => (
            <SelectField
              input={input}
              meta={meta}
              containerClasses="mb-2"
              label="Expense Category"
              firstOption="Select category"
              options={expensesData?.categories}
              displayNameProperty="name"
              isLoading={isExpensesLoading}
            />
          )}
          validate={required}
        />
      )}
      {values.trans_type && values.trans_type === 2 && (
        <Field
          name="category_id"
          render={({ input, meta }) => (
            <SelectField
              input={input}
              meta={meta}
              containerClasses="mb-2"
              label="Income Category"
              firstOption="Select category"
              options={incomeData?.categories}
              displayNameProperty="name"
              isLoading={isIncomeLoading}
            />
          )}
          validate={required}
        />
      )}
      <Field
        name="description"
        render={({ input, meta }) => (
          <InputField
            input={input}
            meta={meta}
            type="text"
            containerClasses="mb-2"
            label="Description"
            placeholder="Description"
            rhs="length"
            inputLength="50"
          />
        )}
        validate={required}
      />
      <Field
        name="isCardTrans"
        type="checkbox"
        render={({ input, meta }) => (
          <Checkbox
            input={input}
            meta={meta}
            containerClasses="mb-2"
            label="Card Transaction?"
          />
        )}
      />
      <div className="w-3/4 pt-2 mx-auto flex items-center justify-between">
        <Button
          type="button"
          className="bg-slate-400 font-semibold text-gray-50 text-sm rounded-md tracking-wide py-1 px-5"
          onClickHandler={toggleModal}
          label="Cancel"
        />

        <Button
          type="submit"
          label="Save"
          className="bg-green-500 font-semibold text-gray-50 text-sm rounded-md tracking-wide py-1 px-6 flex justify-center min-w-[84px]"
          isDisabled={isLoading || pristine}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default TransactionForm;
