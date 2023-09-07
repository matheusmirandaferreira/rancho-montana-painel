import { ResponseProps } from './common';

export type UserProps = {
  uuiduser: string;
  nmuser: string;
  email: string;
  created_at: string;
  updated_at: string;
  token: string;
};

export type SignInProps = {
  email: string;
  password: string;
};

export type UserListProps = {
  uuiduser: string;
  nmuser: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type GetUsersResponse = ResponseProps<UserListProps[]>;
