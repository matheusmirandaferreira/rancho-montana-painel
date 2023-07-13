import * as S from './styles';

type Props = {
  label: string;
  value: string | number;
};

export function Info({ label, value }: Props) {
  return (
    <S.Container>
      <span>{label}</span>
      <strong>{value}</strong>
    </S.Container>
  );
}
