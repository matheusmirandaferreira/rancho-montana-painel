import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { EditOutlined } from '@mui/icons-material';

import { Info } from '../../components/Info';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { CardBox } from '../../components/CardBox';
import { PageHeader } from '../../components/PageHeader';
import { ErrorMessage } from '../../components/ErrorMessage';

import { getColorDetails } from '../../services/color';
import { GetColorDetailsResponse } from '../../libs/color';

import * as S from './styles';

export function ColorDetails() {
  const { uuid } = useParams();

  // const {} = useMutation()

  const { data, error, isLoading } = useQuery<GetColorDetailsResponse, any>({
    queryKey: ['GET_COLOR_DETAILS'],
    queryFn: () => getColorDetails(uuid),
  });

  if (isLoading) {
    return <Loader.Page />;
  }

  if (error || !data) {
    return <ErrorMessage message={error.response.data.error} />;
  }

  return (
    <S.Container>
      <PageHeader
        title='Detalhes da cor'
        // description='Gerencie as cores que serão vinculadas aos cavalos.'
      >
        <Button>
          <EditOutlined />
          <span>Editar</span>
        </Button>
      </PageHeader>
      <CardBox>
        <div className='row'>
          <Info label='Nome da cor' value={data.data.nmcolor} />
          <Info label='Código da cor' value={data.data.color_permalink} />
          <Info
            label='Data de criação'
            value={new Date(data.data.created_at).toLocaleString()}
          />
          <Info
            label='Data de atualização'
            value={new Date(data.data.updated_at).toLocaleString()}
          />
        </div>
      </CardBox>
    </S.Container>
  );
}
