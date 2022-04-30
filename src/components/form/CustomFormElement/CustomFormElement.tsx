import React, { ReactNode } from 'react';
import { FieldInputProps, FieldMetaState } from 'react-final-form';

type Props = {
  containerClasses?: string;
  label?: string;
  input: FieldInputProps<any, HTMLElement>;
  meta: FieldMetaState<any>;
  children: ReactNode;
  isCheckbox?: boolean;
};

const CustomFormElement = ({
  containerClasses,
  label,
  input,
  meta,
  children,
  isCheckbox,
}: Props) => {
  return (
    <div className={`relative ${containerClasses}`}>
      {isCheckbox ? (
        <>
          {children}

          {label && (
            <label
              className="inline-block ml-2 text-slate-500 font-medium text-sm"
              htmlFor={input.name}
            >
              {label}
            </label>
          )}
        </>
      ) : (
        <>
          {label && (
            <label
              className="inline-block mb-1 text-slate-500 font-medium text-sm"
              htmlFor={input.name}
            >
              {label}
            </label>
          )}

          {children}
        </>
      )}

      <p className="text-red-400 font-normal text-xs">
        {meta.touched ? meta.error : ''}
      </p>
    </div>
  );
};

export default CustomFormElement;
