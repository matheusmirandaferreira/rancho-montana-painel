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

import { getRaceDetails, updateRace } from '../../services/race';
import {
  RaceListProps,
  GetRaceDetailsResponse,
  UpdateRaceResponse,
} from '../../libs/race';

import { PageContainer } from '../../components/PageContainer';

export function RaceDetails() {
  const { uuid } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation<UpdateRaceResponse, any, Partial<RaceListProps>>(
    {
      mutationFn: updateRace,
      onSuccess() {
        handleModal();
        query.refetch();
      },
    }
  );

  const { ...query } = useQuery<GetRaceDetailsResponse, any>({
    queryKey: ['GET_COLOR_DETAILS'],
    queryFn: () => getRaceDetails(uuid),
  });

  const { control, handleSubmit } =
    useForm<Pick<RaceListProps, 'nmrace' | 'uuidrace'>>();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ ...data, uuidrace: uuid });
  });

  if (query.isLoading) {
    return <Loader.Page />;
  }

  if (query.error || !query.data) {
    return <ErrorMessage message={query.error.response.data.error} />;
  }

  return (
    <PageContainer>
      <PageHeader
        title='Detalhes da raça'
        // description='Gerencie as raçaes que serão vinculadas aos cavalos.'
      >
        <Button onClick={handleModal}>
          <EditOutlined />
          <span>Editar</span>
        </Button>
      </PageHeader>
      <CardBox>
        <div className='row'>
          <Info label='Nome da raça' value={query.data.data.nmrace} />
          <Info label='Código da raça' value={query.data.data.race_permalink} />
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
        title='Editar raça'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
          defaultValue={query.data.data.nmrace}
          name='nmrace'
          label='Nome da raça'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
        />
      </Modal>
    </PageContainer>
  );
}
