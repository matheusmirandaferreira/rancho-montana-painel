import { GetUsersResponse } from '../libs/user';
import { api } from './api';

export async function getUsers() {
  const { data } = await api.get<GetUsersResponse>('/api/user');

  return data;
}
