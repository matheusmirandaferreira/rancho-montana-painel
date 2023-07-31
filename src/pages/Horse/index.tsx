import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Fragment, useState } from 'react';
import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
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
import { createHorse, getHorses } from '../../services/horse';
import {
  CreateHorseResponse,
  GetHorsesResponse,
  CreateHorseParams,
} from '../../libs/horse';
import { getColors } from '../../services/color';
import { getRaces } from '../../services/race';
import { getPaces } from '../../services/pace';
import { getCategories } from '../../services/category';

export function Horse() {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, ...query } = useQuery<GetHorsesResponse, any>(
    {
      queryKey: ['GET_HORSES'],
      queryFn: getHorses,
    }
  );

  const [colors, races, paces, categories] = useQueries({
    queries: [
      { queryKey: ['options', 1], queryFn: getColors },
      { queryKey: ['options', 2], queryFn: getRaces },
      { queryKey: ['options', 3], queryFn: getPaces },
      { queryKey: ['options', 4], queryFn: getCategories },
    ],
  });

  const mutation = useMutation<CreateHorseResponse, any, CreateHorseParams>({
    mutationFn: createHorse,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const { control, handleSubmit } = useForm<CreateHorseParams>();

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit((data) => {
    console.log('data', data);

    mutation.mutate(data);
  });

  if (isLoading || colors.isLoading || races.isLoading || paces.isLoading) {
    return <Loader.Page />;
  }

  if (error || !data) {
    return <ErrorMessage message={error.response.data.error} />;
  }

  const rows = data.data.map((item, index) => (
    <Fragment key={index}>
      <td>
        <Link to={paths.horseDetails.replace(':uuid', item.uuidhorse)}>
          {item.nmhorse}
        </Link>
      </td>
      <td>{item.color.nmcolor}</td>
      <td>{item.race.nmrace}</td>
      <td>{item.pace.nmpace}</td>
      <td>{item.birthdate.split('-').reverse().join('/')}</td>
    </Fragment>
  ));

  return (
    <PageContainer>
      <PageHeader title='Cavalos' description='Adicione seus cavalos.'>
        <Button onClick={handleModal}>
          <AddOutlined />
          <span>Adicionar</span>
        </Button>
      </PageHeader>

      <Table
        headerColumns={[
          'Nome',
          'Cor',
          'Raça',
          'Andamento',
          'Data de nascimento',
        ]}
        rows={rows}
      />

      <Modal
        title='Adicinoar cavalo'
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
          errorMessage={mutation.error?.response?.data.message}
        />

        <Input
          control={control}
          name='uuidcolor'
          label='Selecione uma cor'
          placeholder='Cor'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
          type='select'
          options={colors.data?.data.map((item) =>
            Object({ label: item.nmcolor, value: item.uuidcolor })
          )}
        />
        <Input
          control={control}
          name='uuidpace'
          label='Andamento'
          placeholder='Selecione o andamento'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
          type='select'
          options={paces.data?.data.map((item) =>
            Object({ label: item.nmpace, value: item.uuidpace })
          )}
        />
        <Input
          control={control}
          name='uuidrace'
          label='Raça'
          placeholder='Selecione a raça'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
          type='select'
          options={races.data?.data.map((item) =>
            Object({ label: item.nmrace, value: item.uuidrace })
          )}
        />

        <Input
          control={control}
          name='uuidcategory'
          label='Categoria'
          placeholder='Selecione uma categoria'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
          type='select'
          options={categories.data?.data.map((item) =>
            Object({ label: item.nmcategory, value: item.uuidcategory })
          )}
        />

        <Input
          control={control}
          name='birthdate'
          label='Data de nascimento'
          type='date'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
        />

        <Input
          type='select'
          control={control}
          name='gender'
          label='Gênero'
          placeholder='Selecione o gênero'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
          options={[
            { label: 'M', value: 'M' },
            { label: 'F', value: 'F' },
          ]}
        />
        <Input
          control={control}
          name='description'
          label='Descrição do cavalo'
          placeholder='Descrição'
          rules={{ required: 'Campo obrigatório!' }}
          errorMessage={mutation.error?.response?.data.message}
        />
      </Modal>
    </PageContainer>
  );
}
