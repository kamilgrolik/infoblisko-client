import React, { ReactNode, useState } from 'react';
import { Button, Container } from 'reactstrap';
import Header from '../Header';
import EntryForm from '../EntryForm';
import { Wrapper, Footer } from './styled';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [formModalOpen, setformModalOpen] = useState(false);

  return (
    <Wrapper>
      <Header />
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
