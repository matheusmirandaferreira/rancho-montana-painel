import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Fragment, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AddOutlined } from '@mui/icons-material';

import { Table } from '../../components/Table';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { PageContainer } from '../../components/PageContainer';

import { paths } from '../../routes';
import { createHorse, getHorses } from '../../services/horse';
import {
  HorseListProps,
  CreateHorseResponse,
  GetHorsesResponse,
} from '../../libs/horse';

export function Horse() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, ...query } = useQuery<GetHorsesResponse, any>(
    {
      queryKey: ['GET_COLORS'],
      queryFn: getHorses,
    }
  );

  const mutation = useMutation<CreateHorseResponse, any, string>({
    mutationFn: createHorse,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const { control, handleSubmit } = useForm<Pick<HorseListProps, 'nmhorse'>>();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data.nmhorse);
  });

  if (isLoading) {
    return <Loader.Page />;
  }

  if (error || !data) {
    return <ErrorMessage message={error.response.data.error} />;
  }

  const rows = data.data.map((item, index) => (
    <Fragment key={index}>
      <td>
        <Link to={paths.horseDetails.replace(':uuid', item.uuidhorse)}>
          {item.nmhorse}
        </Link>
      </td>
      <td>{item.horse_permalink}</td>
      <td>{new Date(item.created_at).toLocaleString()}</td>
    </Fragment>
  ));

  return (
    <PageContainer>
      <PageHeader title='Cavalos' description='Adicione seus cavalos.'>
        <Button onClick={handleModal}>
          <AddOutlined />
          <span>Adicionar</span>
        </Button>
      </PageHeader>

      <Table
        headerColumns={['Nome', 'Código', 'Data de criação']}
        rows={rows}
      />

      <Modal
        title='Adicinoar cor'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
          name='nmhorse'
          label='Nome da cor'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
        />
      </Modal>
    </PageContainer>
  );
}
