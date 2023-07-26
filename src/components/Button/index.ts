import { styled, css } from 'styled-components';
import { ColorProps } from '../../libs/common';

export const Button = styled.button<ColorProps>`
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

    cursor: pointer;

    transition: all 0.2s ease-in-out;

    &:hover {
      opacity: 0.8;
    }
  `}
`;
