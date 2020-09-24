import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Button, Row, Spinner } from 'reactstrap';
import Entry from '../Entry';
import { Query, QueryIncidentsArgs } from '../../common/types';
import { SortButtons, EntriesWrapper } from './styled';

const INCIDENTS_QUERY = gql`
  query Incidents($limit: Int!, $start: Int!) {
    incidents(sort: "createdAt:desc", limit: $limit, start: $start) {
      id
      author
      createdAt
      message
      image {
        formats
      }
    }
    incidentsConnection {
      aggregate {
        totalCount
      }
    }
  }
`;

const EntriesList = () => {
  const { loading, error, data } = useQuery<Query, QueryIncidentsArgs>(
    INCIDENTS_QUERY,
    {
      // pollInterval: 5000 //TODO: scenario, when to use pollInterval
    },
  );
  const incidents = data?.incidents;

  return (
    <>
      <SortButtons>
        <Button>Najpopularniejsze</Button>
        <Button color='transparent'>Najnowsze</Button>
      </SortButtons>
      <EntriesWrapper>
        {loading ? (
          <Spinner color='primary' />
        ) : incidents && incidents.length > 0 ? (
          incidents.map(
            incident =>
              incident && <Entry key={incident.id} incident={incident} />,
          )
        ) : (
          <p style={{ color: '#fff' }}>Brak wpisów</p>
        )}
        {error && alert('Błąd wczytywania danych') && (
          <p>Błąd wczytywania danych</p>
        )}
        <Row className='d-flex justify-content-center'>
          <Button color='primary'>Pokaż więcej wpisów</Button>
        </Row>
      </EntriesWrapper>
    </>
  );
};

export default EntriesList;
