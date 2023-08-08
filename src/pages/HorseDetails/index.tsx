import { useState } from 'react';
import { Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { AddOutlined, EditOutlined } from '@mui/icons-material';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import { Info } from '../../components/Info';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Loader } from '../../components/Loader';
import { CardBox } from '../../components/CardBox';
import { PageHeader } from '../../components/PageHeader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { PageContainer } from '../../components/PageContainer';

import {
  HorseListProps,
  GetHorseDetailsResponse,
  UpdateHorseResponse,
  UpdateHorseParams,
  AddImageHorseParams,
} from '../../libs/horse';
import { ResponseProps } from '../../libs/common';

import { getPaces } from '../../services/pace';
import { getRaces } from '../../services/race';
import { getColors } from '../../services/color';
import { getCategories } from '../../services/category';
import { addImage, getHorseDetails, updateHorse } from '../../services/horse';

export function HorseDetails() {
  const { uuid } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenForUpload, setIsOpenForUpload] = useState(false);

  const mutationForUpdate = useMutation<
    UpdateHorseResponse,
    any,
    Partial<UpdateHorseParams>
  >({
    mutationFn: updateHorse,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const mutationImage = useMutation<
    ResponseProps<null>,
    any,
    AddImageHorseParams
  >({
    mutationFn: addImage,
    onSuccess() {
      handleUploadModal();
      query.refetch();
    },
  });

  const { ...query } = useQuery<GetHorseDetailsResponse, any>({
    queryKey: ['GET_HORSE_DETAILS'],
    queryFn: () => getHorseDetails(uuid),
  });

  const [colors, races, paces, categories] = useQueries({
    queries: [
      { queryKey: ['options', 1], queryFn: getColors },
      { queryKey: ['options', 2], queryFn: getRaces },
      { queryKey: ['options', 3], queryFn: getPaces },
      { queryKey: ['options', 4], queryFn: getCategories },
    ],
  });

  const { control, handleSubmit } = useForm<
    Pick<HorseListProps, 'nmhorse' | 'uuidhorse'> & { image: File }
  >();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleUploadModal = () => {
    setIsOpenForUpload(!isOpenForUpload);
  };

  const onSubmit = handleSubmit((data) => {
    mutationForUpdate.mutate({
      ...data,
      uuidhorse: uuid,
    });
  });

  const onSubmitImage = handleSubmit((data) => {
    mutationImage.mutate({
      uuidhorse: uuid || '',
      image: data.image,
    });
  });

  if (
    query.isLoading ||
    colors.isLoading ||
    races.isLoading ||
    paces.isLoading
  ) {
    return <Loader.Page />;
  }

  if (query.error || !query.data) {
    return <ErrorMessage message={query.error.response.data.error} />;
  }

  return (
    <PageContainer>
      <PageHeader
        title='Detalhes do andamento'
        // description='Gerencie as raçaes que serão vinculadas aos cavalos.'
      >
        <div className='buttons'>
          <Button color='secondary' onClick={handleUploadModal}>
            <AddOutlined />
            <span>Adicionar imagem</span>
          </Button>
          <Button onClick={handleModal}>
            <EditOutlined />
            <span>Editar</span>
          </Button>
        </div>
      </PageHeader>
      <CardBox>
        <div className='row'>
          <Info label='Nome do cavalo' value={query.data.data.nmhorse} />
          <Info label='Cor do cavalo' value={query.data.data.color.nmcolor} />
          <Info
            label='Andamento do cavalo'
            value={query.data.data.pace.nmpace}
          />
          <Info label='Raça do cavalo' value={query.data.data.race.nmrace} />
        </div>
        <div className='row'>
          <Info
            label='Categoria'
            value={query.data.data?.category.nmcategory}
          />
          <Info label='Sexo' value={query.data.data?.gender} />
          <Info
            label='Data de nascimento'
            value={query.data.data?.birthdate.split('-').reverse().join('/')}
          />
          <Info label='Descrição' value={query.data.data?.description} />
        </div>
        <div className='row'>
          <Info
            style={{ flex: 0.25 }}
            label='Data de criação'
            value={new Date(query.data.data.created_at).toLocaleString()}
          />
          <Info
            style={{ flex: 0.78 }}
            label='Data de atualização'
            value={new Date(query.data.data.updated_at).toLocaleString()}
          />
        </div>
        {query.data.data.image && (
          <div className='row'>
            <img className='image' src={query.data.data.image} alt='' />
          </div>
        )}
      </CardBox>

      <Modal
        title='Adicionar imagem'
        onClose={handleUploadModal}
        onConfirm={onSubmitImage}
        isOpen={isOpenForUpload}
        isLoading={mutationImage.isLoading}
      >
        {mutationImage.error && (
          <Alert color='danger'>
            {mutationImage.error.response.message ||
              'Houve um erro ao adicionar essa imagem'}
          </Alert>
        )}
        {/* <RSInput type='file' ref={register('image').ref} /> */}
        <Input
          control={control}
          name='image'
          label='Adicionar imagem'
          placeholder='Imagem'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutationForUpdate.error?.response?.data.errors?.image}
          type='file'
        />
      </Modal>

      <Modal
        title='Editar andamento'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutationForUpdate.isLoading}
      >
        <Input
          control={control}
          name='nmhorse'
          label='Nome do cavalo'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutationForUpdate.error?.response?.data.errors?.nmhorse}
          defaultValue={query.data.data.nmhorse}
        />

        <Input
          control={control}
          defaultValue={query.data.data.color.uuidcolor}
          name='uuidcolor'
          label='Selecione uma cor'
          placeholder='Cor'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutationForUpdate.error?.response?.data.errors?.color}
          type='select'
          options={colors.data?.data.map((item) =>
            Object({ label: item.nmcolor, value: item.uuidcolor })
          )}
        />
        <Input
          control={control}
          defaultValue={query.data.data.pace.uuidpace}
          name='uuidpace'
          label='Andamento'
          placeholder='Selecione o andamento'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutationForUpdate.error?.response?.data.errors?.pace}
          type='select'
          options={paces.data?.data.map((item) =>
            Object({ label: item.nmpace, value: item.uuidpace })
          )}
        />
        <Input
          control={control}
          defaultValue={query.data.data.race.uuidrace}
          name='uuidrace'
          label='Raça'
          placeholder='Selecione a raça'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutationForUpdate.error?.response?.data.errors?.race}
          type='select'
          options={races.data?.data.map((item) =>
            Object({ label: item.nmrace, value: item.uuidrace })
          )}
        />

        <Input
          control={control}
          defaultValue={query.data.data.category.uuidcategory}
          name='uuidcategory'
          label='Categoria'
          placeholder='Selecione uma categoria'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={
            mutationForUpdate.error?.response?.data.errors?.category
          }
          type='select'
          options={categories.data?.data.map((item) =>
            Object({ label: item.nmcategory, value: item.uuidcategory })
          )}
        />

        <Input
          control={control}
          defaultValue={query.data.data.birthdate}
          name='birthdate'
          label='Data de nascimento'
          type='date'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={
            mutationForUpdate.error?.response?.data.errors?.birthdate
          }
        />

        <Input
          type='select'
          control={control}
          defaultValue={query.data.data.gender}
          name='gender'
          label='Gênero'
          placeholder='Selecione o gênero'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutationForUpdate.error?.response?.data.errors?.gender}
          options={[
            { label: 'M', value: 'M' },
            { label: 'F', value: 'F' },
          ]}
        />
        <Input
          control={control}
          defaultValue={query.data.data.description}
          name='description'
          label='Descrição do cavalo'
          placeholder='Descrição'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={
            mutationForUpdate.error?.response?.data.errors?.description
          }
        />
      </Modal>
    </PageContainer>
  );
}
