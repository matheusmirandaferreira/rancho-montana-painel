import * as S from './styles';
import { ReactNode } from 'react';

type Props = {
  headerColumns: string[];
  rows: ReactNode[];
};

export function Table(props: Props) {
  const { headerColumns, rows } = props;

  return (
    <S.Container>
      <thead>
        <tr>
          {headerColumns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>{row}</tr>
        ))}
      </tbody>
    </S.Container>
  );
}
