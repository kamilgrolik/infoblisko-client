import styled from 'styled-components';
import { Badge, Card, CardImg } from 'reactstrap';

export const Wrapper = styled(Card)`
  margin-bottom: 30px;
  &:last-of-type {
    margin: 0;
  }
`;

export const StyledBadge = styled(Badge)`
  font-size: 1rem;
`;

export const UserIcon = styled.div`
  font-size: 30px;
`;

export const StyledCardImg = styled(CardImg)`
  max-height: 500px;
  width: auto;
  max-width: 100%;
  margin-bottom: 16px;
`;
