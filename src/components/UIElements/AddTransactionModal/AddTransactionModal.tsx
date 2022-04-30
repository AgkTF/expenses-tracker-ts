// TODO: try invalid: in tailwind

import { XIcon } from '@heroicons/react/solid';
import Modal from 'react-modal';
import { Field, Form } from 'react-final-form';
import { CustomFormElement, InputField, SelectField } from 'components/form';
import { errorClasses, regularClasses } from 'utils/constants/form.constants';

Modal.setAppElement('#root');

type Props = {
  isOpen: boolean;
  toggleModal: () => void;
};

const AddTransactionModal = ({ isOpen, toggleModal }: Props) => {
  const onSubmit = (values: any) => {
    console.log(values);
  };

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
            {/* <Field name="date">
              {({ input, meta }) => (
                <CustomFormElement
                  input={input}
                  meta={meta}
                  containerClasses="mb-2"
                  label="Date"
                >
                  <input
                    {...input}
                    type="datetime-local"
                    id={input.name}
                    className={`mb-1 w-full rounded-md focus:ring-2 ph-12-light text-sm font-medium ${
                      meta.touched && meta.error ? errorClasses : regularClasses
                    }`}
                  />
                </CustomFormElement>
              )}
            </Field>

            <Field
              name="date"
              render={({ input, meta }) => (
                <CustomFormElement
                  input={input}
                  meta={meta}
                  containerClasses="mb-2"
                  label="Date"
                >
                  <input
                    {...input}
                    type="datetime-local"
                    id={input.name}
                    className={`mb-1 w-full rounded-md focus:ring-2 ph-12-light text-sm font-medium ${
                      meta.touched && meta.error ? errorClasses : regularClasses
                    }`}
                  />
                </CustomFormElement>
              )}
            /> */}

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
                  type="number"
                  containerClasses="mb-2"
                  label="Amount"
                  placeholder="Amount"
                />
              )}
            />

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
                />
              )}
            />

            <Field
              name="category"
              render={({ input, meta }) => (
                <SelectField
                  input={input}
                  meta={meta}
                  containerClasses="mb-2"
                  label="Description"
                  firstOption="Select category"
                  options={[{ id: '1', displayName: 'car' }]}
                />
              )}
            />
          </form>
        )}
      />
    </Modal>
  );
};

export default AddTransactionModal;
