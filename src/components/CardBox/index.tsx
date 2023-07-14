import { ReactNode } from 'react';
import * as S from './styles';

type Props = {
  title?: string;
  description?: string;
  children?: ReactNode;
};

export function CardBox(props: Props) {
  const { children, description, title } = props;

  return (
    <S.Container>
      {(title || description) && (
        <div className='card-header'>
          {title && <h4>{title}</h4>}
          {description && <p>{description}</p>}
        </div>
      )}
      {children && <div className='card-body'>{children}</div>}
    </S.Container>
  );
}
