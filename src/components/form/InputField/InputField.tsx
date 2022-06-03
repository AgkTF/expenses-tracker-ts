// TODO: try invalid: in tailwind

import CustomFormElement from '../CustomFormElement/CustomFormElement';
import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { errorClasses, regularClasses } from 'utils/constants/form.constants';
import { useStore } from 'store/useStore';

type Props = {
  containerClasses?: string;
  label?: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  type: 'text' | 'datetime-local' | 'date' | 'number' | 'time';
  placeholder?: string;
  rhs?: 'length' | 'currency';
  inputLength?: string;
  inputClassNames?: string;
  isDisabled?: boolean;
};

const InputField = ({
  containerClasses,
  label,
  input,
  meta,
  type,
  placeholder,
  rhs,
  inputLength,
  inputClassNames = 'mb-1 w-full rounded-md focus:ring-2 placeholder:font-light placeholder:text-xs text-sm font-medium',
  isDisabled,
}: Props) => {
  const defaultCurrency = useStore(state => state.currency);

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
        className={`${inputClassNames} ${
          meta.touched && meta.error ? errorClasses : regularClasses
        }`}
        disabled={isDisabled}
      />

      <span
        className={`absolute right-[12px] leading-[38px] font-light text-xs ${
          meta.touched && meta.error ? 'text-red-300' : 'text-slate-500'
        }`}
      >
        {rhs && rhs === 'length' && `${input.value.length}/${inputLength}`}

        {rhs && rhs === 'currency' && defaultCurrency}
      </span>
    </CustomFormElement>
  );
};

export default InputField;
