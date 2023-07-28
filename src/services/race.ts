import {
  GetRacesResponse,
  GetRaceDetailsResponse,
  RaceListProps,
  UpdateRaceResponse,
} from '../libs/race';
import { api } from './api';

export async function getRaces() {
  const { data } = await api.get<GetRacesResponse>('/api/race');

  return data;
}

export async function getRaceDetails(uuid?: string) {
  const { data } = await api.get<GetRaceDetailsResponse>(`/api/race/${uuid}`);
  return data;
}

export async function updateRace(params: Partial<RaceListProps>) {
  const { data } = await api.put<UpdateRaceResponse>(
    `/api/race/${params.uuidrace}`,
    {
      nmrace: params.nmrace,
    }
  );

  return data;
}

export async function createRace(nmrace: string) {
  const { data } = await api.post('/api/race', { nmrace });

  return data;
}
