import { TailSpin } from 'react-loader-spinner';
import { useTheme } from 'styled-components';
import { LoaderProps } from '../../../libs/common';

export function Spinner(props: LoaderProps) {
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
}
