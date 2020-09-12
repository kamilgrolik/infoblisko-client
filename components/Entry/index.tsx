import React from 'react';
import { CardText, CardBody, CardTitle } from 'reactstrap';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import CommentsList from '../CommentsList';
import { Incident, Query } from '../../common/types';
import { isoStringToDate } from '../../utils/helpers';
import { Wrapper, StyledBadge, UserIcon, StyledCardImg } from './styled';

interface Props {
  incident: Incident;
}

//TODO: query input
const COMMENTS_CONNECTION_QUERY = gql`
  query CommentsConnection($ID: ID) {
    commentsConnection(where: { incident: { id: $ID } }) {
      aggregate {
        count
      }
    }
  }
`;

const Entry = ({ incident }: Props) => {
  const { id, author, createdAt, message } = incident;
  const { loading, error, data } = useQuery<Query>(COMMENTS_CONNECTION_QUERY, {
    variables: {
      ID: id,
    },
    // pollInterval: 5000 //TODO: scenario, when to use pollInterval
  });
  const commentsCount = data?.commentsConnection?.aggregate?.count;

  const renderImage = () => {
    if (incident.image) {
      const imageFormats = incident.image.formats;
      const largestPossibleFormat = Object.keys(imageFormats)[1];

      return (
        <StyledCardImg
          src={process.env.NEXT_PUBLIC_API_URL + imageFormats[largestPossibleFormat].url}
          alt='Incident snapshot'
        />
      );
    }

    return;
  }

  return (
    <Wrapper color='light'>
      <CardBody>
        <CardTitle>
          <UserIcon className='fa fa-user'></UserIcon>
          <StyledBadge color='dark'>{author}</StyledBadge>
          <StyledBadge color='primary'>
            {isoStringToDate(createdAt)}
          </StyledBadge>
        </CardTitle>
        <CardText>{message}</CardText>
        {renderImage()}
        {commentsCount !== undefined && commentsCount !== null && commentsCount > 0 && (
          <CommentsList entryId={id} commentsCount={commentsCount} />
        )}
      </CardBody>
    </Wrapper>
  );
};

export default Entry;
