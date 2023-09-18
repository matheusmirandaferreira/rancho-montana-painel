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
import { createRace, getRaces } from '../../services/race';
import {
  RaceListProps,
  CreateRaceResponse,
  GetRacesResponse,
} from '../../libs/race';

export function Race() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, ...query } = useQuery<GetRacesResponse, any>({
    queryKey: ['GET_PACES'],
    queryFn: getRaces,
  });

  const mutation = useMutation<CreateRaceResponse, any, string>({
    mutationFn: createRace,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const { control, handleSubmit } = useForm<Pick<RaceListProps, 'nmrace'>>();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data.nmrace);
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
        <Link to={paths.raceDetails.replace(':uuid', item.uuidrace)}>
          {item.nmrace}
        </Link>
      </td>
      <td>{item.race_permalink}</td>
      <td>{new Date(item.created_at).toLocaleString()}</td>
    </Fragment>
  ));

  return (
    <PageContainer>
      <PageHeader
        title='Raças'
        description='Gerencie as raças que serão vinculadas aos cavalos.'
      >
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
        title='Adicinar raça'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
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
