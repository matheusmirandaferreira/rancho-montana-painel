export type ResponseProps<T> = {
  status: '00' | '01';
  message?: string;
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
  | 'red'
  | 'secondary';

export type OptionProps = {
  label: string;
  value: string;
};

export type LoaderProps = {
  height?: string | number;
  width?: string | number;
  color?: string;
  ariaLabel?: string;
  visible?: boolean;
};
