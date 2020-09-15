import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { breakpoints } from '../../styles/variables';

export const Wrapper = styled.div`
  background-color: ${theme.colors.main};
`;

export const Header = styled.header`
  padding: 80px 0;
  h1,
  h2 {
    color: #fff;
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

export const Footer = styled.footer`
  //background: linear-gradient(#010166, #010146);
  color: #fff;
  height: 200px;
`;
