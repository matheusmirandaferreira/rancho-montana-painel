import { api } from './api';
import { GetColorDetailsResponse, GetColorsResponse } from '../libs/color';

export async function getColors() {
  const { data } = await api.get<GetColorsResponse>('/api/color');

  return data;
}

export async function getColorDetails(uuid?: string) {
  const { data } = await api.get<GetColorDetailsResponse>(`/api/color/${uuid}`);
  return data;
}
