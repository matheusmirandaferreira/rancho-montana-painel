import {
  CreateUserParams,
  CreateUserResponse,
  GetUserDetailsResponse,
  GetUsersResponse,
  UpdateUserParams,
  UpdateUserResponse,
} from '../libs/user';
import { api } from './api';

export async function getUsers() {
  const { data } = await api.get<GetUsersResponse>('/api/user');

  return data;
}

export async function getUserDetails(uuiduser?: string) {
  const { data } = await api.get<GetUserDetailsResponse>(
    '/api/user/' + String(uuiduser)
  );

  return data;
}

export async function createUser(params: CreateUserParams) {
  const { data } = await api.post<CreateUserResponse>('/api/user', params);

  return data;
}

export async function updateUser(params: Partial<UpdateUserParams>) {
  const { data } = await api.put<UpdateUserResponse>(
    '/api/user/' + params.uuiduser,
    params
  );

  return data;
}
