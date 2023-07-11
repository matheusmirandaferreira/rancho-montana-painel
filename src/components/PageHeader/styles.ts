import { css, styled } from 'styled-components';

export const Container = styled.header`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2,
    p {
      margin-bottom: 0.5rem;
      color: ${theme.text};
    }

    button {
      width: auto;
    }

    .buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `}
`;
