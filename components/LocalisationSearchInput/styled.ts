import styled from 'styled-components';
import { Input, ListGroupItem, Spinner } from 'reactstrap';

export const InputWrapper = styled.div`
  position: relative;
`;

export const StyledInput = styled(Input)`
  position: relative;
  z-index: 10;
`;

export const ClearInputButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border: none;
  background-color: transparent;
  font-size: 14px;
  padding: 0 12px;
  z-index: 10;
`;

export const StyledListGroupItem = styled(ListGroupItem)`
  cursor: pointer;
`;

export const StyledSpinner = styled(Spinner)`
  display: block;
  margin: 30px auto 0 auto;
`;
