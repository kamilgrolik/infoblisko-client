import React, { ReactNode, useState } from 'react';
import { Button, Container } from 'reactstrap';
import EntryForm from '../EntryForm';
import { Wrapper, Header, Footer } from './styled';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [formModalOpen, setformModalOpen] = useState(false);

  return (
    <Wrapper>
      <Header>
        <Container>
          <h1>infoblisko</h1>
          <h2>platforma wyminay informacji lokalnych</h2>
        </Container>
      </Header>
      <main>
        <Container>
          {/*<Button color='primary' onClick={() => setformModalOpen(true)}>*/}
          {/*  Dodaj wydarzenie*/}
          {/*</Button>*/}
          {children}
        </Container>
      </main>
      <Footer></Footer>
      <EntryForm isOpen={formModalOpen} setIsOpen={setformModalOpen} />
    </Wrapper>
  );
};

export default Layout;
