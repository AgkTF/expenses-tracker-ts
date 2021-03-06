import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { InputField, SelectField } from 'components/form';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { upperFirst } from 'lodash';
import numberFormatter from 'utils/helpers/numbers.helpers';
import { required } from 'utils/helpers/validation.helpers';
import { useDeleteCategory } from 'hooks/useMonthPlan';
import toast from 'react-hot-toast';
import { NewCategoryModal } from 'components/UIElements';
import { useState } from 'react';
import { useCategories } from 'hooks/useUserSettings';

type Props = {
  push: (...args: any[]) => any;
  formPage: 'view' | 'create';
};

const onSuccessHandler = () => {
  toast.success('Category deleted successfully');
};

const onErrorHandler = () => {
  toast.error('Failed to delete category!');
};

function MonthPlanForm({ push, formPage }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isError,
    error,
    isLoading: isCategoriesLoading,
  } = useCategories();

  const deleteCategoryMutation = useDeleteCategory(
    onSuccessHandler,
    onErrorHandler
  );

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const addLine = (categoryType: 'expensesCategories' | 'incomeCategories') => {
    push(categoryType, { planned_amount: '' });
  };

  return (
    <section>
      <div className="px-8 mt-8">
        <section className="mb-5 w-full flex items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-600">💸 Expenses</h3>

          <button
            type="button"
            className="p-1 btn-grey"
            onClick={() => {
              if (formPage === 'create') {
                addLine('expensesCategories');
              } else {
                toggleModal();
              }
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </section>

        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Category Name</p>
          <p className="text-sm font-medium text-gray-600">Planned Amount</p>
          <div className="h-5 w-5"></div>
        </div>
      </div>

      <FieldArray name="expensesCategories">
        {({ fields }) =>
          fields.map((line, index) => (
            <div
              key={line}
              className="px-8 flex items-start justify-between gap-x-4"
            >
              {/* <Field
                name={`${line}.name`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="text"
                    containerClasses="mb-4"
                    placeholder="Category Name"
                  />
                )}
                parse={value => value && upperFirst(value)}
                validate={required}
              /> */}

              <Field
                name={`${line}.category_id`}
                render={({ input, meta }) => (
                  <SelectField
                    input={input}
                    meta={meta}
                    containerClasses="mb-4"
                    firstOption="Select category"
                    options={data}
                    displayNameProperty="description"
                    isLoading={isCategoriesLoading}
                  />
                )}
                validate={required}
              />

              <Field
                name={`${line}.planned_amount`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="text"
                    containerClasses="mb-4"
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

              <button
                type="button"
                className="p-1 btn-grey"
                onClick={() => {
                  const currentLine = fields.value[index];
                  console.log(currentLine);
                  if (currentLine.id) {
                    deleteCategoryMutation.mutate(currentLine.id);
                  } else {
                    fields.remove(index);
                  }
                }}
              >
                <MinusIcon className="h-5 w-5" />
              </button>
            </div>
          ))
        }
      </FieldArray>

      <div className="px-8 mt-8">
        <section className="mb-5 w-full flex items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-600">💰 Income</h3>
          <button
            type="button"
            className="p-1 btn-grey"
            onClick={() => {
              if (formPage === 'create') {
                addLine('incomeCategories');
              } else {
                toggleModal();
              }
            }}
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </section>

        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Category Name</p>
          <p className="text-sm font-medium text-gray-600">Planned Amount</p>
          <div className="h-5 w-5"></div>
        </div>
      </div>

      <FieldArray name="incomeCategories">
        {({ fields }) =>
          fields.map((line, index) => (
            <div
              key={line}
              className="px-8 flex items-start justify-between gap-x-4"
            >
              {/* <Field
                name={`${line}.name`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="text"
                    containerClasses="mb-4"
                    placeholder="Category Name"
                  />
                )}
                parse={value => value && upperFirst(value)}
                validate={required}
              /> */}

              <Field
                name={`${line}.category_id`}
                render={({ input, meta }) => (
                  <SelectField
                    input={input}
                    meta={meta}
                    containerClasses="mb-4"
                    firstOption="Select category"
                    options={data}
                    displayNameProperty="description"
                    isLoading={isCategoriesLoading}
                  />
                )}
                validate={required}
              />

              <Field
                name={`${line}.planned_amount`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="text"
                    containerClasses="mb-4"
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

              <button
                type="button"
                className="p-1 btn-grey"
                onClick={() => fields.remove(index)}
              >
                <MinusIcon className="h-5 w-5" />
              </button>
            </div>
          ))
        }
      </FieldArray>

      <NewCategoryModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </section>
  );
}

export default MonthPlanForm;
