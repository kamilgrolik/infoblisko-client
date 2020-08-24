import React, { ReactNode, useState } from 'react';
import { Button, Container, Jumbotron, Navbar, NavbarBrand } from 'reactstrap';
import EntryForm from '../EntryForm';
import { Wrapper, Footer } from './styled';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [formModalOpen, setformModalOpen] = useState(false);

  return (
    <Wrapper backgroundImageUrl='/images/bg.png'>
      <header>
        <Navbar expand='md' color='primary'>
          <NavbarBrand href='/' style={{ color: '#fff' }}>
            infoblisko
          </NavbarBrand>
        </Navbar>
      </header>
      <main>
        <Container>
          <Jumbotron style={{ marginTop: '80px' }}>
            <h1 className='display-3'>infoblisko</h1>
            <p className='lead'>
              Sprawdź, co właśnie się wydarzyło w Twojej okolicy, lub poinformuj
              o tym innych!
            </p>
            <hr className='my-2' />
            <p>
              Strona/aplikacja w której można dodać informację o
              wydarzeniu/zdarzeniu, które właśnie udało się
              zaobserwować/usłyszeć/zanotować, użytkownicy którzy zobaczą
              dodaną informację, będą mogli się do niej odnieść (np. słyszę
              wybuch, syreny alarmowe, głośną imprezę - chcąc dowiedzieć się co
              się dzieje, mogę dodać wpis oraz orientacyjnie miejsce zdarzenia
              na mapie, użytkownicy którzy będą posiadali jakiekolwiek
              informacje odnośnie zdarzenia będą odpowiadać oraz dyskutować),
              tym samym strona może również realizować funkcję poniekąd typowego
              serwisu informacyjnego, z najświeższymi informacjami.
            </p>
            <p className='lead'>
              <Button color='primary' onClick={() => setformModalOpen(true)}>
                Dodaj wydarzenie
              </Button>
            </p>
          </Jumbotron>
          {children}
        </Container>
      </main>
      <Footer></Footer>
      <EntryForm isOpen={formModalOpen} setIsOpen={setformModalOpen} />
    </Wrapper>
  );
};

export default Layout;
