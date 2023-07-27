import { ResponseProps } from './common';

export type PaceListProps = {
  uuidpace: string;
  nmpace: string;
  pace_permalink: string;
  created_at: string;
  updated_at: string;
};

export type GetPacesResponse = ResponseProps<PaceListProps[]>;

export type GetPaceDetailsResponse = ResponseProps<PaceListProps>;

export type UpdatePaceResponse = ResponseProps<PaceListProps>;

export type CreatePaceResponse = ResponseProps<PaceListProps>;
