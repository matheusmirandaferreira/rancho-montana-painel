import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddOutlined, EditOutlined } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import { Info } from '../../components/Info';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Loader } from '../../components/Loader';
import { CardBox } from '../../components/CardBox';
import { PageHeader } from '../../components/PageHeader';
import { ErrorMessage } from '../../components/ErrorMessage';

import { getHorseDetails, updateHorse } from '../../services/horse';
import {
  HorseListProps,
  GetHorseDetailsResponse,
  UpdateHorseResponse,
  UpdateHorseParams,
} from '../../libs/horse';

import { PageContainer } from '../../components/PageContainer';
import { getCategories } from '../../services/category';
import { getPaces } from '../../services/pace';
import { getRaces } from '../../services/race';
import { getColors } from '../../services/color';

export function HorseDetails() {
  const { uuid } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation<
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

  const { control, handleSubmit } =
    useForm<Pick<HorseListProps, 'nmhorse' | 'uuidhorse'>>();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit((data) => {
    console.log('data', data);
    mutation.mutate({
      ...data,
      uuidhorse: uuid,
      uuidcategory: '11b2bf52-6e47-405d-a05e-cf09789f4876',
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
          <Button color='secondary'>
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
      </CardBox>

      <Modal
        title='Editar andamento'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutation.isLoading}
      >
        <Input
          control={control}
          name='nmhorse'
          label='Nome do cavalo'
          placeholder='Nome'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.errors?.nmhorse}
          defaultValue={query.data.data.nmhorse}
        />

        <Input
          control={control}
          defaultValue={query.data.data.color.uuidcolor}
          name='uuidcolor'
          label='Selecione uma cor'
          placeholder='Cor'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.errors?.color}
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
          errorMessage={mutation.error?.response?.data.errors?.pace}
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
          errorMessage={mutation.error?.response?.data.errors?.race}
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
          errorMessage={mutation.error?.response?.data.errors?.category}
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
          errorMessage={mutation.error?.response?.data.errors?.birthdate}
        />

        <Input
          type='select'
          control={control}
          defaultValue={query.data.data.gender}
          name='gender'
          label='Gênero'
          placeholder='Selecione o gênero'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.errors?.gender}
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
          errorMessage={mutation.error?.response?.data.errors?.description}
        />
      </Modal>
    </PageContainer>
  );
}
