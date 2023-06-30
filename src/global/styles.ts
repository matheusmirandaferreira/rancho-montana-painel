import { createGlobalStyle, css } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    * {
      margin: 0;
      padding: 0;
      outline: 0;
      border: 0;
      box-sizing: border-box;
    }

    body {
      font: normal 500 16px/18px 'Montserrat', sans-serif;
    }

    button,
    input,
    input::placeholder {
      font: normal 400 14px/16px 'Montserrat', sans-serif;
    }

    .error-message {
      color: ${theme.red};
    }
  `}
`;
