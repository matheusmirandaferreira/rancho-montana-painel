import { ResponseProps } from '../libs/common';
import { SignInProps, UserProps } from '../libs/user';
import { api } from './api';

type AuthResponse = ResponseProps<UserProps>;

export async function login(params: SignInProps) {
  const { data } = await api.post<AuthResponse>('/api/auth', params);

  return data;
}
