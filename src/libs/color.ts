import { ResponseProps } from './common';

export type ColorListProps = {
  uuidcolor: string;
  nmcolor: string;
  color_permalink: string;
  created_at: string;
  updated_at: string;
};

export type GetColorsResponse = ResponseProps<ColorListProps[]>;

export type GetColorDetailsResponse = ResponseProps<ColorListProps>;

export type UpdateColorResponse = ResponseProps<ColorListProps>;

export type CreateColorResponse = ResponseProps<ColorListProps>;
