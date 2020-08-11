import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Container, Row, Col, Spinner } from 'reactstrap';
import IncidentForm from '../IncidentForm';
import IncidentEntry from '../IncidentEntry';
import { Query } from '../../common/types';

const INCIDENTS_QUERY = gql`
  query Incidents {
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
  const { loading, error, data } = useQuery<Query>(INCIDENTS_QUERY, {
    // pollInterval: 5000 //TODO: scenario, when to use pollInterval
  });

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
          ) : data?.incidents && data.incidents.length > 0 ? (
            data.incidents.map(incident => (
              incident && <IncidentEntry key={incident.id} incident={incident} />
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
