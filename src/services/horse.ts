import { api } from './api';
import {
  HorseListProps,
  GetHorseDetailsResponse,
  GetHorsesResponse,
  UpdateHorseResponse,
  CreateHorseParams,
} from '../libs/horse';

export async function getHorses() {
  const { data } = await api.get<GetHorsesResponse>('/api/horse');

  return data;
}

export async function getHorseDetails(uuid?: string) {
  const { data } = await api.get<GetHorseDetailsResponse>(`/api/horse/${uuid}`);
  return data;
}

export async function updateHorse(params: CreateHorseParams) {
  const { data } = await api.put<UpdateHorseResponse>(
    `/api/horse/${params.uuidhorse}`,
    params
  );

  return data;
}

export async function createHorse(nmhorse: string) {
  const { data } = await api.post('/api/horse', { nmhorse });

  return data;
}
