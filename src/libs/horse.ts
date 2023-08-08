import { CategoryProps } from './category';
import { ColorListProps } from './color';
import { ResponseProps } from './common';
import { PaceListProps } from './pace';
import { RaceListProps } from './race';

export type HorseListProps = {
  uuidhorse: string;
  nmhorse: string;
  description: string;
  gender: 'F' | 'M';
  category: CategoryProps;
  birthdate: string;
  race: RaceListProps;
  color: ColorListProps;
  pace: PaceListProps;
  created_at: string;
  updated_at: string;
  image?: string;
};

export type CreateHorseParams = {
  birthdate: string;
  nmhorse: string;
  uuidcolor: string;
  uuidpace: string;
  uuidrace: string;
  uuidcategory: string;
  description: string;
  gender: 'M' | 'F';
  category: string;
};

export type UpdateHorseParams = {
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

export type AddImageHorseParams = {
  uuidhorse: string;
  image: File;
};

export type GetHorsesResponse = ResponseProps<HorseListProps[]>;

export type GetHorseDetailsResponse = ResponseProps<HorseListProps>;

export type UpdateHorseResponse = ResponseProps<HorseListProps>;

export type CreateHorseResponse = ResponseProps<HorseListProps>;
