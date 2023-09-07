import { useTheme } from 'styled-components';
import * as S from './styles';
import { TailSpin } from 'react-loader-spinner';

export function Page() {
  const theme = useTheme();

  return (
    <S.PageContainer>
      <TailSpin
        ariaLabel='tail-spin-loading'
        visible={true}
        width={36}
        height={36}
        color={theme.primary500}
      />
    </S.PageContainer>
  );
}
