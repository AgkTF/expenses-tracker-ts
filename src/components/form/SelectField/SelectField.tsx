import CustomFormElement from '../CustomFormElement/CustomFormElement';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { errorClasses, regularClasses } from 'utils/constants/form.constants';

type Props = {
  containerClasses?: string;
  label?: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  options: { id: string; displayName: string }[];
  firstOption?: string;
};

const SelectField = ({
  containerClasses,
  label,
  input,
  meta,
  options,
  firstOption,
}: Props) => {
  return (
    <CustomFormElement
      containerClasses={containerClasses}
      label={label}
      input={input}
      meta={meta}
    >
      <select
        {...input}
        id={input.name}
        className={`mb-1 w-full rounded-md focus:ring-2 placeholder:font-light text-sm font-medium ${
          meta.touched && meta.error ? errorClasses : regularClasses
        }`}
      >
        {firstOption && <option value="">{firstOption}</option>}
        {options.map(op => (
          <option key={op.id} value={op.id}>
            {op.displayName}
          </option>
        ))}
      </select>
    </CustomFormElement>
  );
};

export default SelectField;
