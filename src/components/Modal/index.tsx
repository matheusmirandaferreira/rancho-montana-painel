import { ReactNode, useEffect } from 'react';
import { CloseOutlined } from '@mui/icons-material';

import { Button } from '../Button';

import * as S from './styles';
import { Loader } from '../Loader';

type Props = {
  title: string;
  children?: ReactNode;

  isOpen?: boolean;
  isLoading?: boolean;
  onClose(): void;

  onConfirm(): void;
  onCancel?(): void;
};

export function Modal(props: Props) {
  const { title, children, isOpen, onClose, onConfirm, onCancel, isLoading } =
    props;

  if (!isOpen) return <></>;

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') onConfirm();
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [onClose, onConfirm]);

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
          <Button onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
              <Loader.Spinner width={20} height={20} color='#fff' />
            ) : (
              'Confirmar'
            )}
          </Button>
        </div>
      </div>
    </S.Container>
  );
}
