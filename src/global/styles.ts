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
      color: ${theme.text};
      background-color: ${theme.background};
    }

    button {
      font: normal 500 14px/16px 'Montserrat', sans-serif;
    }

    input,
    select,
    textarea {
      font: normal 600 14px/16px 'Montserrat', sans-serif;

      &::placeholder {
        font-weight: 400;
      }
    }

    ol,
    ul {
      padding-left: 0;
      margin-top: 0;
      margin-bottom: 0;
    }

    .error-message {
      color: ${theme.red};
    }

    .row {
      gap: 1rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;

      .image {
        width: fit-content;
        height: auto;
      }
    }

    .content {
      display: flex;

      > div {
        flex: 1;
        margin: 0 auto;
        max-width: 1280px;
        padding: 2rem 1rem;
      }
    }
  `}
`;
