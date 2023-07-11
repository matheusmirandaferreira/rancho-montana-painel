import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AddOutlined } from '@mui/icons-material';

import { Table } from '../../components/Table';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import { ErrorMessage } from '../../components/ErrorMessage';

import { getColors } from '../../services/color';
import { GetColorsResponse } from '../../libs/color';

import * as S from './styles';

export function Color() {
  const { data, error, isLoading } = useQuery<GetColorsResponse, any>({
    queryKey: ['GET_COLORS'],
    queryFn: getColors,
  });

  if (isLoading) {
    return <Loader.Page />;
  }

  if (error) {
    return <ErrorMessage message={error.response.data.error} />;
  }

  return (
    <S.Container>
      <PageHeader
        title='Cores'
        description='Gerencie as cores que serão vinculadas aos cavalos.'
      >
        <Button>
          <AddOutlined />
          <span>Adicionar</span>
        </Button>
      </PageHeader>

      <Table
        headerColumns={['Nome', 'Código', '']}
        rows={
          data?.data.map((item, index) => (
            <Fragment key={index}>
              <td>{item.nmcolor}</td>
              <td>{item.color_permalink}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </Fragment>
          )) || []
        }
      />
    </S.Container>
  );
}
