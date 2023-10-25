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
      max-width: 95vw;
    }

    button {
      width: auto;
    }

    .buttons {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: flex-start;
    }
  `}
`;
