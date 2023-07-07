import { styled, css } from 'styled-components';

export const Button = styled.button`
  ${({ theme, color }) => css`
    width: 100%;
    height: 38px;
    padding: 0 1rem;

    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    color: ${theme.white};
    border-radius: 0.25rem;
    background-color: ${theme[color || 'primary700']};
  `}
`;
