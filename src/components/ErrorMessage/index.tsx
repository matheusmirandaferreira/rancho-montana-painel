import * as S from './styles';

type Props = {
  message?: string;
};

export function ErrorMessage({ message }: Props) {
  return (
    <S.Container>
      <h3>{message || 'Erro ao carregar seus dados!'}</h3>
    </S.Container>
  );
}
