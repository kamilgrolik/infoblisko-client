import React from 'react';
import { CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Incident } from '../../common/types';
import { isoStringToDate } from '../../utils/helpers';
import { Wrapper, StyledBadge, UserIcon } from './styled';

interface Props {
  incident: Incident;
}

const IncidentEntry = ({ incident }: Props) => {
  const { id, author, createdAt, message } = incident;

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
        {incident.image && (
          <CardImg
            src={process.env.NEXT_PUBLIC_API_URL + incident.image.url}
            alt='Incident snapshot'
          />
        )}
      </CardBody>
    </Wrapper>
  );
};

export default IncidentEntry;
