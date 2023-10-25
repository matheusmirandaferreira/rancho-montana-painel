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

        a {
          text-decoration: none;
          color: ${theme.white};

          gap: 0.5rem;
          display: flex;
          align-items: center;
        }

        @media (max-width: 500px) {
          position: relative;
          top: initial;

          a {
            margin-right: auto;
          }
        }
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

          &:hover {
            opacity: 0.7;
          }
        }
      }

      @media (max-width: 500px) {
        display: ${open ? 'flex' : 'none'};
        position: absolute;

        background-color: ${theme.primary700};
        padding: 1rem;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
        left: 2px;
        top: 100%;
        z-index: 2;
        box-shadow: 0 4px 6px ${theme.secondary};
      }
    }

    @media (max-width: 500px) {
      width: 100%;
      height: 50px;
      position: relative;

      justify-content: flex-start;
    }
  `}
`;
