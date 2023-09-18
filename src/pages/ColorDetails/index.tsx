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

import { getColorDetails, updateColor } from '../../services/color';
import {
  ColorListProps,
  GetColorDetailsResponse,
  UpdateColorResponse,
} from '../../libs/color';

import { PageContainer } from '../../components/PageContainer';

export function ColorDetails() {
  const { uuid } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation<
    UpdateColorResponse,
    any,
    Partial<ColorListProps>
  >({
    mutationFn: updateColor,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const { ...query } = useQuery<GetColorDetailsResponse, any>({
    queryKey: ['GET_COLOR_DETAILS'],
    queryFn: () => getColorDetails(uuid),
  });

  const { control, handleSubmit } =
    useForm<Pick<ColorListProps, 'nmcolor' | 'uuidcolor'>>();

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ ...data, uuidcolor: uuid });
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
        title='Detalhes da cor'
        // description='Gerencie as cores que serão vinculadas aos cavalos.'
      >
        <Button onClick={handleModal}>
          <EditOutlined />
          <span>Editar</span>
        </Button>
      </PageHeader>
      <CardBox>
        <div className='row'>
          <Info label='Nome da cor' value={query.data.data.nmcolor} />
          <Info label='Código da cor' value={query.data.data.color_permalink} />
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
        title='Editar cor'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
          defaultValue={query.data.data.nmcolor}
          name='nmcolor'
          label='Nome da cor'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
        />
      </Modal>
    </PageContainer>
  );
}
