import React, { useState } from 'react';
import { withTranslation, useTranslation } from '../i18n';
import { Jumbotron, Button, Container } from 'reactstrap';
import Entries from '../components/Entries';
import EntryForm from '../components/EntryForm';

const Homepage = () => {
  const { t } = useTranslation();
  const [isIncidentFormOpen, setIsIncidentFormOpen] = useState(false);

  return (
    <>
      <Container>
        <Jumbotron style={{ marginTop: '80px' }}>
          <h1 className='display-3'>infoblisko</h1>
          <p className='lead'>
            Sprawdź, co właśnie się wydarzyło w Twojej okolicy, lub poinformuj o
            tym innych!
          </p>
          <hr className='my-2' />
          <p>
            Strona/aplikacja w której można dodać informację o
            wydarzeniu/zdarzeniu, które właśnie udało się
            zaobserwować/usłyszeć/zanotować, użytkownicy którzy zobaczą
            dodaną informację, będą mogli się do niej odnieść (np. słyszę
            wybuch, syreny alarmowe, głośną imprezę - chcąc dowiedzieć się co
            się dzieje, mogę dodać wpis oraz orientacyjnie miejsce zdarzenia na
            mapie, użytkownicy którzy będą posiadali jakiekolwiek informacje
            odnośnie zdarzenia będą odpowiadać oraz dyskutować), tym samym
            strona może również realizować funkcję poniekąd typowego serwisu
            informacyjnego, z najświeższymi informacjami.
          </p>
          <p className='lead'>
            <Button color='primary' onClick={() => setIsIncidentFormOpen(true)}>
              Dodaj wydarzenie
            </Button>
          </p>
        </Jumbotron>
        <Entries />
      </Container>
      <EntryForm
        isOpen={isIncidentFormOpen}
        setIsOpen={setIsIncidentFormOpen}
      />
    </>
  );
};

Homepage.getInitialProps = async () => ({
  namespacesRequired: ['homepage', 'common'],
});

export default withTranslation('common')(Homepage);
