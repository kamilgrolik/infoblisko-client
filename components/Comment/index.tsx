import React from 'react';
import { ToastBody, ToastHeader } from 'reactstrap';
import { Comment } from '../../common/types';
import { isoStringToDate } from '../../utils/helpers';
import { Wrapper } from './styled';

interface Props {
  comment: Comment;
}

export default ({ comment }: Props) => {
  const { id, author, content, createdAt } = comment;

  return (
    <Wrapper>
      <ToastHeader icon='primary'>
        {author} {isoStringToDate(createdAt)}
      </ToastHeader>
      <ToastBody>{content}</ToastBody>
    </Wrapper>
  );
};
