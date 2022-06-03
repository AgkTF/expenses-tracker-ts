import { FieldInputProps, FieldMetaState } from 'react-final-form';
import { errorClasses, regularClasses } from 'utils/constants/form.constants';
import CustomFormElement from '../CustomFormElement/CustomFormElement';

type Props = {
  containerClasses?: string;
  label?: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
};

const Checkbox = ({ containerClasses, label, input, meta }: Props) => {
  return (
    <CustomFormElement
      isCheckbox
      containerClasses={containerClasses}
      label={label}
      input={input}
      meta={meta}
    >
      <input
        {...input}
        id={input.name}
        type="checkbox"
        className={`rounded focus:ring-2 placeholder:font-light text-sm font-medium shadow-md ${
          meta.touched && meta.error ? errorClasses : regularClasses
        }`}
      />
    </CustomFormElement>
  );
};

export default Checkbox;
