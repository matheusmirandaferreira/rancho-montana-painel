import { css, styled } from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => css`
    gap: 0.5rem;
    display: flex;
    flex-direction: column;

    width: 100%;

    label {
      font-size: 0.875rem;
    }

    input {
      width: 100%;

      height: 38px;
      padding: 0 0.875rem;
      border-radius: 0.25rem;
      border: 1px solid ${theme.gray500};

      &:focus {
        box-shadow: 0 0 0 1px ${theme.primary500};
      }
    }

    p.error-message {
      font-size: 0.875rem;
    }
  `}
`;
