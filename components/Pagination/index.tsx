import React from 'react';
import Router from 'next/router';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

interface Props {
  entriesTotalCount: number;
  entriesLimit: number;
  currentPage: number;
  setCurrentPage: any; //TODO: set typing
}

export default ({
  entriesTotalCount,
  entriesLimit,
  currentPage,
  setCurrentPage,
}: Props) => {
  const pagesTotalCount = Math.ceil(entriesTotalCount / entriesLimit);

  return (
    <Pagination aria-label='Page navigation example'>
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => {
            Router.push(`/`);
            setCurrentPage(1);
          }}
          disabled={currentPage === 1}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          previous
          onClick={() => {
            Router.push(`/?page=${currentPage - 1}`);
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        />
      </PaginationItem>
      {[...Array(pagesTotalCount)].map((e, i) => (
        <PaginationItem key={i} active={i + 1 === currentPage}>
          <PaginationLink
            onClick={() => {
              Router.push(`/?page=${i + 1}`);
              setCurrentPage(i + 1);
            }}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink
          next
          onClick={() => {
            Router.push(`/?page=${currentPage + 1}`);
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === pagesTotalCount}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() => {
            Router.push(`/?page=${pagesTotalCount}`);
            setCurrentPage(pagesTotalCount);
          }}
          disabled={currentPage === pagesTotalCount}
        />
      </PaginationItem>
    </Pagination>
  );
};
