import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from 'styled-components';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';

import { useAuth } from '../../hooks/auth';
import { login } from '../../services/auth';
import { SignInProps } from '../../libs/user';

import * as S from './styles';
import { paths } from '../../routes';

export function Login() {
  const theme = useTheme();
  const { onLoginSuccess } = useAuth();
  const { control, handleSubmit } = useForm<SignInProps>();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      setErrorMessage('');
      const res = await login(data);
      if (res.status === '00') {
        onLoginSuccess(res.data);
        window.location.replace(paths.home);
      } else {
        setErrorMessage(res.message || 'Houve um erro ao efetuar login');
      }
    } catch (err: any) {
      console.log(err);
      setErrorMessage(
        err.response.data.message || 'Houve um erro ao efetuar o login'
      );
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <S.Container>
      <form onSubmit={onSubmit}>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        <Input
          control={control}
          label='E-mail'
          name='email'
          type='email'
          rules={{ required: 'Informe um e-mail' }}
        />
        <Input
          control={control}
          label='Senha'
          name='password'
          type='password'
          rules={{ required: 'Informe uma senha' }}
        />
        <Button disabled={isLoading}>
          {isLoading ? <Loader.Spinner color={theme.white} /> : 'Entrar'}
        </Button>
      </form>
    </S.Container>
  );
}
