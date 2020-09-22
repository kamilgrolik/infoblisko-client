import styled from 'styled-components';
import { Badge, Card, CardImg } from 'reactstrap';

export const Wrapper = styled(Card)`
  margin-bottom: 20px;
  border: none;
  color: #000;
  &:last-of-type {
    margin: 0;
  }
`;

export const StyledBadge = styled(Badge)`
  font-size: 1rem;
`;

export const StyledCardImg = styled(CardImg)`
  max-height: 500px;
  width: auto;
  max-width: 100%;
  margin-bottom: 20px;
`;
