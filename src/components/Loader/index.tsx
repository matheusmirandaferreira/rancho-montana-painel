import { TailSpin } from 'react-loader-spinner';
import { useTheme } from 'styled-components';
import * as S from './styles';

type Props = {
  height?: string | number;
  width?: string | number;
  color?: string;
  ariaLabel?: string;
  visible?: boolean;
};

export const Loader = {
  Spinner(props: Props) {
    const theme = useTheme();

    return (
      <TailSpin
        ariaLabel='tail-spin-loading'
        visible={true}
        width={24}
        height={24}
        color={theme.primary500}
        {...props}
      />
    );
  },

  Page() {
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
  },
};
