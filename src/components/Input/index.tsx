import { InputHTMLAttributes } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import * as S from './styles';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  control: Control<any>;
  label?: string;
  name: string;
  rules?: RegisterOptions;
  errorMessage?: string;
};

export function Input(props: Props) {
  const { label, control, name, defaultValue, rules, errorMessage, ...rest } =
    props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules });

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
