import { InputHTMLAttributes } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import * as S from './styles';
import { OptionProps } from '../../libs/common';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  control: Control<any>;
  label?: string;
  name: string;
  rules?: RegisterOptions;
  errorMessage?: string;
  options?: OptionProps[];
};

export function Input(props: Props) {
  const {
    label,
    control,
    name,
    defaultValue,
    rules,
    errorMessage,
    options,
    ...rest
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules });

  if (rest.type === 'select' && options)
    return (
      <S.Container>
        <label htmlFor={name}>{label}</label>
        <select placeholder={rest.placeholder} {...field} id={name}>
          <option value=''>Selecione</option>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {(error?.message || errorMessage) && (
          <p className='error-message'>{error?.message || errorMessage}</p>
        )}
      </S.Container>
    );

  return (
    <S.Container>
      <label htmlFor={name}>{label}</label>
      <input {...rest} {...field} id={name} />
      {(error?.message || errorMessage) && (
        <p className='error-message'>{error?.message || errorMessage}</p>
      )}
    </S.Container>
  );
}
