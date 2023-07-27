import {
  GetPacesResponse,
  GetPaceDetailsResponse,
  PaceListProps,
  UpdatePaceResponse,
} from '../libs/pace';
import { api } from './api';

export async function getPaces() {
  const { data } = await api.get<GetPacesResponse>('/api/pace');

  return data;
}

export async function getPaceDetails(uuid?: string) {
  const { data } = await api.get<GetPaceDetailsResponse>(`/api/pace/${uuid}`);
  return data;
}

export async function updatePace(params: Partial<PaceListProps>) {
  const { data } = await api.put<UpdatePaceResponse>(
    `/api/pace/${params.uuidpace}`,
    {
      nmpace: params.nmpace,
    }
  );

  return data;
}

export async function createPace(nmpace: string) {
  const { data } = await api.post('/api/pace', { nmpace });

  return data;
}
