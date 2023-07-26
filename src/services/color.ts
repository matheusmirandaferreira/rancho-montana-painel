import { api } from './api';
import {
  ColorListProps,
  GetColorDetailsResponse,
  GetColorsResponse,
  UpdateColorResponse,
} from '../libs/color';

export async function getColors() {
  const { data } = await api.get<GetColorsResponse>('/api/color');

  return data;
}

export async function getColorDetails(uuid?: string) {
  const { data } = await api.get<GetColorDetailsResponse>(`/api/color/${uuid}`);
  return data;
}

export async function updateColor(params: Partial<ColorListProps>) {
  const { data } = await api.put<UpdateColorResponse>(
    `/api/color/${params.uuidcolor}`,
    {
      nmcolor: params.nmcolor,
    }
  );

  return data;
}
