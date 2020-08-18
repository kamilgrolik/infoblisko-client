import React from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';
import { Button, Spinner } from 'reactstrap';
import { Query, QueryIncidentArgs } from '../../common/types';
import { Wrapper } from './styled';
import Comment from '../Comment';

interface Props {
  entryId: string;
  commentsCount: number;
}

const COMMENTS_QUERY = gql`
  query Comments($id: ID) {
    comments(where: { incident: { id: $id } }) {
      id
      author
      createdAt
      content
    }
  }
`;

const CommentsList = ({ entryId, commentsCount }: Props) => {
  const [getComments, { loading, error, data }] = useLazyQuery<
    Query,
    QueryIncidentArgs
  >(COMMENTS_QUERY, {
    variables: {
      id: entryId,
    },
    // pollInterval: 5000 //TODO: scenario, when to use pollInterval
  });
  const comments = data?.comments;

  return (
    <Wrapper>
      {loading && <Spinner color='primary' />}
      {error && alert('Błąd wczytywania danych') && (
        <p>Błąd wczytywania danych</p>
      )}
      {!comments && (
        <Button color='primary' onClick={() => getComments()}>
          Pokaż komentarze ({commentsCount})
        </Button>
      )}
      {comments &&
        comments.map(
          comment => comment && <Comment key={comment.id} comment={comment} />,
        )}
    </Wrapper>
  );
};

export default CommentsList;
