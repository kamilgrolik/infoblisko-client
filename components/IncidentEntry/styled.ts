import styled from 'styled-components';
import { Badge, Card } from 'reactstrap';

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
