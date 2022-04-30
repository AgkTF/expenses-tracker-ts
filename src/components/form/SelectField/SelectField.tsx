import CustomFormElement from '../CustomFormElement/CustomFormElement';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { errorClasses, regularClasses } from 'utils/constants/form.constants';
import { Spinner } from 'components/UIElements';

type Props = {
  containerClasses?: string;
  label?: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  options: { [key: string]: string | number | undefined }[] | undefined;
  firstOption?: string;
  displayNameProperty?: string;
  isLoading?: boolean;
};

const SelectField = ({
  containerClasses,
  label,
  input,
  meta,
  options,
  firstOption,
  displayNameProperty = 'displayName',
  isLoading,
}: Props) => {
  return (
    <CustomFormElement
      containerClasses={containerClasses}
      label={label}
      input={input}
      meta={meta}
    >
      <div className="relative">
        <select
          {...input}
          id={input.name}
          className={`mb-1 w-full rounded-md focus:ring-2 placeholder:font-light text-sm font-medium ${
            meta.touched && meta.error ? errorClasses : regularClasses
          }`}
        >
          {firstOption && <option value="">{firstOption}</option>}
          {options?.map(op => (
            <option key={op.id} value={op.id}>
              {op[displayNameProperty]}
            </option>
          ))}
        </select>

        {isLoading && (
          <div className="absolute top-1/2 right-8 -translate-y-1/2">
            <Spinner />
          </div>
        )}
      </div>
    </CustomFormElement>
  );
};

export default SelectField;
