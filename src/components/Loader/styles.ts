import { css } from 'styled-components';
import { styled } from 'styled-components';

export const PageContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.white};

    gap: 1rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  `}
`;
