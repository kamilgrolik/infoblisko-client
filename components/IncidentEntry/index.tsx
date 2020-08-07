import React from 'react';
import { Incident } from '../../common/types';

interface Props {
  incident: Incident;
}

const IncidentEntry = ({ incident }: Props) => {
  const { id, author, createdAt, message } = incident;

  return (
    <div>
      <span className='fa fa-user'></span>
      <p>{author}</p>
      <p>{createdAt}</p>
      <p>{message}</p>
      {incident.image && (
        <img
          src={process.env.NEXT_PUBLIC_API_URL + incident.image.url}
          alt='Incident snapshot'
        />
      )}
    </div>
  );
};

export default IncidentEntry;
