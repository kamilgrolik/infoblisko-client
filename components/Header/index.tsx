import React from 'react';
import { Button, Container } from 'reactstrap';
import { Wrapper, HeadingsWrapper, ButtonsWrapper } from './styled';

const Header = () => (
  <Wrapper>
    <Container className='d-flex justify-content-between align-items-center'>
      <HeadingsWrapper>
        <h1>infoblisko</h1>
        <h2>platforma wyminay informacji lokalnych</h2>
      </HeadingsWrapper>
      <ButtonsWrapper>
        <Button outline color='primary' className='login'>
          Zaloguj się
        </Button>
        <Button color='primary' className='register'>
          Utwórz konto
        </Button>
      </ButtonsWrapper>
    </Container>
  </Wrapper>
);

export default Header;
