import { ResponseProps } from './common';

export type HorseListProps = {
  uuidhorse: string;
  nmhorse: string;
  horse_permalink: string;
  created_at: string;
  updated_at: string;
};

export type CreateHorseParams = {
  uuidhorse: string;

  birthdate?: string;
  nmhorse?: string;
  uuidcolor?: string;
  uuidpace?: string;
  uuidrace?: string;
  uuidcategory?: string;
  description?: string;
  gender?: 'M' | 'F';
};

export type GetHorsesResponse = ResponseProps<HorseListProps[]>;

export type GetHorseDetailsResponse = ResponseProps<HorseListProps>;

export type UpdateHorseResponse = ResponseProps<HorseListProps>;

export type CreateHorseResponse = ResponseProps<HorseListProps>;
