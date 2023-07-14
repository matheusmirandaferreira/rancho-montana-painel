import { styled, css } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    border-radius: 0.5rem;
    background-color: ${theme.white};
    box-shadow: 0 0 0.5rem ${theme.primary500}50;

    .card-header {
      padding: 1.5rem;
      border-bottom: 1px solid ${theme.gray500};
    }

    .card-body {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `}
`;
