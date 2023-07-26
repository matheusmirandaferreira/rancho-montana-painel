export type ResponseProps<T> = {
  status: '00' | '01';
  message: string;
  data: T;
  errors: { [key: string]: string };
};

export type ColorProps = {
  color?: Colors;
};

export type Colors =
  | 'primary700'
  | 'primary500'
  | 'text'
  | 'gray700'
  | 'gray500'
  | 'gray100'
  | 'background'
  | 'white'
  | 'red';
