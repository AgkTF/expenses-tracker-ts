import CustomFormElement from '../CustomFormElement/CustomFormElement';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { errorClasses, regularClasses } from 'utils/constants/form.constants';

type Props = {
  containerClasses?: string;
  label?: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  type: 'text' | 'datetime-local' | 'date' | 'number' | 'time';
  placeholder?: string;
};

const InputField = ({
  containerClasses,
  label,
  input,
  meta,
  type,
  placeholder,
}: Props) => {
  return (
    <CustomFormElement
      containerClasses={containerClasses}
      label={label}
      input={input}
      meta={meta}
    >
      <input
        {...input}
        type={type}
        id={input.name}
        placeholder={placeholder}
        className={`mb-1 w-full rounded-md focus:ring-2 placeholder:font-light text-sm font-medium ${
          meta.touched && meta.error ? errorClasses : regularClasses
        }`}
      />
    </CustomFormElement>
  );
};

export default InputField;
