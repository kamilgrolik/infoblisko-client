import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useRouter } from 'next/router';
import { Button, Row, Spinner } from 'reactstrap';
import Entry from '../Entry';
import { Query, QueryIncidentsArgs } from '../../common/types';
import { SortButtons, EntriesHolder } from './styled';

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
  const pageQueryValue = useRouter().query.page;
  const [entriesLimit, setEntriesLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery<Query, QueryIncidentsArgs>(
    INCIDENTS_QUERY,
    {
      variables: {
        limit: entriesLimit,
        start: currentPage > 1 ? (currentPage - 1) * entriesLimit : 0,
      },
      // pollInterval: 5000 //TODO: scenario, when to use pollInterval
    },
  );
  const incidents = data?.incidents;
  const incidentsTotalCount = data?.incidentsConnection?.aggregate?.totalCount;

  useEffect(() => {
    //check url query, and set current page
    if (typeof pageQueryValue === 'string' && pageQueryValue !== '1') {
      setCurrentPage(parseInt(pageQueryValue));
    }
  }, []);

  return (
    <>
      <SortButtons>
        <Button>Najpopularniejsze</Button>
        <Button color='transparent'>Najnowsze</Button>
      </SortButtons>
      <EntriesHolder>
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
        {/*{incidentsTotalCount && incidentsTotalCount > entriesLimit && (*/}
        {/*  <Row className='d-flex justify-content-center'>*/}
        {/*    <Pagination*/}
        {/*      entriesTotalCount={incidentsTotalCount}*/}
        {/*      entriesLimit={entriesLimit}*/}
        {/*      currentPage={currentPage}*/}
        {/*      setCurrentPage={setCurrentPage}*/}
        {/*    />*/}
        {/*  </Row>*/}
        {/*)}*/}
        <Row className='d-flex justify-content-center'>
          <Button color='primary'>Pokaż więcej wpisów</Button>
        </Row>
      </EntriesHolder>
    </>
  );
};

export default EntriesList;
