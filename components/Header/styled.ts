import styled from 'styled-components';
import { breakpoints } from '../../styles/variables';
import { theme } from '../../styles/theme';

export const Wrapper = styled.header`
  padding: 80px 0;
`;

export const HeadingsWrapper = styled.div`
  a {
    color: #fff;
    text-decoration: none;
  }
  h1 {
    font-size: 4rem;
    font-weight: 400;
    @media (min-width: ${breakpoints.md}) {
      font-size: 5rem;
    }
  }
  h2 {
    font-size: 1.6rem;
    font-weight: 100;
  }
`;

export const ButtonsWrapper = styled.div`
  button {
    border-color: #fff;
  }
  a {
    text-decoration: none;
  }
  .login {
    margin-right: 15px;
    a {
      color: #fff;
    }
  }
  .register {
    background-color: #fff;
    a {
      color: ${theme.colors.main};
    }
  }
`;
