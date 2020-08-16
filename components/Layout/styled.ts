import styled from 'styled-components';

interface WrapperProps {
  readonly backgroundImageUrl: string;
}

export const Wrapper = styled.div<WrapperProps>`
  &::before {
    content: '';
    background-image: url(${props => props.backgroundImageUrl});
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    will-change: transform;
    z-index: -1;
  }
`;

export const BgImg = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: -1;
`;

export const Footer = styled.footer`
  //background: linear-gradient(#010166, #010146);
  color: #fff;
  height: 200px;
`;
