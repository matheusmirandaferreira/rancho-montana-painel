import { ReactNode } from 'react';
import * as S from './styles';

type Props = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHeader(props: Props) {
  const { description, title, children } = props;
  return (
    <S.Container>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children}
    </S.Container>
  );
}
