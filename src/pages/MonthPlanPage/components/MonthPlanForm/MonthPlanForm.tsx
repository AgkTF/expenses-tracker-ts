import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { InputField } from 'components/form';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

type Props = {
  push: (...args: any[]) => any;
};

function MonthPlanForm({ push }: Props) {
  return (
    <section>
      <div className="px-8 mt-8">
        <section className="mb-5 w-full flex items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-600">💸 Expenses</h3>

          <button
            className="p-1 btn-grey"
            onClick={() => push('expensesCategories', undefined)}
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
              <Field
                name={`${line}.name`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="text"
                    containerClasses="mb-4"
                    placeholder="Category Name"
                    rhs="length"
                    inputLength="50"
                  />
                )}
              />

              <Field
                name={`${line}.planned_amount`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="number"
                    containerClasses="mb-4"
                    placeholder="Amount"
                    rhs="currency"
                  />
                )}
                parse={value => value && +value}
              />

              {index >= 1 ? (
                <button
                  className="p-1 btn-grey"
                  onClick={() => fields.remove(index)}
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
              ) : (
                <div className="p-1">
                  <div className="h-5 w-5"></div>
                </div>
              )}
            </div>
          ))
        }
      </FieldArray>

      <div className="px-8 mt-8">
        <section className="mb-5 w-full flex items-center justify-between">
          <h3 className="font-semibold text-lg text-slate-600">💰 Income</h3>
          <button
            className="p-1 btn-grey"
            onClick={() => push('incomeCategories', undefined)}
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
              <Field
                name={`${line}.name`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="text"
                    containerClasses="mb-4"
                    placeholder="Category Name"
                    rhs="length"
                    inputLength="50"
                  />
                )}
              />

              <Field
                name={`${line}.planned_amount`}
                render={({ input, meta }) => (
                  <InputField
                    input={input}
                    meta={meta}
                    type="number"
                    containerClasses="mb-4"
                    placeholder="Amount"
                    rhs="currency"
                  />
                )}
              />

              {index >= 1 ? (
                <button
                  className="p-1 btn-grey"
                  onClick={() => fields.remove(index)}
                >
                  <MinusIcon className="h-5 w-5" />
                </button>
              ) : (
                <div className="p-1">
                  <div className="h-5 w-5"></div>
                </div>
              )}
            </div>
          ))
        }
      </FieldArray>
    </section>
  );
}

export default MonthPlanForm;
