import { HTMLAttributes } from 'react';
import * as S from './styles';

type Props = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string | number;
};

export function Info({ label, value, ...rest }: Props) {
  return (
    <S.Container {...rest}>
      <span>{label}</span>
      <strong>{value}</strong>
    </S.Container>
  );
}
