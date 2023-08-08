import { api } from './api';
import {
  GetHorseDetailsResponse,
  GetHorsesResponse,
  UpdateHorseResponse,
  CreateHorseParams,
  UpdateHorseParams,
  AddImageHorseParams,
} from '../libs/horse';
import { ResponseProps } from '../libs/common';

export async function getHorses() {
  const { data } = await api.get<GetHorsesResponse>('/api/horse');

  return data;
}

export async function getHorseDetails(uuid?: string) {
  const { data } = await api.get<GetHorseDetailsResponse>(`/api/horse/${uuid}`);
  return data;
}

export async function updateHorse(params: Partial<UpdateHorseParams>) {
  const { data } = await api.put<UpdateHorseResponse>(
    `/api/horse/${params.uuidhorse}`,
    params
  );

  return data;
}

export async function createHorse(params: CreateHorseParams) {
  const { data } = await api.post('/api/horse', params);

  return data;
}

export async function addImage(params: AddImageHorseParams) {
  const formData = new FormData();
  formData.append('image', params.image);

  const { data } = await api.post<ResponseProps<null>>(
    `/api/horse/${params.uuidhorse}/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return data;
}
