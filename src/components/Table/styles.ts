import { css } from 'styled-components';
import { styled } from 'styled-components';

export const Container = styled.table`
  ${({ theme }) => css`
    width: 100%;

    font-size: 0.875rem;
    overflow: hidden;

    border-radius: 0.25rem;
    border-collapse: collapse;
    background-color: ${theme.white};
    box-shadow: 0 0 0.125rem ${theme.primary500};

    td,
    th {
      padding: 0.75rem 1rem;
    }

    thead {
      background-color: ${theme.background};
    }

    tr th,
    tr td {
      text-align: center;

      &:first-child {
        text-align: left;
      }

      &:last-child {
        text-align: right;
      }
    }

    tbody tr {
      border-top: 1px solid ${theme.primary500}60;

      &:hover {
        box-shadow: 0 0 0.124rem ${theme.primary700};
      }
    }

    @media (max-width: 500px) {
      display: block;
      overflow: auto;
      max-width: 90vw;
    }
  `}
`;
