import React, { ReactNode, useState } from 'react';
import { Button, Container } from 'reactstrap';
import Header from '../Header';
import EntryForm from '../EntryForm';
import { Wrapper, Footer } from './styled';
import Modal from '../Modal';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [modalComponent, setModalComponent] = useState<ReactNode | null>(null);

  return (
    <>
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
      </Wrapper>
      {modalComponent && <Modal children={modalComponent} />}
    </>
  );
};

export default Layout;
