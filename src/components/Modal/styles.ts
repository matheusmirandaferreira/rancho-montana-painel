import { css } from 'styled-components';
import { styled } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    position: fixed;
    inset: 0;

    height: 100vh;
    background-color: ${theme.text}60;

    .box {
      width: 500px;

      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      border-radius: 1rem;
      background-color: ${theme.white};
      box-shadow: 0 0 0.25rem ${theme.primary500};
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 1rem;

      border-bottom: 1px solid ${theme.gray100};

      span {
        font-size: 1.25rem;
        font-weight: 600;
      }

      svg {
        cursor: pointer;
      }
    }

    .modal-body {
      padding: 1rem;
    }

    .modal-footer {
      padding: 1rem;
      border-top: 1px solid ${theme.gray100};

      gap: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      button {
        width: auto;
      }
    }
  `}
`;
