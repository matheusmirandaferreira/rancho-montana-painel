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
