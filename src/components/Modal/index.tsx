import { ReactNode } from 'react';
import { CloseOutlined } from '@mui/icons-material';

import { Button } from '../Button';

import * as S from './styles';

type Props = {
  title: string;
  children?: ReactNode;

  isOpen?: boolean;
  onClose(): void;

  onConfirm(): void;
  onCancel?(): void;
};

export function Modal(props: Props) {
  const { title, children, isOpen, onClose, onConfirm, onCancel } = props;

  if (!isOpen) return <></>;

  return (
    <S.Container>
      <div className='box'>
        <div className='modal-header'>
          <span>{title}</span>
          <CloseOutlined onClick={onClose} />
        </div>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'>
          <Button onClick={onCancel || onClose} color='gray700'>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar</Button>
        </div>
      </div>
    </S.Container>
  );
}
