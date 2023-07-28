import { ResponseProps } from './common';

export type RaceListProps = {
  uuidrace: string;
  nmrace: string;
  race_permalink: string;
  created_at: string;
  updated_at: string;
};

export type GetRacesResponse = ResponseProps<RaceListProps[]>;

export type GetRaceDetailsResponse = ResponseProps<RaceListProps>;

export type UpdateRaceResponse = ResponseProps<RaceListProps>;

export type CreateRaceResponse = ResponseProps<RaceListProps>;
