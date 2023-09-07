import { Fragment, useState } from 'react';
import { AddOutlined } from '@mui/icons-material';

import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { PageContainer } from '../../components/PageContainer';
import { GetUsersResponse } from '../../libs/user';
import { getUsers } from '../../services/user';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { Link } from 'react-router-dom';
import { Table } from '../../components/Table';
import { paths } from '../../routes';

export function User() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const { data, error, isLoading } = useQuery<GetUsersResponse, any>({
    queryKey: ['GET_USERS'],
    queryFn: getUsers,
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
    </PageContainer>
  );
}
