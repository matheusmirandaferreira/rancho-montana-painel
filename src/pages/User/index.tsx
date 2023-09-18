import { Fragment, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';

import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { PageContainer } from '../../components/PageContainer';
import {
  CreateUserParams,
  CreateUserResponse,
  GetUsersResponse,
} from '../../libs/user';
import { createUser, getUsers } from '../../services/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Link } from 'react-router-dom';
import { Table } from '../../components/Table';
import { paths } from '../../routes';
import { Modal } from '../../components/Modal';
import { Input } from '../../components/Input';
import { useForm } from 'react-hook-form';

export function User() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const { data, error, isLoading, ...query } = useQuery<GetUsersResponse, any>({
    queryKey: ['GET_USERS'],
    queryFn: getUsers,
  });

  const mutation = useMutation<CreateUserResponse, any, CreateUserParams>({
    mutationFn: createUser,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const { control, handleSubmit } = useForm<CreateUserParams>();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
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
        <Link to={paths.userDetails.replace(':uuid', item.uuiduser)}>
          {item.nmuser}
        </Link>
      </td>
      <td>{item.email}</td>
      <td>{new Date(item.created_at).toLocaleString()}</td>
    </Fragment>
  ));

  return (
    <PageContainer>
      <PageHeader
        title='Usuários'
        description='Gerencie os usuários que terão acesso ao sistema'
      >
        <Button onClick={handleModal}>
          <AddOutlined />
          <span>Adicionar</span>
        </Button>
      </PageHeader>

      <Table
        headerColumns={['Nome', 'E-mail', 'Data de criação']}
        rows={rows}
      />

      <Modal
        title='Adicinar usuário'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
          name='nmuser'
          label='Nome do usuário'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.errors?.nmuser}
        />
        <Input
          control={control}
          name='email'
          label='E-mail do usuário'
          placeholder='E-mail'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.errors?.email}
        />
        <Input
          control={control}
          name='password'
          label='Senha inicial para o usuário'
          type='password'
          placeholder='Senha'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.errors?.password}
        />
      </Modal>
    </PageContainer>
  );
}
