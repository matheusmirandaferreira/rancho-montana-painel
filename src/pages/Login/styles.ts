import { css, styled } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${theme.background};

    form {
      padding: 2rem;

      border-radius: 0.5rem;
      box-shadow: 0 0 0.5rem ${theme.primary500}40;

      width: 90%;
      margin: auto;

      gap: 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;

      background-color: ${theme.white};

      @media screen and (min-width: 700px) {
        width: 500px;
      }
    }
  `}
`;
