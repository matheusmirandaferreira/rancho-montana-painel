import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EditOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';

import { Info } from '../../components/Info';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Loader } from '../../components/Loader';
import { CardBox } from '../../components/CardBox';
import { PageHeader } from '../../components/PageHeader';
import { ErrorMessage } from '../../components/ErrorMessage';

import { getPaceDetails, updatePace } from '../../services/pace';
import {
  PaceListProps,
  GetPaceDetailsResponse,
  UpdatePaceResponse,
} from '../../libs/pace';

import * as S from './styles';

export function PaceDetails() {
  const { uuid } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation<UpdatePaceResponse, any, Partial<PaceListProps>>(
    {
      mutationFn: updatePace,
      onSuccess() {
        handleModal();
        query.refetch();
      },
    }
  );

  const { ...query } = useQuery<GetPaceDetailsResponse, any>({
    queryKey: ['GET_COLOR_DETAILS'],
    queryFn: () => getPaceDetails(uuid),
  });

  const { control, handleSubmit } =
    useForm<Pick<PaceListProps, 'nmpace' | 'uuidpace'>>();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ ...data, uuidpace: uuid });
  });

  if (query.isLoading) {
    return <Loader.Page />;
  }

  if (query.error || !query.data) {
    return <ErrorMessage message={query.error.response.data.error} />;
  }

  return (
    <S.Container>
      <PageHeader
        title='Detalhes do andamento'
        // description='Gerencie as raçaes que serão vinculadas aos cavalos.'
      >
        <Button onClick={handleModal}>
          <EditOutlined />
          <span>Editar</span>
        </Button>
      </PageHeader>
      <CardBox>
        <div className='row'>
          <Info label='Nome do andamento' value={query.data.data.nmpace} />
          <Info
            label='Código do andamento'
            value={query.data.data.pace_permalink}
          />
          <Info
            label='Data de criação'
            value={new Date(query.data.data.created_at).toLocaleString()}
          />
          <Info
            label='Data de atualização'
            value={new Date(query.data.data.updated_at).toLocaleString()}
          />
        </div>
      </CardBox>

      <Modal
        title='Editar andamento'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
          defaultValue={query.data.data.nmpace}
          name='nmpace'
          label='Nome do andamento'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
        />
      </Modal>
    </S.Container>
  );
}
