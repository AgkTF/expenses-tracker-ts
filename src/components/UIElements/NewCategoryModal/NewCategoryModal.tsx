import { XIcon } from '@heroicons/react/solid';
import Modal from 'react-modal';
import { Field, Form } from 'react-final-form';
import { InputField, SelectField } from 'components/form';
import Button from '../Button/Button';
import { definitions } from 'types/supabase';
import toast from 'react-hot-toast';
import useCategoryTypes from 'hooks/useCategoryTypes';
import numberFormatter from 'utils/helpers/numbers.helpers';
import { required } from 'utils/helpers/validation.helpers';
import { useQueryClient } from 'react-query';
import { useAddCategory } from 'hooks/useMonthPlan';

Modal.setAppElement('#root');

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
};

const NewCategoryModal = ({ isOpen, toggleModal }: Props) => {
  const queryClient = useQueryClient();

  const onErrorHandler = () => {
    toast.error('Failed to add new category!');
  };

  const onSuccessHandler = () => {
    toast.success('Category added successfully!');
    toggleModal();
    // * we should invalidate only the plan of this month not all the plans like we're doing below.
    // * we'll take care of this later, though.
    queryClient.invalidateQueries(['month_plan']);
  };

  const {
    isLoading: isTypesLoading,
    isError: isTypesError,
    error: typesError,
    data: typesData,
  } = useCategoryTypes();

  const addCategoryMutation = useAddCategory(onSuccessHandler, onErrorHandler);
  const onSubmit = (values: Partial<definitions['month_category']>): void => {
    addCategoryMutation.mutate(values);
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      className="py-5 px-4 w-80 rounded-lg absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50"
      contentLabel="Add new transaction Modal"
    >
      <div className="mb-5 w-full flex items-center justify-between text-slate-600">
        <p className="font-semibold text-base">Add new category</p>
        <button onClick={() => toggleModal()}>
          <XIcon className="h-4 w-4" />
        </button>
      </div>

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
                  containerClasses="mb-2"
                  label="Category Type"
                  firstOption="Select Type"
                  options={typesData}
                  displayNameProperty="name"
                  isLoading={isTypesLoading}
                />
              )}
              parse={value => +value}
              validate={required}
            />

            <Field
              name="name"
              render={({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  containerClasses="mb-2"
                  label="Category Name"
                  placeholder="Category Name"
                  rhs="length"
                  inputLength="50"
                />
              )}
            />

            <Field
              name="planned_amount"
              render={({ input, meta }) => (
                <InputField
                  input={input}
                  meta={meta}
                  type="text"
                  containerClasses="mb-2"
                  label="Planned Amount"
                  placeholder="Planned Amount"
                  rhs="currency"
                />
              )}
              format={value =>
                value && !isNaN(value) ? numberFormatter(+value) : value
              }
              parse={value => value && +value.replaceAll(',', '')}
              validate={required}
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
                isDisabled={addCategoryMutation.isLoading}
                isLoading={addCategoryMutation.isLoading}
              />
            </div>
          </form>
        )}
      />
    </Modal>
  );
};

export default NewCategoryModal;
