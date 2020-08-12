import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { Container, Row, Col, Spinner } from 'reactstrap';
import IncidentForm from '../IncidentForm';
import IncidentEntry from '../IncidentEntry';
import Pagination from '../Pagination';
import { Query } from '../../common/types';

const INCIDENTS_QUERY = gql`
  query Incidents($limit: Int!, $start: Int!) {
    incidents(sort: "createdAt:desc", limit: $limit, start: $start) {
      id
      author
      createdAt
      message
      image {
        url
      }
    }
    incidentsConnection {
      aggregate {
        totalCount
      }
    }
  }
`;

const IncidentEntries = () => {
  const pageQueryValue = useRouter().query.page;
  const [entriesLimit, setEntriesLimit] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery<Query>(INCIDENTS_QUERY, {
    variables: {
      limit: entriesLimit,
      start: currentPage > 1 ? (currentPage - 1) * entriesLimit : 0
    },
    // pollInterval: 5000 //TODO: scenario, when to use pollInterval
  });
  const incidents = data?.incidents;
  const incidentsTotalCount = data?.incidentsConnection?.aggregate?.totalCount;

  useEffect(() => {
    if (typeof pageQueryValue === 'string' && pageQueryValue !== '1') {
      setCurrentPage(parseInt(pageQueryValue));
      console.log(currentPage)
    }
  }, []);

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
          ) : incidents && incidents.length > 0 ? (
            incidents.map(incident => (
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
      {incidentsTotalCount && incidentsTotalCount > entriesLimit &&
        <Row>
          <Col xs={12} className='d-flex justify-content-center'>
            <Pagination
              entriesTotalCount={incidentsTotalCount}
              entriesLimit={entriesLimit}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Col>
        </Row>
      }
    </Container>
  );
};

export default IncidentEntries;
