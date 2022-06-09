import { Button, NewCategoryTypeModal } from 'components/UIElements';
import arrayMutators from 'final-form-arrays';
import { Field, Form } from 'react-final-form';
import { InputField, SelectField } from 'components/form';
import { required } from 'utils/helpers/validation.helpers';
import { useState } from 'react';
import { upperFirst } from 'lodash';
import { FieldArray } from 'react-final-form-arrays';
import useCategoryTypes from 'hooks/useCategoryTypes';
import { MinusIcon, PlusIcon } from '@heroicons/react/solid';
import { ICategoriesSettings } from 'types/forms';
import {
  useUpdateCategories,
  useCategories,
  useDeleteCategory,
} from 'hooks/useUserSettings';

type Props = {};

const CategoriesTab = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const {
    isLoading: isTypesLoading,
    isError: isTypesError,
    error: typesError,
    data: typesData,
  } = useCategoryTypes();

  const { mutate, isLoading } = useUpdateCategories();

  const useDeleteCategoryMutation = useDeleteCategory();

  const {
    data,
    isError,
    error,
    isLoading: isCategoriesLoading,
  } = useCategories();

  const onSubmit = (values: ICategoriesSettings) => {
    console.log(values);
    mutate(values);
  };

  return (
    <div className="py-5">
      <Form
        keepDirtyOnReinitialize
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        validateOnBlur={true}
        initialValues={
          !isCategoriesLoading && data ? { categories: data.allCategories } : {}
        }
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
            <>
              <form onSubmit={handleSubmit} className="w-full">
                <div>
                  <section className="mb-5 w-full flex items-center justify-between">
                    <h3 className="font-medium text-slate-600">
                      Add your monthly categories:
                    </h3>

                    <button
                      type="button"
                      className="p-1 btn-grey"
                      onClick={toggleModal}
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </section>

                  <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-500">
                    <p>Category Name</p>
                    <p>Category Type</p>
                    <div className="h-5 w-5"></div>
                  </div>
                </div>

                <FieldArray name="categories">
                  {({ fields }) =>
                    fields.map((line, index) => (
                      <div
                        key={line}
                        className="flex items-start justify-between gap-x-4"
                      >
                        <Field
                          name={`${line}.description`}
                          render={({ input, meta }) => (
                            <InputField
                              input={input}
                              meta={meta}
                              type="text"
                              containerClasses="mb-2 w-full"
                              placeholder="Category Name"
                            />
                          )}
                          parse={value => value && upperFirst(value)}
                          validate={required}
                        />

                        <Field
                          name={`${line}.type`}
                          render={({ input, meta }) => (
                            <SelectField
                              input={input}
                              meta={meta}
                              containerClasses="mb-2 w-full"
                              firstOption="Select Type"
                              options={typesData}
                              displayNameProperty="name"
                              isLoading={isTypesLoading}
                            />
                          )}
                          parse={value => +value}
                          validate={required}
                        />

                        <button
                          type="button"
                          className="p-1 btn-grey"
                          onClick={() => {
                            const currentLine = fields.value[index];
                            useDeleteCategoryMutation.mutate(currentLine.id);
                          }}
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                      </div>
                    ))
                  }
                </FieldArray>

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
                    isDisabled={submitting || pristine}
                    // isDisabled={submitting || pristine || isLoading}
                    isLoading={isLoading}
                  />
                </div>
              </form>

              <NewCategoryTypeModal
                isOpen={isModalOpen}
                toggleModal={toggleModal}
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default CategoriesTab;
