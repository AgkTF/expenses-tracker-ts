import { XIcon } from '@heroicons/react/solid';
import Modal from 'react-modal';
import { Field, Form } from 'react-final-form';
import { Checkbox, InputField, SelectField } from 'components/form';
import useExpensesDetails from 'hooks/useExpensesDetails';
import Button from '../Button/Button';
import useAddTransaction from 'hooks/useAddTransaction';
import { definitions } from 'types/supabase';
import toast from 'react-hot-toast';
import useCategoryTypes from 'hooks/useCategoryTypes';
import useIncomeDetails from 'hooks/useIncomeDetails';
import {
  useAvailableBalance,
  useAddBalanceRecord,
} from 'hooks/useAvailableBalance';
import numberFormatter from 'utils/helpers/numbers.helpers';
import { required } from 'utils/helpers/validation.helpers';

Modal.setAppElement('#root');

// const testDate = new Date('11/11/2021');
const testDate = new Date();

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
};

const AddTransactionModal = ({ isOpen, toggleModal }: Props) => {
  const addBalanceRecordMutation = useAddBalanceRecord();

  const {
    isLoading: isBalanceLoading,
    isError: isBalanceError,
    error: balanceError,
    data: availableBalance,
  } = useAvailableBalance();

  const onSuccessHandler = (data: definitions['transaction'][]) => {
    toast.success('Transaction added successfully');
    toggleModal();

    const { id, amount, trans_type } = data[0];

    if (availableBalance && availableBalance.new_balance && amount) {
      addBalanceRecordMutation.mutate({
        trans_id: id,
        old_balance: availableBalance.new_balance,
        new_balance:
          trans_type === 1
            ? availableBalance.new_balance - amount
            : availableBalance.new_balance + amount,
      });
    }
  };

  const onErrorHandler = () => {
    toast.error('Failed to add transaction');
  };

  const addTransMutation = useAddTransaction(onSuccessHandler, onErrorHandler);

  const onSubmit = (values: definitions['transaction']): void => {
    addTransMutation.mutate(values);
  };

  const {
    isLoading: isExpensesLoading,
    isError: isExpensesError,
    error: expensesError,
    data: expensesData,
  } = useExpensesDetails(testDate);

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
    <Modal
      isOpen={isOpen}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      className="py-5 px-4 w-80 rounded-lg absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50"
      contentLabel="Add new transaction Modal"
    >
      <div className="mb-5 w-full flex items-center justify-between text-slate-600">
        <p className="font-semibold text-base">Add new transaction</p>
        <button onClick={() => toggleModal()}>
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
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
                isDisabled={addTransMutation.isLoading}
                isLoading={addTransMutation.isLoading}
              />
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default AddTransactionModal;
