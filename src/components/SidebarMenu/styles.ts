import { css } from 'styled-components';
import { styled } from 'styled-components';

type ContainerProps = {
  open: boolean;
};

export const Container = styled.aside<ContainerProps>`
  ${({ theme, open }) => css`
    position: sticky;
    left: 0;
    top: 0;
    bottom: 0;
    width: fit-content;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 1rem;

    background-color: ${theme.primary700};

    svg {
      cursor: pointer;
      color: ${theme.white};
    }

    nav {
      .title {
        position: absolute;
        top: 2rem;
      }
    }

    ul {
      gap: 1rem;
      display: flex;
      flex-direction: column;

      li {
        list-style: none;

        a {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          text-decoration: none;
          color: ${theme.white};

          span {
            display: ${open ? 'initial' : 'none'};
          }

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  `}
`;
