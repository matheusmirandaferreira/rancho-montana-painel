import { api } from './api';
import { GetColorsResponse } from '../libs/color';

export async function getColors() {
  const { data } = await api.get<GetColorsResponse>('/api/color');

  return data;
}
