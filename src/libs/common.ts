export type ResponseProps<T> = {
  status: '00' | '01';
  message: string;
  data: T;
  errors: { [key: string]: string };
};
