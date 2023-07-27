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
import { createPace, getPaces } from '../../services/pace';
import {
  PaceListProps,
  CreatePaceResponse,
  GetPacesResponse,
} from '../../libs/pace';

export function Pace() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, ...query } = useQuery<GetPacesResponse, any>({
    queryKey: ['GET_PACES'],
    queryFn: getPaces,
  });

  const mutation = useMutation<CreatePaceResponse, any, string>({
    mutationFn: createPace,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const { control, handleSubmit } = useForm<Pick<PaceListProps, 'nmpace'>>();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data.nmpace);
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
        <Link to={paths.paceDetails.replace(':uuid', item.uuidpace)}>
          {item.nmpace}
        </Link>
      </td>
      <td>{item.pace_permalink}</td>
      <td>{new Date(item.created_at).toLocaleString()}</td>
    </Fragment>
  ));

  return (
    <PageContainer>
      <PageHeader
        title='Andamentos'
        description='Gerencie os andamentos que serão vinculadas aos cavalos.'
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
        title='Adicinoao andamento'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
          name='nmpace'
          label='Nome do andamento'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
        />
      </Modal>
    </PageContainer>
  );
}
