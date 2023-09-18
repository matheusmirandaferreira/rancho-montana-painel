import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  GetUserDetailsResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from '../../libs/user';
import { getUserDetails, updateUser } from '../../services/user';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { useForm } from 'react-hook-form';
import { PageContainer } from '../../components/PageContainer';
import { PageHeader } from '../../components/PageHeader';
import { Button } from '../../components/Button';
import { EditOutlined } from '@mui/icons-material';
import { CardBox } from '../../components/CardBox';
import { Info } from '../../components/Info';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Alert } from 'reactstrap';

export function UserDetails() {
  const { uuid } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit } = useForm<Partial<UpdateUserParams>>();

  const mutationForUpdate = useMutation<
    UpdateUserResponse,
    any,
    Partial<UpdateUserParams>
  >({
    mutationFn: updateUser,
    onSuccess() {
      handleModal();
      query.refetch();
    },
  });

  const { ...query } = useQuery<GetUserDetailsResponse, any>({
    queryKey: ['GET_USER_DETAILS'],
    queryFn: () => getUserDetails(uuid),
  });

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = handleSubmit((data) => {
    mutationForUpdate.mutate({
      ...data,
      uuiduser: uuid,
    });
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
        title='Detalhes do usuário'
        // description='Gerencie as raçaes que serão vinculadas aos cavalos.'
      >
        <div className='buttons'>
          <Button onClick={handleModal}>
            <EditOutlined />
            <span>Editar</span>
          </Button>
        </div>
      </PageHeader>
      <CardBox>
        <div className='row'>
          <Info label='Nome' value={query.data.data.nmuser} />
          <Info label='E-mail' value={query.data.data.email} />
        </div>
      </CardBox>
      <Modal
        title='Editar usuário'
        onClose={handleModal}
        onConfirm={onSubmit}
        isOpen={isOpen}
        isLoading={mutationForUpdate.isLoading}
      >
        {mutationForUpdate.error?.response.data.message && (
          <Alert color='danger'>
            {mutationForUpdate.error.response.data.message}
          </Alert>
        )}
        <Input
          control={control}
          name='nmuser'
          label='Nome do usuário'
          placeholder='Nome'
          errorMessage={mutationForUpdate.error?.response?.data.errors?.nmuser}
          defaultValue={query.data.data.nmuser}
        />
        <Input
          control={control}
          name='email'
          type='email'
          label='E-mail'
          placeholder='E-mail'
          errorMessage={mutationForUpdate.error?.response?.data.errors?.email}
          defaultValue={query.data.data.email}
        />
        <Input
          control={control}
          name='oldpassword'
          label='Senha atual'
          placeholder='Senha'
          type='password'
          errorMessage={
            mutationForUpdate.error?.response?.data.errors?.oldpassword
          }
        />
        <Input
          control={control}
          name='newpassword'
          label='Nova senha'
          type='password'
          placeholder='Senha'
          errorMessage={
            mutationForUpdate.error?.response?.data.errors?.newpassword
          }
        />
      </Modal>
    </PageContainer>
  );
}
