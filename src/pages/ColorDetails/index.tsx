import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';

import { getColorDetails } from '../../services/color';
import { GetColorDetailsResponse } from '../../libs/color';

import * as S from './styles';
import { Info } from '../../components/Info';
import { PageHeader } from '../../components/PageHeader';

export function ColorDetails() {
  const { uuid } = useParams();

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
        title='Detalhe da cor'
        // description='Gerencie as cores que serão vinculadas aos cavalos.'
      />

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
    </S.Container>
  );
}
