import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Container, Row, Col, Spinner } from 'reactstrap';
import IncidentForm from '../IncidentForm';
import { IncidentsData } from '../../common/types';
import IncidentEntry from '../IncidentEntry';

const INCIDENTS_QUERY = gql`
  query {
    incidents {
      id
      author
      createdAt
      message
      image {
        url
      }
    }
  }
`;

const Wall = () => {
  const { loading, error, data } = useQuery<IncidentsData>(INCIDENTS_QUERY);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <IncidentForm />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {loading ? (
            <Spinner color='primary' />
          ) : data?.incidents ? (
            data.incidents.map(incident => (
              <IncidentEntry key={incident.id} incident={incident} />
            ))
          ) : (
            <p>Brak wpisów</p>
          )}
          {error && alert('Błąd wczytywania danych') && (
            <p>Błąd wczytywania danych</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Wall;
